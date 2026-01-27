/**
 * Kernel Builder
 * Generates instruction programs for the simulator
 */

class KernelBuilder {
    constructor() {
        this.instrs = [];
        this.scratch = {};
        this.scratchDebug = {};
        this.scratchPtr = 0;
        this.constMap = {};
    }

    debugInfo() {
        return { scratchMap: this.scratchDebug };
    }

    allocScratch(name = null, length = 1) {
        const addr = this.scratchPtr;
        if (name !== null) {
            this.scratch[name] = addr;
            this.scratchDebug[addr] = [name, length];
        }
        this.scratchPtr += length;
        if (this.scratchPtr > Simulator.SCRATCH_SIZE) {
            throw new Error("Out of scratch space");
        }
        return addr;
    }

    scratchConst(val, name = null) {
        if (!(val in this.constMap)) {
            const addr = this.allocScratch(name);
            this.add("load", ["const", addr, val]);
            this.constMap[val] = addr;
        }
        return this.constMap[val];
    }

    add(engine, slot) {
        const instr = {};
        instr[engine] = [slot];
        this.instrs.push(instr);
    }

    build(slots) {
        // Simple: one slot per instruction
        const instrs = [];
        for (const [engine, slot] of slots) {
            const instr = {};
            instr[engine] = [slot];
            instrs.push(instr);
        }
        return instrs;
    }

    buildHash(valHashAddr, tmp1, tmp2, round, i) {
        const slots = [];

        for (let hi = 0; hi < Simulator.HASH_STAGES.length; hi++) {
            const [op1, val1, op2, op3, val3] = Simulator.HASH_STAGES[hi];
            slots.push(["alu", [op1, tmp1, valHashAddr, this.scratchConst(val1)]]);
            slots.push(["alu", [op3, tmp2, valHashAddr, this.scratchConst(val3)]]);
            slots.push(["alu", [op2, valHashAddr, tmp1, tmp2]]);
        }

        return slots;
    }

    buildKernel(forestHeight, nNodes, batchSize, rounds) {
        const tmp1 = this.allocScratch("tmp1");
        const tmp2 = this.allocScratch("tmp2");
        const tmp3 = this.allocScratch("tmp3");

        // Scratch space addresses for init vars
        const initVars = [
            "rounds", "n_nodes", "batch_size", "forest_height",
            "forest_values_p", "inp_indices_p", "inp_values_p"
        ];
        for (const v of initVars) {
            this.allocScratch(v, 1);
        }

        // Load init vars from memory
        for (let i = 0; i < initVars.length; i++) {
            this.add("load", ["const", tmp1, i]);
            this.add("load", ["load", this.scratch[initVars[i]], tmp1]);
        }

        const zeroConst = this.scratchConst(0);
        const oneConst = this.scratchConst(1);
        const twoConst = this.scratchConst(2);

        this.add("flow", ["pause"]);

        const body = [];

        // Scalar scratch registers
        const tmpIdx = this.allocScratch("tmp_idx");
        const tmpVal = this.allocScratch("tmp_val");
        const tmpNodeVal = this.allocScratch("tmp_node_val");
        const tmpAddr = this.allocScratch("tmp_addr");

        for (let round = 0; round < rounds; round++) {
            for (let i = 0; i < batchSize; i++) {
                const iConst = this.scratchConst(i);

                // idx = mem[inp_indices_p + i]
                body.push(["alu", ["+", tmpAddr, this.scratch["inp_indices_p"], iConst]]);
                body.push(["load", ["load", tmpIdx, tmpAddr]]);

                // val = mem[inp_values_p + i]
                body.push(["alu", ["+", tmpAddr, this.scratch["inp_values_p"], iConst]]);
                body.push(["load", ["load", tmpVal, tmpAddr]]);

                // node_val = mem[forest_values_p + idx]
                body.push(["alu", ["+", tmpAddr, this.scratch["forest_values_p"], tmpIdx]]);
                body.push(["load", ["load", tmpNodeVal, tmpAddr]]);

                // val = val ^ node_val
                body.push(["alu", ["^", tmpVal, tmpVal, tmpNodeVal]]);

                // Hash
                body.push(...this.buildHash(tmpVal, tmp1, tmp2, round, i));

                // idx = 2*idx + (1 if val % 2 == 0 else 2)
                body.push(["alu", ["%", tmp1, tmpVal, twoConst]]);
                body.push(["alu", ["==", tmp1, tmp1, zeroConst]]);
                body.push(["flow", ["select", tmp3, tmp1, oneConst, twoConst]]);
                body.push(["alu", ["*", tmpIdx, tmpIdx, twoConst]]);
                body.push(["alu", ["+", tmpIdx, tmpIdx, tmp3]]);

                // idx = 0 if idx >= n_nodes else idx
                body.push(["alu", ["<", tmp1, tmpIdx, this.scratch["n_nodes"]]]);
                body.push(["flow", ["select", tmpIdx, tmp1, tmpIdx, zeroConst]]);

                // mem[inp_indices_p + i] = idx
                body.push(["alu", ["+", tmpAddr, this.scratch["inp_indices_p"], iConst]]);
                body.push(["store", ["store", tmpAddr, tmpIdx]]);

                // mem[inp_values_p + i] = val
                body.push(["alu", ["+", tmpAddr, this.scratch["inp_values_p"], iConst]]);
                body.push(["store", ["store", tmpAddr, tmpVal]]);
            }
        }

        const bodyInstrs = this.build(body);
        this.instrs.push(...bodyInstrs);
        this.instrs.push({ flow: [["pause"]] });

        return this.instrs;
    }
}

/**
 * Parse a simple kernel DSL into instructions
 */
function parseKernelCode(code) {
    const lines = code.split('\n');
    const instrs = [];
    let currentInstr = null;

    for (let lineNum = 0; lineNum < lines.length; lineNum++) {
        let line = lines[lineNum].trim();

        // Skip comments and empty lines
        if (line.startsWith('//') || line.startsWith('#') || line === '') {
            continue;
        }

        // Remove inline comments
        const commentIdx = line.indexOf('//');
        if (commentIdx !== -1) {
            line = line.substring(0, commentIdx).trim();
        }

        // Check for cycle separator
        if (line === '---' || line === '---cycle---') {
            if (currentInstr && Object.keys(currentInstr).length > 0) {
                instrs.push(currentInstr);
            }
            currentInstr = null;
            continue;
        }

        // Parse instruction line: engine: op, args...
        const colonIdx = line.indexOf(':');
        if (colonIdx === -1) {
            throw new Error(`Line ${lineNum + 1}: Invalid format, expected "engine: op, args..."`);
        }

        const engine = line.substring(0, colonIdx).trim();
        const rest = line.substring(colonIdx + 1).trim();

        // Parse the slot
        const parts = rest.split(',').map(p => p.trim());
        const op = parts[0];
        const args = parts.slice(1).map(arg => {
            // Try to parse as number
            const num = parseInt(arg);
            return isNaN(num) ? arg : num;
        });

        const slot = [op, ...args];

        // Start new instruction if needed
        if (currentInstr === null) {
            currentInstr = {};
        }

        // Add slot to engine
        if (!(engine in currentInstr)) {
            currentInstr[engine] = [];
        }
        currentInstr[engine].push(slot);
    }

    // Don't forget last instruction
    if (currentInstr && Object.keys(currentInstr).length > 0) {
        instrs.push(currentInstr);
    }

    return instrs;
}

// Export
if (typeof window !== 'undefined') {
    window.KernelBuilder = KernelBuilder;
    window.parseKernelCode = parseKernelCode;
}

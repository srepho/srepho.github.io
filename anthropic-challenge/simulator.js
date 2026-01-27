/**
 * VLIW SIMD Machine Simulator
 * JavaScript port of Anthropic's performance challenge simulator
 */

// Constants
const SLOT_LIMITS = {
    alu: 12,
    valu: 6,
    load: 2,
    store: 2,
    flow: 1,
    debug: 64
};

const VLEN = 8;
const N_CORES = 1;
const SCRATCH_SIZE = 1536;

const HASH_STAGES = [
    ["+", 0x7ED55D16, "+", "<<", 12],
    ["^", 0xC761C23C, "^", ">>", 19],
    ["+", 0x165667B1, "+", "<<", 5],
    ["+", 0xD3A2646C, "^", "<<", 9],
    ["+", 0xFD7046C5, "+", "<<", 3],
    ["^", 0xB55A4F09, "^", ">>", 16]
];

// 32-bit unsigned integer operations
function u32(x) {
    return x >>> 0;
}

function mod32(x) {
    return ((x % 0x100000000) + 0x100000000) % 0x100000000;
}

// Core state enum
const CoreState = {
    RUNNING: 1,
    PAUSED: 2,
    STOPPED: 3
};

/**
 * Generate a random tree
 */
function generateTree(height) {
    const nNodes = Math.pow(2, height + 1) - 1;
    const values = [];
    for (let i = 0; i < nNodes; i++) {
        values.push(Math.floor(Math.random() * 0x40000000));
    }
    return { height, values };
}

/**
 * Generate random input
 */
function generateInput(tree, batchSize, rounds) {
    const indices = new Array(batchSize).fill(0);
    const values = [];
    for (let i = 0; i < batchSize; i++) {
        values.push(Math.floor(Math.random() * 0x40000000));
    }
    return { indices, values, rounds };
}

/**
 * Hash function
 */
function myhash(a) {
    const ops = {
        "+": (x, y) => mod32(x + y),
        "^": (x, y) => u32(x ^ y),
        "<<": (x, y) => u32(x << y),
        ">>": (x, y) => x >>> y
    };

    for (const [op1, val1, op2, op3, val3] of HASH_STAGES) {
        const left = ops[op1](a, val1);
        const right = ops[op3](a, val3);
        a = ops[op2](left, right);
    }
    return a;
}

/**
 * Build memory image
 */
function buildMemImage(tree, input) {
    const header = 7;
    const extraRoom = tree.values.length + input.indices.length * 2 + VLEN * 2 + 32;
    const memSize = header + tree.values.length + input.indices.length + input.values.length + extraRoom;
    const mem = new Array(memSize).fill(0);

    const forestValuesP = header;
    const inpIndicesP = forestValuesP + tree.values.length;
    const inpValuesP = inpIndicesP + input.values.length;

    mem[0] = input.rounds;
    mem[1] = tree.values.length;
    mem[2] = input.indices.length;
    mem[3] = tree.height;
    mem[4] = forestValuesP;
    mem[5] = inpIndicesP;
    mem[6] = inpValuesP;

    // Copy tree values
    for (let i = 0; i < tree.values.length; i++) {
        mem[header + i] = tree.values[i];
    }
    // Copy indices
    for (let i = 0; i < input.indices.length; i++) {
        mem[inpIndicesP + i] = input.indices[i];
    }
    // Copy values
    for (let i = 0; i < input.values.length; i++) {
        mem[inpValuesP + i] = input.values[i];
    }

    return mem;
}

/**
 * Reference kernel for validation
 */
function referenceKernel(mem) {
    const rounds = mem[0];
    const nNodes = mem[1];
    const batchSize = mem[2];
    const forestValuesP = mem[4];
    const inpIndicesP = mem[5];
    const inpValuesP = mem[6];

    // Make a copy
    const result = [...mem];

    for (let h = 0; h < rounds; h++) {
        for (let i = 0; i < batchSize; i++) {
            let idx = result[inpIndicesP + i];
            let val = result[inpValuesP + i];
            const nodeVal = result[forestValuesP + idx];
            val = myhash(u32(val ^ nodeVal));
            idx = 2 * idx + (val % 2 === 0 ? 1 : 2);
            idx = idx >= nNodes ? 0 : idx;
            result[inpValuesP + i] = val;
            result[inpIndicesP + i] = idx;
        }
    }

    return result;
}

/**
 * Core class
 */
class Core {
    constructor(id, scratchSize) {
        this.id = id;
        this.scratch = new Array(scratchSize).fill(0);
        this.traceBuf = [];
        this.pc = 0;
        this.state = CoreState.RUNNING;
    }
}

/**
 * Machine simulator
 */
class Machine {
    constructor(memDump, program, options = {}) {
        this.mem = [...memDump];
        this.program = program;
        this.nCores = options.nCores || N_CORES;
        this.scratchSize = options.scratchSize || SCRATCH_SIZE;
        this.enablePause = options.enablePause !== false;
        this.enableDebug = options.enableDebug !== false;
        this.trace = options.trace || null;

        this.cores = [];
        for (let i = 0; i < this.nCores; i++) {
            this.cores.push(new Core(i, this.scratchSize));
        }

        this.cycle = 0;
        this.scratchWrite = {};
        this.memWrite = {};
        this.traceData = [];
    }

    run() {
        // Unpause any paused cores
        for (const core of this.cores) {
            if (core.state === CoreState.PAUSED) {
                core.state = CoreState.RUNNING;
            }
        }

        while (this.cores.some(c => c.state === CoreState.RUNNING)) {
            let hasNonDebug = false;

            for (const core of this.cores) {
                if (core.state !== CoreState.RUNNING) continue;

                if (core.pc >= this.program.length) {
                    core.state = CoreState.STOPPED;
                    continue;
                }

                const instr = this.program[core.pc];
                core.pc++;
                this.step(instr, core);

                if (Object.keys(instr).some(name => name !== "debug")) {
                    hasNonDebug = true;
                }
            }

            if (hasNonDebug) {
                this.cycle++;
            }
        }

        return this.cycle;
    }

    step(instr, core) {
        this.scratchWrite = {};
        this.memWrite = {};

        const cycleTrace = { cycle: this.cycle, slots: {} };

        for (const [engineName, slots] of Object.entries(instr)) {
            if (engineName === "debug") {
                if (!this.enableDebug) continue;
                // Skip debug instructions
                continue;
            }

            if (slots.length > SLOT_LIMITS[engineName]) {
                throw new Error(`Too many slots for ${engineName}: ${slots.length} > ${SLOT_LIMITS[engineName]}`);
            }

            cycleTrace.slots[engineName] = slots.length;

            for (const slot of slots) {
                this.executeSlot(engineName, slot, core);
            }
        }

        // Apply writes at end of cycle
        for (const [addr, val] of Object.entries(this.scratchWrite)) {
            core.scratch[parseInt(addr)] = val;
        }
        for (const [addr, val] of Object.entries(this.memWrite)) {
            this.mem[parseInt(addr)] = val;
        }

        if (this.trace) {
            this.traceData.push(cycleTrace);
        }
    }

    executeSlot(engine, slot, core) {
        switch (engine) {
            case "alu":
                this.execAlu(core, slot);
                break;
            case "valu":
                this.execValu(core, slot);
                break;
            case "load":
                this.execLoad(core, slot);
                break;
            case "store":
                this.execStore(core, slot);
                break;
            case "flow":
                this.execFlow(core, slot);
                break;
            default:
                throw new Error(`Unknown engine: ${engine}`);
        }
    }

    execAlu(core, slot) {
        const [op, dest, a1, a2] = slot;
        const v1 = core.scratch[a1];
        const v2 = core.scratch[a2];
        let res;

        switch (op) {
            case "+": res = mod32(v1 + v2); break;
            case "-": res = mod32(v1 - v2); break;
            case "*": res = mod32(v1 * v2); break;
            case "//": res = Math.floor(v1 / v2); break;
            case "cdiv": res = Math.ceil(v1 / v2); break;
            case "^": res = u32(v1 ^ v2); break;
            case "&": res = u32(v1 & v2); break;
            case "|": res = u32(v1 | v2); break;
            case "<<": res = u32(v1 << v2); break;
            case ">>": res = v1 >>> v2; break;
            case "%": res = v1 % v2; break;
            case "<": res = v1 < v2 ? 1 : 0; break;
            case "==": res = v1 === v2 ? 1 : 0; break;
            default: throw new Error(`Unknown ALU op: ${op}`);
        }

        this.scratchWrite[dest] = mod32(res);
    }

    execValu(core, slot) {
        const op = slot[0];

        if (op === "vbroadcast") {
            const [, dest, src] = slot;
            const val = core.scratch[src];
            for (let i = 0; i < VLEN; i++) {
                this.scratchWrite[dest + i] = val;
            }
        } else if (op === "multiply_add") {
            const [, dest, a, b, c] = slot;
            for (let i = 0; i < VLEN; i++) {
                const mul = mod32(core.scratch[a + i] * core.scratch[b + i]);
                this.scratchWrite[dest + i] = mod32(mul + core.scratch[c + i]);
            }
        } else {
            const [, dest, a1, a2] = slot;
            for (let i = 0; i < VLEN; i++) {
                // Reuse ALU logic
                const tempSlot = [op, dest + i, a1 + i, a2 + i];
                this.execAlu(core, tempSlot);
            }
        }
    }

    execLoad(core, slot) {
        const op = slot[0];

        switch (op) {
            case "load": {
                const [, dest, addr] = slot;
                const memAddr = core.scratch[addr];
                this.scratchWrite[dest] = this.mem[memAddr] || 0;
                break;
            }
            case "load_offset": {
                const [, dest, addr, offset] = slot;
                const memAddr = core.scratch[addr + offset];
                this.scratchWrite[dest + offset] = this.mem[memAddr] || 0;
                break;
            }
            case "vload": {
                const [, dest, addr] = slot;
                const memAddr = core.scratch[addr];
                for (let i = 0; i < VLEN; i++) {
                    this.scratchWrite[dest + i] = this.mem[memAddr + i] || 0;
                }
                break;
            }
            case "const": {
                const [, dest, val] = slot;
                this.scratchWrite[dest] = mod32(val);
                break;
            }
            default:
                throw new Error(`Unknown load op: ${op}`);
        }
    }

    execStore(core, slot) {
        const op = slot[0];

        switch (op) {
            case "store": {
                const [, addr, src] = slot;
                const memAddr = core.scratch[addr];
                this.memWrite[memAddr] = core.scratch[src];
                break;
            }
            case "vstore": {
                const [, addr, src] = slot;
                const memAddr = core.scratch[addr];
                for (let i = 0; i < VLEN; i++) {
                    this.memWrite[memAddr + i] = core.scratch[src + i];
                }
                break;
            }
            default:
                throw new Error(`Unknown store op: ${op}`);
        }
    }

    execFlow(core, slot) {
        const op = slot[0];

        switch (op) {
            case "select": {
                const [, dest, cond, a, b] = slot;
                this.scratchWrite[dest] = core.scratch[cond] !== 0
                    ? core.scratch[a]
                    : core.scratch[b];
                break;
            }
            case "add_imm": {
                const [, dest, a, imm] = slot;
                this.scratchWrite[dest] = mod32(core.scratch[a] + imm);
                break;
            }
            case "vselect": {
                const [, dest, cond, a, b] = slot;
                for (let i = 0; i < VLEN; i++) {
                    this.scratchWrite[dest + i] = core.scratch[cond + i] !== 0
                        ? core.scratch[a + i]
                        : core.scratch[b + i];
                }
                break;
            }
            case "halt":
                core.state = CoreState.STOPPED;
                break;
            case "pause":
                if (this.enablePause) {
                    core.state = CoreState.PAUSED;
                }
                break;
            case "trace_write": {
                const [, val] = slot;
                core.traceBuf.push(core.scratch[val]);
                break;
            }
            case "cond_jump": {
                const [, cond, addr] = slot;
                if (core.scratch[cond] !== 0) {
                    core.pc = addr;
                }
                break;
            }
            case "cond_jump_rel": {
                const [, cond, offset] = slot;
                if (core.scratch[cond] !== 0) {
                    core.pc += offset;
                }
                break;
            }
            case "jump": {
                const [, addr] = slot;
                core.pc = addr;
                break;
            }
            case "jump_indirect": {
                const [, addr] = slot;
                core.pc = core.scratch[addr];
                break;
            }
            case "coreid": {
                const [, dest] = slot;
                this.scratchWrite[dest] = core.id;
                break;
            }
            default:
                throw new Error(`Unknown flow op: ${op}`);
        }
    }
}

/**
 * Validate a program against the reference kernel
 */
function validateProgram(program, forestHeight = 10, rounds = 16, batchSize = 256, seed = null) {
    // Set seed if provided
    if (seed !== null) {
        // Simple seeded random
        let s = seed;
        Math.random = () => {
            s = (s * 1103515245 + 12345) & 0x7fffffff;
            return s / 0x7fffffff;
        };
    }

    const tree = generateTree(forestHeight);
    const input = generateInput(tree, batchSize, rounds);
    const mem = buildMemImage(tree, input);

    // Run reference
    const refMem = referenceKernel([...mem]);

    // Run program
    const machine = new Machine(mem, program, { enablePause: false, enableDebug: false });
    const cycles = machine.run();

    // Compare results
    const inpValuesP = mem[6];
    const refValues = refMem.slice(inpValuesP, inpValuesP + batchSize);
    const actualValues = machine.mem.slice(inpValuesP, inpValuesP + batchSize);

    let correct = true;
    for (let i = 0; i < batchSize; i++) {
        if (refValues[i] !== actualValues[i]) {
            correct = false;
            break;
        }
    }

    return { cycles, correct, refValues, actualValues };
}

// Export for use in browser
if (typeof window !== 'undefined') {
    window.Simulator = {
        Machine,
        generateTree,
        generateInput,
        buildMemImage,
        referenceKernel,
        validateProgram,
        myhash,
        SLOT_LIMITS,
        VLEN,
        SCRATCH_SIZE,
        HASH_STAGES
    };
}

// Export for Node.js
if (typeof module !== 'undefined') {
    module.exports = {
        Machine,
        generateTree,
        generateInput,
        buildMemImage,
        referenceKernel,
        validateProgram,
        myhash,
        SLOT_LIMITS,
        VLEN,
        SCRATCH_SIZE,
        HASH_STAGES
    };
}

"""Build budget/data.json from the 2026-27 Budget Paper No. 1 text and chart CSVs.

Usage: python3 build_data.py <folder with pdftotext -layout output of bp1_bs-5/6/11 and the
unzipped chart-data-final.zip in charts/> data.json functions_history.json
"""
import csv, json, re, sys
from pathlib import Path

DL = Path(sys.argv[1])          # folder with bp1_bs-*.txt and charts/
OUT = Path(sys.argv[2])
HIST = Path(sys.argv[3]) if len(sys.argv) > 3 else None

NUM = r'-?[\d,]+'
def nums(s):
    return [int(x.replace(',', '')) for x in s]

def lines(name):
    return (DL / name).read_text().splitlines()

# ---------------------------------------------------------------- Statement 6
s6 = lines('bp1_bs-6.txt')
start = next(i for i, l in enumerate(s6) if l.startswith('Table A.6.1'))
YEARS6 = ['2024-25', '2025-26', '2026-27', '2027-28', '2028-29', '2029-30']
HEADS = {'General public services', 'Public order and safety', 'Education', 'Health',
         'Social security and welfare', 'Housing and community amenities', 'Recreation and culture',
         'Agriculture, forestry and fishing', 'Transport and communication', 'Other economic affairs',
         'Other purposes'}
rows, pending = [], None   # pending = (indent, text) for a name wrapped onto the next line
row_re = re.compile(r'^(\s*)(\S.*?)\s+((?:' + NUM + r'\s+){5}' + NUM + r')\s*$')
for l in s6[start + 1:]:
    if l.startswith('a) The hospital'):
        break
    if not l.strip() or re.match(r'^\s*(Table A\.6\.1|Actual|\d{4}-\d\d|\$m|Page \d|.*Budget Paper No|.*Statement 6:)', l):
        continue
    m = row_re.match(l)
    if m:
        ind, name, vals = len(m.group(1)), m.group(2).strip(), m.group(3)
        if pending:
            ind, name = pending[0], pending[1] + ' ' + name
            pending = None
        rows.append((ind, re.sub(r'\(a\)$', '', name).strip(), nums(vals.split())))
        continue
    ind, txt = len(l) - len(l.lstrip()), l.strip()
    pending = (pending[0], pending[1] + ' ' + txt) if pending else (ind, txt)
    if pending[0] == 0 and pending[1] in HEADS:
        rows.append((0, pending[1], None))
        pending = None

# assemble tree
functions, cur = [], None
for ind, name, vals in rows:
    if name.startswith('Total expenses'):
        total = vals
        continue
    if name.startswith('Total '):
        assert cur and sum(c['v'][2] for c in cur['children']) - vals[2] in range(-6, 7), (name, cur)
        cur['v'] = vals
        cur = None
        continue
    if ind == 0:
        node = {'name': name, 'v': vals, 'children': []}
        functions.append(node)
        cur = node if vals is None else None
    elif ind <= 3:
        cur['children'].append({'name': name, 'v': vals, 'children': []})
    else:  # schools split
        cur['children'][-1]['children'].append({'name': name, 'v': vals, 'children': []})

names = [f['name'] for f in functions]
assert len(functions) == 14, names
assert abs(sum(f['v'][2] for f in functions) - total[2]) < 10

# third-level tables (five estimate years) -> prepend None for 2024-25 actual
def component_table(title_start, stop_word='Total'):
    i = next(k for k, l in enumerate(s6) if l.startswith(title_start))
    out, pend = [], ''
    r5 = re.compile(r'^(\s*)(\S.*?)\s+((?:' + NUM + r'\s+){4}' + NUM + r')\s*$')
    started = False
    for l in s6[i + 1:]:
        if re.match(r'^\s*(Component|Sub-function)', l):
            started, pend = True, ''
            continue
        if not started or not l.strip() or re.match(r'^\s*(\d{4}-\d\d|\$m)', l):
            continue
        m = r5.match(l)
        if not m:
            pend = (pend + ' ' + l.strip()).strip()
            continue
        name = (pend + ' ' + m.group(2).strip()).strip() if pend else m.group(2).strip()
        pend = ''
        name = re.sub(r'\([a-c]\)$', '', name).strip()
        if name.startswith('Total'):
            return out, nums(m.group(3).split())
        out.append((len(m.group(1)), name, [None] + nums(m.group(3).split())))
    raise ValueError(title_start)

def find(fn, sub=None):
    f = next(x for x in functions if x['name'] == fn)
    return f if sub is None else next(x for x in f['children'] if x['name'].startswith(sub))

def attach(node, comps, total):
    kids = [{'name': n.replace('V        ’', "Veterans’"), 'v': v, 'children': []} for _, n, v in comps]
    assert abs(sum(k['v'][2] for k in kids) - node['v'][2]) <= 6, (node['name'], kids)
    node['children'] = kids

attach(find('Health', 'Medical services'), *component_table('Table 6.8.1'))
attach(find('Health', 'Pharmaceutical'), *component_table('Table 6.8.2'))
attach(find('Social security and welfare', 'Assistance to the aged'), *component_table('Table 6.9.1'))
attach(find('Social security and welfare', 'Assistance to people with'), *component_table('Table 6.9.2'))
attach(find('Social security and welfare', 'Assistance to families'), *component_table('Table 6.9.3'))

# fuel and energy, foreign aid: indented components inside the summary tables
fe, _ = component_table('Table 6.12')
fuel = find('Fuel and energy')
fuel['children'] = [{'name': n, 'v': v, 'children': []} for ind, n, v in fe if ind > 0]
gps, _ = component_table('Table 6.4')
fa = find('General public services', 'Foreign affairs')
fa['children'] = [{'name': 'Foreign aid' if n.startswith('Foreign aid') else 'Other foreign affairs', 'v': v, 'children': []}
                  for ind, n, v in gps if ind > 0]

# ---------------------------------------------------------------- receipts by head (cash)
def read_csv(name):
    with open(DL / 'charts' / name, newline='') as fh:
        r = list(csv.reader(fh))
    return r

t1 = read_csv('Table 1 - Australian Government (cash) receipts.csv')
ryears = [re.sub(r'\s*\(.*', '', h).strip() for h in t1[0][1:]]
receipts = {row[0].strip(): [int(x) for x in row[1:]] for row in t1[1:] if row and row[0].strip()}

t2 = read_csv('Table 2 - Major categories of (cash) receipts as a proportion of gross domestic product.csv')
mix_cols = [c.replace(' (%)', '') for c in t2[0][1:]]
mix = {'years': [], 'series': {c: [] for c in mix_cols}}
for row in t2[1:]:
    if not row or not row[0].strip():
        continue
    mix['years'].append(row[0].replace('(est)', '').strip())
    for c, x in zip(mix_cols, row[1:]):
        mix['series'][c].append(float(x) if x.strip() else None)

# ---------------------------------------------------------------- Statement 11
s11 = lines('bp1_bs-11.txt')
def hist_table(title, ncols):
    out, on = {}, False
    yr = re.compile(r'^(\d{4}-\d\d)(?: \(e\))?\s+(.*)$')
    for l in s11:
        if l.startswith(title):
            on = True
            continue
        if on and re.match(r'^Table 11\.\d+:', l) and not l.startswith(title):
            on = False
        if not on:
            continue
        m = yr.match(l.strip())
        if m:
            parts = m.group(2).split()
            vals = [None if p in ('na', '-') else float(p.replace(',', '')) for p in parts]
            if len(vals) == ncols:
                out[m.group(1)] = vals
    return out

t111 = hist_table('Table 11.1:', 8)
t113 = hist_table('Table 11.3:', 6)
t114 = hist_table('Table 11.4:', 4)
t1111 = hist_table('Table 11.11:', 7)
hy = sorted(t111)
assert hy[0] == '1970-71' and hy[-1] == '2029-30' and len(hy) == 60, (hy[:2], hy[-2:], len(hy))
for t in (t113, t114, t1111):
    assert sorted(t) == hy, len(t)
history = {
    'years': hy,
    'firstEstimate': '2025-26',
    'receipts': [t111[y][0] for y in hy],
    'receiptsPctGDP': [t111[y][1] for y in hy],
    'payments': [t111[y][2] for y in hy],
    'paymentsRealGrowth': [t111[y][3] for y in hy],
    'paymentsPctGDP': [t111[y][4] for y in hy],
    'ucb': [t111[y][6] for y in hy],
    'ucbPctGDP': [t111[y][7] for y in hy],
    'taxPctGDP': [t113[y][1] for y in hy],
    'netDebt': [t114[y][0] for y in hy],
    'netDebtPctGDP': [t114[y][1] for y in hy],
    'netInterest': [t114[y][2] for y in hy],
    'netInterestPctGDP': [t114[y][3] for y in hy],
    'realPerCapita': {k: [t1111[y][i] for y in hy] for i, k in enumerate(
        ['tax', 'nonTax', 'receipts', 'payments', 'ucb', 'netDebt', 'netInterest'])},
}

data = {
    'source': '2026-27 Budget, Budget Paper No. 1 (Statements 5, 6 and 11) and its chart data, budget.gov.au, May 2026',
    'expenses': {'years': YEARS6, 'actualYears': ['2024-25'], 'total': total, 'functions': functions},
    'receipts': {'years': ryears, 'heads': receipts},
    'taxMix': mix,
    'history': history,
}
if HIST and HIST.exists():
    data['functionHistory'] = json.loads(HIST.read_text())

OUT.write_text(json.dumps(data, separators=(',', ':')))
print('ok', OUT, OUT.stat().st_size, 'bytes;', [f['name'] for f in functions])

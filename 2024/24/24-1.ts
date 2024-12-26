import { input } from "./24-input";
const testInput = `x00: 1
x01: 0
x02: 1
x03: 1
x04: 0
y00: 1
y01: 1
y02: 1
y03: 1
y04: 1

ntg XOR fgs -> mjb
y02 OR x01 -> tnw
kwq OR kpj -> z05
x00 OR x03 -> fst
tgd XOR rvg -> z01
vdt OR tnw -> bfw
bfw AND frj -> z10
ffh OR nrd -> bqk
y00 AND y03 -> djm
y03 OR y00 -> psh
bqk OR frj -> z08
tnw OR fst -> frj
gnj AND tgd -> z11
bfw XOR mjb -> z00
x03 OR x00 -> vdt
gnj AND wpb -> z02
x04 AND y00 -> kjc
djm OR pbm -> qhw
nrd AND vdt -> hwm
kjc AND fst -> rvg
y04 OR y02 -> fgs
y01 AND x02 -> pbm
ntg OR kjc -> kwq
psh XOR fgs -> tgd
qhw XOR tgd -> z09
pbm OR djm -> kpj
x03 XOR y03 -> ffh
x00 XOR y04 -> ntg
bfw OR bqk -> z06
nrd XOR fgs -> wpb
frj XOR qhw -> z04
bqk OR frj -> z07
y03 OR x01 -> nrd
hwm AND bqk -> z03
tgd XOR rvg -> z12
tnw OR pbm -> gnj`;

const createGates = (gateRows: string[]) => {
  const gates = new Map<string, number>();
  for (const row of gateRows) {
    const [wireName, value] = row.split(": ");
    gates.set(wireName, Number(value));
  }
  return gates;
};

const part1 = (input: string) => {
  const [gateRows, wiresSection] = input.split("\n\n");
  const gates = createGates(gateRows.split("\n"));
  const wireLines = wiresSection.split("\n");

  let changed = true;
  while (changed) {
    changed = false;
    for (const wireLine of wireLines) {
      const [newValue, outputWire] = evaluateWire(wireLine, gates);
      const oldValue = gates.get(outputWire);
      if (oldValue !== newValue) {
        changed = true;
        gates.set(outputWire, newValue);
      }
    }
  }

  return readOutputValues(gates);
};

const evaluateWire = (
  wireLine: string,
  gates: Map<string, number>
): [number, string] => {
  const [operation, outputWire] = wireLine.split(" -> ");
  const [inp1, op, inp2] = operation.split(" ");
  switch (op) {
    case "AND":
      return [val(gates, inp1) & val(gates, inp2), outputWire];
    case "OR":
      return [val(gates, inp1) | val(gates, inp2), outputWire];
    case "XOR":
      return [val(gates, inp1) ^ val(gates, inp2), outputWire];
    default:
      throw new Error("Invalid operation");
  }
};

const val = (gates: Map<string, number>, wireName: string) =>
  gates.get(wireName) ?? 0;

const readOutputValues = (gates: Map<string, number>) => {
  const outputWires = Array.from(gates.keys())
    .filter((wire) => wire.startsWith("z"))
    .sort();
  let binaryString = "";
  for (let i = 0; i < outputWires.length; i++) {
    binaryString = gates.get(outputWires[i])! + binaryString;
  }
  return parseInt(binaryString, 2);
};

part1(input); // ?

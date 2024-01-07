type Connect4Empty = "  ";
type Connect4Chips = "🔴" | "🟡";
type Connect4Cell = Connect4Chips | Connect4Empty;
type Connect4Board = Connect4Cell[][];

type EmptyBoard = [
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "]
];

export type NewGame = {
  board: EmptyBoard;
  state: "🟡";
};

type Connect4Game = { board: Connect4Board; state: Connect4Chips };

export type Connect4<
  T extends Connect4Game,
  C extends number,
  R extends number = FindIndex2D<T["board"], C>,
  B extends Connect4Board = Replace2D<T["board"], R, C, T["state"]>
> = CheckRows<B, T["state"]> extends true
  ? { board: B; state: `${T["state"]} Won` }
  : CheckCols<B, T["state"], C> extends true
  ? { board: B; state: `${T["state"]} Won` }
  : CheckDiagLeftToRight<B, T["state"]> extends true
  ? { board: B; state: `${T["state"]} Won` }
  : CheckDiagRightToLeft<B, T["state"]> extends true
  ? { board: B; state: `${T["state"]} Won` }
  : CheckDraw<B> extends true
  ? { board: B; state: "Draw" }
  : { board: B; state: { "🔴": "🟡"; "🟡": "🔴" }[T["state"]] };

type CheckDraw<T extends any[][]> = T extends [
  infer First extends any[],
  ...infer Rest extends any[][]
]
  ? HasEmpty1D<First> extends true
    ? false
    : CheckDraw<Rest>
  : true;

type HasEmpty1D<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First extends Connect4Empty
    ? true
    : HasEmpty1D<Rest>
  : false;

type FindIndex2D<
  T extends Connect4Board,
  P extends number,
  Acc extends 0[] = []
> = T extends [...infer Rest extends any[][], infer Last extends any[]]
  ? Last[P] extends "  "
    ? Acc["length"]
    : FindIndex2D<Rest, P, [0, ...Acc]>
  : never;

type Replace2D<
  T extends any[][],
  IR extends number,
  IC extends number,
  V extends any,
  Acc extends any[][] = []
> = T extends [...infer Rest extends any[][], infer Last extends any[]]
  ? Acc["length"] extends IR
    ? [...Rest, Replace1D<Last, IC, V>, ...Acc]
    : Replace2D<Rest, IR, IC, V, [Last, ...Acc]>
  : T;

type Replace1D<
  T extends any[],
  I extends number,
  V extends any,
  Acc extends any[] = []
> = T extends [infer First, ...infer Rest]
  ? Acc["length"] extends I
    ? [...Acc, V, ...Rest]
    : Replace1D<Rest, I, V, [...Acc, First]>
  : T;

type CheckRows<T extends any[][], V extends Connect4Chips> = T extends [
  infer First extends any[],
  ...infer Rest extends any[][]
]
  ? CheckWin1D<First, V> extends true
    ? true
    : CheckRows<Rest, V>
  : false;

type CheckCols<
  T extends any[][],
  V extends Connect4Chips,
  P extends number
> = T extends [
  infer R1 extends any[],
  infer R2 extends any[],
  infer R3 extends any[],
  infer R4 extends any[],
  ...infer Rest extends any[][]
]
  ? [R1[P], R2[P], R3[P], R4[P]] extends [V, V, V, V]
    ? true
    : CheckCols<[R2, R3, R4, ...Rest], V, P>
  : false;

type CheckDiagLeftToRight<
  T extends any[][],
  V extends Connect4Chips
> = T extends [
  infer R1 extends any[],
  infer R2 extends any[],
  infer R3 extends any[],
  infer R4 extends any[],
  ...infer Rest extends any[][]
]
  ? R2 extends [any, ...infer R2Rest]
    ? R3 extends [any, any, ...infer R3Rest]
      ? R4 extends [any, any, any, ...infer R4Rest]
        ? CheckQuadRow<R1, R2Rest, R3Rest, R4Rest, V> extends true
          ? true
          : CheckDiagLeftToRight<[R2, R3, R4, ...Rest], V>
        : false
      : false
    : false
  : false;

type CheckDiagRightToLeft<
  T extends any[][],
  V extends Connect4Chips
> = T extends [
  infer R1 extends any[],
  infer R2 extends any[],
  infer R3 extends any[],
  infer R4 extends any[],
  ...infer Rest extends any[][]
]
  ? R3 extends [any, ...infer R3Rest]
    ? R2 extends [any, any, ...infer R2Rest]
      ? R1 extends [any, any, any, ...infer R1Rest]
        ? CheckQuadRow<R1Rest, R2Rest, R3Rest, R4, V> extends true
          ? true
          : CheckDiagRightToLeft<[R2, R3, R4, ...Rest], V>
        : false
      : false
    : false
  : false;

type CheckQuadRow<
  R1 extends any[],
  R2 extends any[],
  R3 extends any[],
  R4 extends any[],
  V extends any,
  Acc extends 0[] = [],
  i extends number = Acc["length"]
> = R1["length"] extends i
  ? false
  : [R1[i], R2[i], R3[i], R4[i]] extends [V, V, V, V]
  ? true
  : CheckQuadRow<R1, R2, R3, R4, V, [...Acc, 0]>;

type CheckWin1D<T extends any[], V extends any> = T extends [
  infer I1,
  infer I2,
  infer I3,
  infer I4,
  ...infer Rest
]
  ? [I1, I2, I3, I4] extends [V, V, V, V]
    ? true
    : CheckWin1D<[I2, I3, I4, ...Rest], V>
  : false;

type Alley = "  ";
type Santa = "🎅";
type Tree = "🎄";
type MazeItem = Tree | Santa | Alley;
type DELICIOUS_COOKIES = "🍪";
type MazeMatrix = MazeItem[][];
type Directions = "up" | "down" | "left" | "right";

export type Move<
  T extends MazeMatrix,
  D extends Directions,
  I extends FullIndexType = FindSanta2D<T>
> = I[D][0] extends never
  ? MakeCookies2D<T>
  : I[D][1] extends never
  ? MakeCookies2D<T>
  : T[I[D][0]][I[D][1]] extends Tree
  ? T
  : Replace2D<
      Replace2D<T, I[D][0], I[D][1], Santa>,
      I["cur"][0],
      I["cur"][1],
      Alley
    >;

type FullIndexType = {
  left: [number | never, number | never];
  right: [number | never, number | never];
  cur: [number, number];
  up: [number | never, number | never];
  down: [number | never, number | never];
};

type MakeCookies2D<
  T extends any[][],
  Acc extends DELICIOUS_COOKIES[][] = []
> = T["length"] extends Acc["length"]
  ? Acc
  : MakeCookies2D<T, [MakeCookies1D<T[Acc["length"]]>, ...Acc]>;

type MakeCookies1D<
  T extends any[],
  Acc extends DELICIOUS_COOKIES[] = []
> = T["length"] extends Acc["length"]
  ? Acc
  : MakeCookies1D<T, [DELICIOUS_COOKIES, ...Acc]>;

type FindSanta2D<
  T extends any[][],
  Acc extends 0[] = [],
  Idx extends [
    up: number | never,
    cur: number,
    down: number | never,
    max: number
  ] = [never, 0, 1, T["length"]]
> = T extends [infer Row extends any[], ...infer Rest extends any[][]]
  ? FindSanta1D<Row> extends never
    ? FindSanta2D<
        Rest,
        [0, ...Acc],
        [Idx[1], [...Acc, 0]["length"], [...Acc, 0, 0]["length"], Idx[3]]
      >
    : ToIndex<Idx, FindSanta1D<Row>>
  : never;

type FindSanta1D<
  T extends any[],
  Acc extends 0[] = [],
  Idx extends [
    left: number | never,
    cur: number,
    right: number | never,
    max: number
  ] = [never, 0, 1, T["length"]]
> = T extends [infer First, ...infer Rest]
  ? First extends Santa
    ? Idx
    : FindSanta1D<
        Rest,
        [0, ...Acc],
        [Idx[1], [...Acc, 0]["length"], [...Acc, 0, 0]["length"], Idx[3]]
      >
  : never;

type ToIndex<
  RowIdx extends [
    up: number | never,
    cur: number,
    down: number | never,
    max: number
  ],
  ColIdx extends [
    left: number | never,
    cur: number,
    right: number | never,
    max: number
  ]
> = {
  left: [RowIdx[1], ColIdx[0]];
  right: [RowIdx[1], ColIdx[2] extends ColIdx[3] ? never : ColIdx[2]];
  cur: [RowIdx[1], ColIdx[1]];
  up: [RowIdx[0], ColIdx[1]];
  down: [RowIdx[2] extends RowIdx[3] ? never : RowIdx[2], ColIdx[1]];
};

type Replace2D<
  T extends any[][],
  Row extends number,
  Col extends number,
  V extends any,
  Acc extends any[][] = []
> = T extends [infer First extends any[], ...infer Rest extends any[][]]
  ? Acc["length"] extends Row
    ? [...Acc, Replace1D<First, Col, V>, ...Rest]
    : Replace2D<Rest, Row, Col, V, [...Acc, First]>
  : T;

type Replace1D<
  T extends any[],
  Col extends number,
  V extends any,
  Acc extends any[] = []
> = T extends [infer First, ...infer Rest]
  ? Acc["length"] extends Col
    ? [...Acc, V, ...Rest]
    : Replace1D<Rest, Col, V, [...Acc, First]>
  : T;

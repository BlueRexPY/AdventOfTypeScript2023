type Dasher = "💨";
type Dancer = "💃";
type Prancer = "🦌";
type Vixen = "🌟";
type Comet = "☄️";
type Cupid = "❤️";
type Donner = "🌩️";
type Blitzen = "⚡";
type Rudolph = "🔴";
type Reindeer =
  | Dasher
  | Dancer
  | Prancer
  | Vixen
  | Comet
  | Cupid
  | Donner
  | Blitzen
  | Rudolph;
type BoardLineElementType = Reindeer[]; // ['🦌', '🔴', '💃']
type BoardLineType = BoardLineElementType[]; // [ [], [], []]
type BoardType = BoardLineType[]; //[ [ [] ] ]
type ValidationAccumulatorType = Record<number, true>;

type ValidateHorizontalLine<
  Board extends BoardLineType,
  Index extends number = 0,
  Accumulator extends BoardLineElementType = []
> = Accumulator["length"] extends 9
  ? ValidateLine<Accumulator>
  : ValidateHorizontalLine<
      Board,
      Index,
      [...Accumulator, Board[Accumulator["length"]][Index]]
    >;

type ValidateHorizontalLines<
  Board extends BoardLineType,
  Accumulator extends number[] = []
> = Accumulator["length"] extends 9
  ? true
  : ValidateHorizontalLine<Board, Accumulator["length"]> extends true
  ? ValidateHorizontalLines<Board, [...Accumulator, 0]>
  : false;

type ValidateVerticalLinesAndFlat<
  Board extends BoardType,
  Accumulator extends BoardLineType = []
> = Board extends [
  infer Current extends BoardLineType,
  ...infer Rest extends BoardType
]
  ? [
      ...Current[0],
      ...Current[1],
      ...Current[2]
    ] extends infer FlatedLine extends BoardLineElementType
    ? ValidateLine<FlatedLine> extends true
      ? ValidateVerticalLinesAndFlat<Rest, [...Accumulator, FlatedLine]>
      : []
    : []
  : Accumulator;

type ValidateLine<
  BoardLine extends BoardLineElementType,
  Accumulator extends ValidationAccumulatorType = {}
> = BoardLine extends [
  infer Current extends Reindeer,
  ...infer Rest extends BoardLineElementType
]
  ? ValidateLine<Rest, Accumulator & { [Key in Current]: true }>
  : Accumulator extends {
      "💨": true;
      "💃": true;
      "🦌": true;
      "🌟": true;
      "☄️": true;
      "❤️": true;
      "🌩️": true;
      "⚡": true;
      "🔴": true;
    }
  ? true
  : false;

type ValidateAreas<Board extends BoardType> = Board extends [
  [
    infer H1 extends BoardLineElementType,
    infer H2 extends BoardLineElementType,
    infer H3 extends BoardLineElementType
  ],
  [
    infer H4 extends BoardLineElementType,
    infer H5 extends BoardLineElementType,
    infer H6 extends BoardLineElementType
  ],
  [
    infer H7 extends BoardLineElementType,
    infer H8 extends BoardLineElementType,
    infer H9 extends BoardLineElementType
  ],
  [
    infer H10 extends BoardLineElementType,
    infer H11 extends BoardLineElementType,
    infer H12 extends BoardLineElementType
  ],
  [
    infer H13 extends BoardLineElementType,
    infer H14 extends BoardLineElementType,
    infer H15 extends BoardLineElementType
  ],
  [
    infer H16 extends BoardLineElementType,
    infer H17 extends BoardLineElementType,
    infer H18 extends BoardLineElementType
  ],
  [
    infer H19 extends BoardLineElementType,
    infer H20 extends BoardLineElementType,
    infer H21 extends BoardLineElementType
  ],
  [
    infer H22 extends BoardLineElementType,
    infer H23 extends BoardLineElementType,
    infer H24 extends BoardLineElementType
  ],
  [
    infer H25 extends BoardLineElementType,
    infer H26 extends BoardLineElementType,
    infer H27 extends BoardLineElementType
  ]
]
  ? ValidateLine<[...H1, ...H4, ...H7]> extends true
    ? ValidateLine<[...H2, ...H5, ...H8]> extends true
      ? ValidateLine<[...H3, ...H6, ...H9]> extends true
        ? ValidateLine<[...H10, ...H13, ...H16]> extends true
          ? ValidateLine<[...H11, ...H14, ...H17]> extends true
            ? ValidateLine<[...H12, ...H15, ...H18]> extends true
              ? ValidateLine<[...H19, ...H22, ...H25]> extends true
                ? ValidateLine<[...H20, ...H23, ...H26]> extends true
                  ? ValidateLine<[...H21, ...H24, ...H27]> extends true
                    ? true
                    : false
                  : false
                : false
              : false
            : false
          : false
        : false
      : false
    : false
  : never;

type Validate<Board extends BoardType> =
  ValidateVerticalLinesAndFlat<Board> extends infer FlatedBoard extends BoardLineType
    ? FlatedBoard["length"] extends 9
      ? ValidateHorizontalLines<FlatedBoard> extends true
        ? ValidateAreas<Board>
        : false
      : false
    : false;
false;

// === TESTING ===
type TestedBoard = [
  [["🦌", "🔴", "💃"], ["🌩️", "☄️", "💨"], ["⚡", "❤️", "🌟"]],
  [["🌟", "⚡", "💨"], ["❤️", "💃", "🔴"], ["☄️", "🌩️", "🦌"]],
  [["☄️", "🌩️", "❤️"], ["⚡", "🌟", "🦌"], ["💃", "🔴", "💨"]],
  [["🌩️", "💃", "🔴"], ["🦌", "💨", "⚡"], ["🌟", "☄️", "❤️"]],
  [["❤️", "☄️", "⚡"], ["💃", "🌩️", "🌟"], ["🦌", "💨", "🔴"]],
  [["💨", "🌟", "🦌"], ["☄️", "🔴", "❤️"], ["🌩️", "💃", "⚡"]],
  [["💃", "💨", "🌟"], ["🔴", "🦌", "☄️"], ["❤️", "⚡", "🌩️"]],
  [["🔴", "❤️", "☄️"], ["🌟", "⚡", "🌩️"], ["💨", "🦌", "💃"]],
  [["⚡", "🦌", "🌩️"], ["💨", "❤️", "💃"], ["🔴", "🌟", "☄️"]]
];

type TestType = Validate<TestedBoard>;

export { Validate };

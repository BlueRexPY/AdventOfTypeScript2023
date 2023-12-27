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

type Validated9 = {
  "💨": true;
  "💃": true;
  "🦌": true;
  "🌟": true;
  "☄️": true;
  "❤️": true;
  "🌩️": true;
  "⚡": true;
  "🔴": true;
};

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
  : Accumulator extends Validated9
  ? true
  : false;

type Validate<Board extends BoardType> =
  ValidateVerticalLinesAndFlat<Board> extends infer FlatedBoard extends BoardLineType
    ? FlatedBoard["length"] extends 9
      ? ValidateHorizontalLines<FlatedBoard>
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

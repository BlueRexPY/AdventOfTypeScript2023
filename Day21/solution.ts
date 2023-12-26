type TicTacToeChipType = "❌" | "⭕";
type TicTacToeEndStateType = "❌ Won" | "⭕ Won" | "Draw";
type TicTacToeStateType = TicTacToeChipType | TicTacToeEndStateType;
type TicTacToeEmptyCellType = "  ";
type TicTacToeCellType = TicTacToeChipType | TicTacToeEmptyCellType;
type TicTacToeYPositionsType = "top" | "middle" | "bottom";
type TicTacToeXPositionsType = "left" | "center" | "right";
type TicTacToePositions =
  `${TicTacToeYPositionsType}-${TicTacToeXPositionsType}`;
type TicTactToeBoardLine = TicTacToeCellType[];
type TicTactToeBoardType = TicTactToeBoardLine[];
type TicTacToeGameType = {
  board: TicTactToeBoardType;
  state: TicTacToeStateType;
};
type EmptyBoardType = [
  ["  ", "  ", "  "],
  ["  ", "  ", "  "],
  ["  ", "  ", "  "]
];
type NewGame = {
  board: EmptyBoardType;
  state: "❌";
};
type NextMoveMap = {
  "❌": "⭕";
  "⭕": "❌";
};
type PositionIndexMap = {
  top: 0;
  center: 1;
  bottom: 2;
  left: 0;
  middle: 1;
  right: 2;
};
type WinCombinationsList = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

type CheckDraw<Board extends TicTactToeBoardLine> = Board extends [
  infer Current extends TicTacToeCellType,
  ...infer Rest extends TicTactToeBoardLine
]
  ? Current extends TicTacToeEmptyCellType
    ? false
    : CheckDraw<Rest>
  : true;

type CheckWinCombination<
  Board extends TicTactToeBoardLine,
  Target extends TicTacToeChipType,
  Combination extends number[] = [],
  Accumulator extends boolean[] = []
> = Accumulator["length"] extends 3
  ? true
  : Combination extends [
      infer CurrentIndex extends number,
      ...infer Rest extends number[]
    ]
  ? Board[CurrentIndex] extends Target
    ? CheckWinCombination<Board, Target, Rest, [...Accumulator, true]>
    : false
  : false;

type CheckWin<
  Board extends TicTactToeBoardLine,
  Target extends TicTacToeChipType,
  WinCombinations extends number[][] = []
> = WinCombinations extends [
  infer CurrentCombination extends number[],
  ...infer Rest extends number[][]
]
  ? CheckWinCombination<Board, Target, CurrentCombination> extends true
    ? true
    : CheckWin<Board, Target, Rest>
  : false;

type FlatBoard<Board extends TicTactToeBoardType> = [
  ...Board[0],
  ...Board[1],
  ...Board[2]
];

type GetState<
  Board extends TicTactToeBoardLine,
  State extends TicTacToeStateType
> = CheckDraw<Board> extends true
  ? "Draw"
  : CheckWin<Board, "❌", WinCombinationsList> extends true
  ? "❌ Won"
  : CheckWin<Board, "⭕", WinCombinationsList> extends true
  ? "⭕ Won"
  : State extends keyof NextMoveMap
  ? NextMoveMap[State]
  : never;

type ChangeInListByIndex<
  List extends TicTactToeBoardType | TicTactToeBoardLine,
  Index extends number,
  Target extends TicTacToeChipType | TicTactToeBoardLine,
  Accumulator extends any[] = []
> = List extends [
  infer Current extends TicTacToeCellType | TicTactToeBoardLine,
  ...infer Rest extends TicTactToeBoardLine | TicTactToeBoardType
]
  ? Accumulator["length"] extends Index
    ? ChangeInListByIndex<Rest, Index, Target, [...Accumulator, Target]>
    : ChangeInListByIndex<Rest, Index, Target, [...Accumulator, Current]>
  : Accumulator;

type GameResult<
  Board extends TicTactToeBoardType,
  PrevState extends TicTacToeStateType
> = {
  board: Board;
  state: GetState<FlatBoard<Board>, PrevState>;
};

type TicTacToe<
  Game extends TicTacToeGameType,
  Position extends TicTacToePositions
> = Game["state"] extends infer PrevState extends TicTacToeChipType
  ? Position extends `${infer Y extends TicTacToeYPositionsType}-${infer X extends TicTacToeXPositionsType}`
    ? Game["board"][PositionIndexMap[Y]][PositionIndexMap[X]] extends TicTacToeEmptyCellType
      ? GameResult<
          ChangeInListByIndex<
            Game["board"],
            PositionIndexMap[Y],
            ChangeInListByIndex<
              Game["board"][PositionIndexMap[Y]],
              PositionIndexMap[X],
              PrevState
            >
          >,
          PrevState
        >
      : Game
    : Game
  : Game;

export { TicTacToe, NewGame };

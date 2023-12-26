type Toy = "🛹" | "🚲" | "🛴" | "🏄";
type ToyMap = { "🛹": "🚲"; "🚲": "🛴"; "🛴": "🏄"; "🏄": "🛹" };

type List<
  Target extends string,
  Length extends number,
  Prev extends any[] = []
> = Prev extends {
  length: Length;
}
  ? Prev
  : List<Target, Length, [...Prev, Target]>;

type Rebuild<
  T extends number[],
  Prev extends any[] = [],
  Box extends any[] = [],
  CurrentToy extends Toy = "🛹"
> = T extends [infer Current extends number, ...infer Rest extends number[]]
  ? Rebuild<
      Rest,
      [...Prev, Current],
      [...Box, ...List<CurrentToy, Current>],
      ToyMap[CurrentToy]
    >
  : Box;

export { Rebuild };

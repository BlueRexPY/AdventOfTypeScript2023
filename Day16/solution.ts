type FindSantaInList<
  Forest extends any[],
  Accumulator extends any[] = []
> = Forest extends [infer Current, ...infer Rest]
  ? Current extends "🎅🏼"
    ? Accumulator["length"]
    : FindSantaInList<Rest, [...Accumulator, Current]>
  : null;

type FindSanta<
  Forest extends any[][],
  Accumulator extends any[][] = []
> = Forest extends [infer TopLine extends any[], ...infer Rest extends any[][]]
  ? FindSantaInList<TopLine> extends infer SantaIndex extends number
    ? [Accumulator["length"], SantaIndex]
    : FindSanta<Rest, [...Accumulator, TopLine]>
  : never;

export { FindSanta };

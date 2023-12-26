type FindSanta<
  Forest extends any[],
  Accumulator extends any[] = []
> = Forest extends [infer Current, ...infer Rest]
  ? Current extends "🎅🏼"
    ? Accumulator["length"]
    : FindSanta<Rest, [...Accumulator, Current]>
  : never;

export { FindSanta };

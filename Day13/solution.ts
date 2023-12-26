type List<
  Target extends number,
  Accumulator extends any[] = []
> = Accumulator["length"] extends Target
  ? Accumulator
  : List<Target, [...Accumulator, any]>;

type Increment<N extends number> = [
  ...List<N>,
  any
]["length"] extends infer Length
  ? Length extends number
    ? Length
    : never
  : never;

type DayCounter<From extends number, To extends number> = To extends From
  ? To
  : From | DayCounter<Increment<From>, To>;

export { DayCounter };

type Count<
  List extends any[],
  Target extends string,
  Accumulator extends any[] = []
> = List extends [infer Current, ...infer Rest]
  ? Current extends Target
    ? Count<Rest, Target, [...Accumulator, Current]>
    : Count<Rest, Target, [...Accumulator]>
  : Accumulator["length"];

export { Count };

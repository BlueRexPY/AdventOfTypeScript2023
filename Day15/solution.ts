type List<
  Target extends string,
  Length extends number,
  Prev extends any[] = []
> = Prev extends {
  length: Length;
}
  ? Prev
  : List<Target, Length, [...Prev, Target]>;

type BoxToys<
  Target extends string,
  Count extends number | number[]
> = Count extends number
  ? [Count] extends infer Array
    ? Array extends [
        infer Number extends number,
        ...infer Rest extends number[]
      ]
      ? List<Target, Number> | BoxToys<Target, Rest>
      : List<Target, Count>
    : never
  : never;

export { BoxToys };

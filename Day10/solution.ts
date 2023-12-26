type StreetSuffixTester<
  String extends string,
  Target extends string
> = String extends `${infer Suffix}${Target}` ? true : false;

export { StreetSuffixTester };

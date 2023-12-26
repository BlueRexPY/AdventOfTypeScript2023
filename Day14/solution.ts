type DecipherNaughtyList<Target extends string> =
  Target extends `${infer Current}/${infer Rest}`
    ? Current | DecipherNaughtyList<Rest>
    : Target;

export { DecipherNaughtyList };

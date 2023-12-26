type Reverse<String extends string> =
  String extends `${infer Current}${infer Rest}`
    ? `${Reverse<Rest>}${Current}`
    : String;

export { Reverse };

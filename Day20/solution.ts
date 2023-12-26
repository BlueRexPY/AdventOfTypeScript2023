type Letters = {
  A: ["█▀█ ", "█▀█ ", "▀ ▀ "];
  B: ["█▀▄ ", "█▀▄ ", "▀▀  "];
  C: ["█▀▀ ", "█ ░░", "▀▀▀ "];
  E: ["█▀▀ ", "█▀▀ ", "▀▀▀ "];
  H: ["█ █ ", "█▀█ ", "▀ ▀ "];
  I: ["█ ", "█ ", "▀ "];
  M: ["█▄░▄█ ", "█ ▀ █ ", "▀ ░░▀ "];
  N: ["█▄░█ ", "█ ▀█ ", "▀ ░▀ "];
  P: ["█▀█ ", "█▀▀ ", "▀ ░░"];
  R: ["█▀█ ", "██▀ ", "▀ ▀ "];
  S: ["█▀▀ ", "▀▀█ ", "▀▀▀ "];
  T: ["▀█▀ ", "░█ ░", "░▀ ░"];
  Y: ["█ █ ", "▀█▀ ", "░▀ ░"];
  W: ["█ ░░█ ", "█▄▀▄█ ", "▀ ░ ▀ "];
  " ": ["░", "░", "░"];
  ":": ["#", "░", "#"];
  "*": ["░", "#", "░"];
};

type RenderLetterLine<
  Letter extends keyof Letters,
  LineNumber extends number
> = Letters[Letter][LineNumber];

type RenderLettersLine<
  String extends string,
  LineNumber extends number
> = String extends `${infer CurrentSymbol}${infer Rest}`
  ? Uppercase<CurrentSymbol> extends infer Key extends keyof Letters
    ? `${RenderLetterLine<Key, LineNumber>}${RenderLettersLine<
        Rest,
        LineNumber
      >}`
    : ""
  : "";

type RenderLettersLines<Key extends string> = [
  RenderLettersLine<Key, 0>,
  RenderLettersLine<Key, 1>,
  RenderLettersLine<Key, 2>
];

type ToAsciiArt<String extends string> =
  String extends `${infer Key}\n${infer Rest}`
    ? [...RenderLettersLines<Key>, ...ToAsciiArt<Rest>]
    : RenderLettersLines<String>;

export { ToAsciiArt };

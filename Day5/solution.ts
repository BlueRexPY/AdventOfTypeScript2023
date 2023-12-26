type SantasList<Bads extends readonly any[], Goods extends readonly any[]> = [
  ...Bads,
  ...Goods
];

export { SantasList };

type AppendGood<Object> = {
  [Key in keyof Object as Key extends string
    ? `good_${Key}`
    : never]: Object[Key];
};

export { AppendGood };

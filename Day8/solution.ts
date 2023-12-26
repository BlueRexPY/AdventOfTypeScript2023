type RemoveNaughtyChildren<Object> = {
  [Key in keyof Object as Key extends string & `naughty_${string}`
    ? never
    : Key]: Object[Key];
};

export { RemoveNaughtyChildren };

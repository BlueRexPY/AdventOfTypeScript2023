type SantaListProtector<Target> = Target extends Function
  ? Target
  : {
      readonly [Key in keyof Target]: SantaListProtector<Target[Key]>;
    };

export { SantaListProtector };

type WinCombos = ["👊🏻", "🖐🏾"] | ["🖐🏾", "✌🏽"] | ["✌🏽", "👊🏻"];

type WhoWins<You, Me> = You extends Me
  ? "draw"
  : [You, Me] extends WinCombos
  ? "win"
  : "lose";

export { WhoWins };

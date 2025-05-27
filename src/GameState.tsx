const steps = [
  "notStarted",
  "houses",
  "markets",
  "barracks",
  "temples",
  "gardens",
  "cubes",
  "done",
] as const;
export type Step = (typeof steps)[number];

export const nextStep = (step: Step): Step => {
  const index = steps.indexOf(step);
  return steps[index + 1];
};

export interface PiecesState {
  numStars: number;
  numPieces: number;
}

export interface ScoreState {
  houses: PiecesState;
  markets: PiecesState;
  barracks: PiecesState;
  temples: PiecesState;
  gardens: PiecesState;
  numCubes: number;
}

export interface GameState {
  step: Step;
  scores: Record<string, ScoreState>;
}

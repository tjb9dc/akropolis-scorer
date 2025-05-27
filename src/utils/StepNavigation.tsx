import { useGameState } from "../GameContext";

export const StepNavigation = () => {
  const { nextStep, goToScorecard } = useGameState();

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-2">
      <button onClick={nextStep} className="w-64">
        Next
      </button>
      <button onClick={goToScorecard} className="w-64">
        Go to Scorecard
      </button>
    </div>
  );
};

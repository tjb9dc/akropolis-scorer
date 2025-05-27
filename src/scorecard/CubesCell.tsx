import { useGameState } from "../GameContext";
import { NumericInput } from "../utils/NumericInput";

export const CubesCell = ({ playerName }: { playerName: string }) => {
  const { gameState, updateNumCubes } = useGameState();

  const handleCubesChange = (value: number) => {
    const newCubes = Math.max(0, value);
    updateNumCubes(playerName, newCubes);
  };

  return (
    <div className="flex items-center justify-center">
      <NumericInput
        value={gameState.scores[playerName].numCubes}
        onChange={(value) => handleCubesChange(value)}
        className="w-8 h-8 bg-white text-center text-xs"
      />
    </div>
  );
};

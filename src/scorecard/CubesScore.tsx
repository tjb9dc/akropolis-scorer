import { useGameState } from "../GameContext";

export const CubesScore = ({ playerName }: { playerName: string }) => {
  const { gameState, updateNumCubes } = useGameState();

  const handleCubesChange = (value: number) => {
    const newCubes = Math.max(0, value);
    updateNumCubes(playerName, newCubes);
  };

  return (
    <div className="flex items-center justify-center">
      <input
        type="number"
        min="0"
        max="99"
        value={gameState.scores[playerName].numCubes}
        onChange={(e) => handleCubesChange(parseInt(e.target.value) || 0)}
        className="bg-white text-center"
      />
    </div>
  );
};

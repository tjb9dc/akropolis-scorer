import { useGameState } from "../GameContext";
import cube from "../assets/pieces/cube.png";
import { NumericInput } from "../utils/NumericInput";

export const CubesWizard = () => {
  const { gameState, updateNumCubes, nextStep, previousStep } = useGameState();

  return (
    <div className="flex flex-col items-center p-4">
      <img src={cube} alt="cube" className="w-24" />
      {/* TODO: Add some information on the scoring rules for the cube */}
      {Object.keys(gameState.scores).map((player) => (
        <div key={player} className="flex flex-col items-center p-2">
          <div className="text-2xl font-bold">{player}</div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateNumCubes(
                    player,
                    Math.max(0, gameState.scores[player].numCubes - 1)
                  )
                }
                className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
              >
                -
              </button>
              <NumericInput
                value={gameState.scores[player].numCubes}
                onChange={(value) => updateNumCubes(player, value)}
                className="w-8 h-8 bg-white text-center"
              />
              <button
                onClick={() =>
                  updateNumCubes(
                    player,
                    Math.min(99, gameState.scores[player].numCubes + 1)
                  )
                }
                className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-between w-full">
        <button onClick={previousStep}>Previous</button>
        <button onClick={nextStep}>Next</button>
      </div>
    </div>
  );
};

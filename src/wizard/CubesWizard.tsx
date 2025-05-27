import { useGameState } from "../GameContext";
import cube from "../assets/pieces/cube.png";
import { NumericInput } from "../utils/NumericInput";

export const CubesWizard = () => {
  const { gameState, updateNumCubes } = useGameState();
  const players = Object.keys(gameState.scores);
  const isOdd = players.length % 2 === 1;

  return (
    <div className="flex flex-col items-center p-4">
      <img src={cube} alt="cube" className="w-24 mb-4" />
      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
        {players.map((player, index) => (
          <div
            key={player}
            className={`flex flex-col items-center ${
              isOdd && index === players.length - 1 ? "col-span-2" : ""
            }`}
          >
            <div className="text-xl font-bold mb-2">{player}</div>
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
                className="w-12 h-12 bg-white text-center"
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
        ))}
      </div>
    </div>
  );
};

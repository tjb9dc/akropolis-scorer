import houseImg from "../assets/pieces/house.png";
import marketImg from "../assets/pieces/market.png";
import barracksImg from "../assets/pieces/barracks.png";
import templeImg from "../assets/pieces/temple.png";
import gardenImg from "../assets/pieces/garden.png";
import star from "../assets/icons/star.png";
import hexagon from "../assets/icons/hexagon.png";
import { useGameState } from "../GameContext";
import { NumericInput } from "../utils/NumericInput";

type PiecesStep = "houses" | "markets" | "barracks" | "temples" | "gardens";

type PieceConfig = {
  img: string;
  starValue: number;
};

const getPieceConfig = (step: PiecesStep): PieceConfig => {
  switch (step) {
    case "houses":
      return { img: houseImg, starValue: 1 };
    case "markets":
      return { img: marketImg, starValue: 2 };
    case "barracks":
      return { img: barracksImg, starValue: 2 };
    case "temples":
      return { img: templeImg, starValue: 2 };
    case "gardens":
      return { img: gardenImg, starValue: 3 };
    default:
      throw new Error("Unexpected step: " + step);
  }
};

export const PiecesWizard = () => {
  const { gameState, updateNumPieces, updateNumStars } = useGameState();

  const step = gameState.step as PiecesStep;
  const { img, starValue } = getPieceConfig(step);
  const players = Object.keys(gameState.scores);
  const isOdd = players.length % 2 === 1;

  return (
    <div className="flex flex-col items-center p-4">
      <img src={img} alt={step} className="w-24 mb-4" />
      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
        {players.map((player, index) => (
          <div
            key={player}
            className={`flex flex-col items-center ${
              isOdd && index === players.length - 1 ? "col-span-2" : ""
            }`}
          >
            <div className="text-xl font-bold mb-2">{player}</div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateNumStars(
                      player,
                      step,
                      Math.max(
                        0,
                        gameState.scores[player][step].numStars - starValue
                      )
                    )
                  }
                  className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                >
                  -
                </button>
                <div className="relative w-12 h-12">
                  <img src={star} alt="" className="object-contain -z-10" />
                  <NumericInput
                    value={gameState.scores[player][step].numStars}
                    onChange={(value) => updateNumStars(player, step, value)}
                    className="absolute inset-0 p-2 rounded bg-transparent text-center"
                  />
                </div>
                <button
                  onClick={() =>
                    updateNumStars(
                      player,
                      step,
                      Math.min(
                        99,
                        gameState.scores[player][step].numStars + starValue
                      )
                    )
                  }
                  className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateNumPieces(
                      player,
                      step,
                      Math.max(0, gameState.scores[player][step].numPieces - 1)
                    )
                  }
                  className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                >
                  -
                </button>
                <div className="relative w-12 h-12">
                  <img src={hexagon} alt="" className="object-contain -z-10" />
                  <NumericInput
                    value={gameState.scores[player][step].numPieces}
                    onChange={(value) => updateNumPieces(player, step, value)}
                    className="absolute inset-0 p-2 rounded bg-transparent text-center"
                  />
                </div>
                <button
                  onClick={() =>
                    updateNumPieces(
                      player,
                      step,
                      Math.min(99, gameState.scores[player][step].numPieces + 1)
                    )
                  }
                  className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <div className="text-center font-bold text-lg">
                {gameState.scores[player][step].numStars *
                  gameState.scores[player][step].numPieces}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

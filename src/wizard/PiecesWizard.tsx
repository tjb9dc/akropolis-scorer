import houseImg from "../assets/pieces/house.png";
import marketImg from "../assets/pieces/market.png";
import barracksImg from "../assets/pieces/barracks.png";
import templeImg from "../assets/pieces/temple.png";
import gardenImg from "../assets/pieces/garden.png";
import star from "../assets/icons/star.png";
import hexagon from "../assets/icons/hexagon.png";
import { useGameState } from "../GameContext";

type PiecesStep = "houses" | "markets" | "barracks" | "temples" | "gardens";

const assertNever = (step: never) => {
  throw new Error("Unexpected step: " + step);
};

const getImg = (step: PiecesStep) => {
  switch (step) {
    case "houses":
      return houseImg;
    case "markets":
      return marketImg;
    case "barracks":
      return barracksImg;
    case "temples":
      return templeImg;
    case "gardens":
      return gardenImg;
    default:
      assertNever(step);
  }
};

export const PiecesWizard = ({
  styling,
}: {
  styling: {
    img: string;
    color: string;
  };
}) => {
  const { gameState, updateNumPieces, updateNumStars } = useGameState();

  const step = gameState.step as PiecesStep;

  return (
    <div>
      {Object.keys(gameState.scores).map((player) => (
        <div key={player} className="flex items-center gap-2">
          <div>{player}</div>
          <img src={getImg(step)} alt={step} />
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12">
                <img src={star} alt="" className="object-contain -z-10" />
                <input
                  inputMode="numeric"
                  type="number"
                  min="0"
                  max="99"
                  value={gameState.scores[player][step].numStars}
                  onChange={(e) =>
                    updateNumStars(player, step, parseInt(e.target.value) || 0)
                  }
                  className="absolute inset-0 p-2 rounded bg-transparent text-center"
                />
              </div>
              x
              <div className="relative w-12 h-12">
                <img src={hexagon} alt="" className="object-contain -z-10" />
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={gameState.scores[player][step].numPieces}
                  onChange={(e) =>
                    updateNumPieces(player, step, parseInt(e.target.value) || 0)
                  }
                  className="absolute inset-0 p-2 rounded bg-transparent text-center"
                />
              </div>
            </div>
            <div className="text-center">
              ={" "}
              {gameState.scores[player][step].numStars *
                gameState.scores[player][step].numPieces}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

import houseImg from "../assets/pieces/house.png";
import playersImg from "../assets/icons/players.png";
import marketImg from "../assets/pieces/market.png";
import barracksImg from "../assets/pieces/barracks.png";
import templeImg from "../assets/pieces/temple.png";
import gardenImg from "../assets/pieces/garden.png";
import { PiecesScore } from "./PiecesScore";
import { useGameState } from "../GameContext";
import type { GameState } from "../GameState";

type Category = {
  name: string;
  img: string;
  imgWidth?: number;
  type: keyof Omit<GameState["scores"][string], "cubes">;
};

const categories: Category[] = [
  { name: "Houses", img: houseImg, type: "houses" },
  { name: "Markets", img: marketImg, type: "markets" },
  { name: "Barracks", img: barracksImg, type: "barracks" },
  { name: "Temples", img: templeImg, type: "temples" },
  { name: "Gardens", img: gardenImg, type: "gardens" },
];

export const ScoreCard = () => {
  const { gameState } = useGameState();

  const calculateTotalScore = (playerId: string) => {
    if (!gameState.scores[playerId]) return 0;

    return Object.entries(gameState.scores[playerId]).reduce(
      (total, [type, score]) => {
        if (type === "cubes") {
          return total + score;
        }
        return total + score.numStars * score.numPieces;
      },
      0
    );
  };

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <div className="border border-gray-300 rounded">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">
                  <img src={playersImg} alt="Players" className="w-16" />
                </th>
                {Object.keys(gameState.scores).map((player, index) => (
                  <th key={index} className="border border-gray-300 p-2">
                    {player}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.type}>
                  <td className="border border-gray-300 p-2 flex items-center justify-center">
                    <img
                      src={category.img}
                      alt={category.name}
                      className={`w-${category.imgWidth ?? 16} drop-shadow-lg`}
                    />
                  </td>
                  {Object.keys(gameState.scores).map((playerId) => (
                    <td key={playerId} className="border border-gray-300 p-2">
                      <PiecesScore
                        playerName={playerId}
                        pieceType={category.type}
                      />
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="border border-gray-300 p-2 font-bold text-center">
                  Total
                </td>
                {Object.keys(gameState.scores).map((playerId) => (
                  <td
                    key={playerId}
                    className="border border-gray-300 p-2 text-center font-bold"
                  >
                    {calculateTotalScore(playerId)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

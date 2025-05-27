import houseImg from "../assets/pieces/house.png";
import playersImg from "../assets/icons/players.png";
import marketImg from "../assets/pieces/market.png";
import barracksImg from "../assets/pieces/barracks.png";
import templeImg from "../assets/pieces/temple.png";
import gardenImg from "../assets/pieces/garden.png";
import { PiecesCell } from "./PiecesCell";
import { useGameState } from "../GameContext";
import type { GameState } from "../GameState";
import cube from "../assets/pieces/cube.png";
import { CubesCell } from "./CubesCell";
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

  const calculateTotalScore = (playerName: string) => {
    return Object.entries(gameState.scores[playerName]).reduce(
      (total, [type, score]) => {
        if (type === "numCubes") {
          return total + score;
        }
        return total + score.numStars * score.numPieces;
      },
      0
    );
  };

  return (
    <div className="flex-1 flex flex-col items-center">
      <div className="border border-gray-300 rounded text-sm">
        <table className="border-collapse">
          <thead>
            <tr>
              <th className="p-2">
                <img src={playersImg} alt="Players" className="w-8" />
              </th>
              {Object.keys(gameState.scores).map((player, index) => (
                <th key={index} className="border border-gray-300 p-2 text-sm">
                  {player}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.type}>
                <td className="border border-gray-300 text-center p-2">
                  <img
                    src={category.img}
                    alt={category.name}
                    className="w-8 drop-shadow-lg inline-block"
                  />
                </td>
                {Object.keys(gameState.scores).map((playerName) => (
                  <td key={playerName} className="border border-gray-300 p-2">
                    <PiecesCell
                      playerName={playerName}
                      pieceType={category.type}
                    />
                  </td>
                ))}
              </tr>
            ))}
            <tr key="cubes">
              <td className="border border-gray-300 p-2 flex items-center justify-center">
                <img src={cube} alt="cube" className="w-6 drop-shadow-lg" />
              </td>
              {Object.keys(gameState.scores).map((playerName) => (
                <td key={playerName} className="border border-gray-300 p-2">
                  <CubesCell playerName={playerName} />
                </td>
              ))}
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-bold text-center text-sm">
                Total
              </td>
              {Object.keys(gameState.scores).map((playerName) => (
                <td
                  key={playerName}
                  className="border border-gray-300 p-2 text-center font-bold text-sm"
                >
                  {calculateTotalScore(playerName)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

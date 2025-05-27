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
  const { gameState, previousStep, resetGame } = useGameState();

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
                <img src={cube} alt="cube" className={`w-12 drop-shadow-lg`} />
              </td>
              {Object.keys(gameState.scores).map((playerName) => (
                <td key={playerName} className="border border-gray-300 p-2">
                  <CubesCell playerName={playerName} />
                </td>
              ))}
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-bold text-center">
                Total
              </td>
              {Object.keys(gameState.scores).map((playerName) => (
                <td
                  key={playerName}
                  className="border border-gray-300 p-2 text-center font-bold"
                >
                  {calculateTotalScore(playerName)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-between w-full">
        <button onClick={previousStep}>Previous</button>
        <button onClick={resetGame}>Play again</button>
      </div>
    </div>
  );
};

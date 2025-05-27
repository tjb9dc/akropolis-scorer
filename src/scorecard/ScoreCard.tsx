import { useState } from "react";
import houseImg from "../assets/pieces/house.png";
import playersImg from "../assets/icons/players.png";
import marketImg from "../assets/pieces/market.png";
import barracksImg from "../assets/pieces/barracks.png";
import templeImg from "../assets/pieces/temple.png";
import gardenImg from "../assets/pieces/garden.png";
import cubeImg from "../assets/pieces/cube.png";
import { PiecesScore } from "./PiecesScore";
import { CubesScore } from "./CubesScore";

type Category = {
  name: string;
  img: string;
};

const categories: Category[] = [
  { name: "Houses", img: houseImg },
  { name: "Markets", img: marketImg },
  { name: "Barracks", img: barracksImg },
  { name: "Temples", img: templeImg },
  { name: "Gardens", img: gardenImg },
];

export const ScoreCard = () => {
  const players = ["Player 1", "Player 2"];
  const [scores, setScores] = useState<Record<string, number[]>>({});

  const handleScoreChange = (
    category: string,
    playerIndex: number,
    score: number
  ) => {
    setScores((prev) => ({
      ...prev,
      [category]: Object.assign(
        [],
        prev[category] || Array(players.length).fill(0),
        { [playerIndex]: score }
      ),
    }));
  };

  const getTotalScore = (playerIndex: number) => {
    return Object.values(scores).reduce(
      (total, categoryScores) => total + (categoryScores[playerIndex] || 0),
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
                {players.map((player, index) => (
                  <th key={index} className="border border-gray-300 p-2">
                    {player}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">
                    <img
                      src={category.img}
                      alt={category.name}
                      className="w-16 drop-shadow-lg mx-auto"
                    />
                  </td>
                  {players.map((_, playerIndex) => (
                    <td
                      key={playerIndex}
                      className="border border-gray-300 p-2"
                    >
                      <PiecesScore
                        onScoreChange={(score) =>
                          handleScoreChange(category.name, playerIndex, score)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
              <tr key="cubes">
                <td className="border border-gray-300 p-2">
                  <img
                    src={cubeImg}
                    alt="Cubes"
                    className="w-10 drop-shadow-lg mx-auto"
                  />
                </td>
                {players.map((_, playerIndex) => (
                  <td key={playerIndex} className="border border-gray-300 p-2">
                    <CubesScore
                      onScoreChange={(score) =>
                        handleScoreChange("Cubes", playerIndex, score)
                      }
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-bold text-center">
                  Total
                </td>
                {players.map((_, index) => (
                  <td
                    key={index}
                    className="border border-gray-300 p-2 text-center font-bold"
                  >
                    {getTotalScore(index)}
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

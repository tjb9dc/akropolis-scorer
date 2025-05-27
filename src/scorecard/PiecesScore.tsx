import { useState } from "react";
import star from "../assets/icons/star.png";
import hexagon from "../assets/icons/hexagon.png";

export const PiecesScore = ({
  onScoreChange,
}: {
  onScoreChange: (score: number) => void;
}) => {
  const [numStars, setNumStars] = useState(0);
  const [numPieces, setNumPieces] = useState(0);

  const handleStarsChange = (value: number) => {
    const newStars = Math.max(0, value);
    setNumStars(newStars);
    onScoreChange(newStars * numPieces);
  };

  const handlePiecesChange = (value: number) => {
    const newPieces = Math.max(0, value);
    setNumPieces(newPieces);
    onScoreChange(numStars * newPieces);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12">
          <img src={star} alt="" className="object-contain -z-10" />
          <input
            type="number"
            min="0"
            max="99"
            value={numStars}
            onChange={(e) => handleStarsChange(parseInt(e.target.value) || 0)}
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
            value={numPieces}
            onChange={(e) => handlePiecesChange(parseInt(e.target.value) || 0)}
            className="absolute inset-0 p-2 rounded bg-transparent text-center"
          />
        </div>
      </div>
      <div className="text-center">= {numStars * numPieces}</div>
    </div>
  );
};

import { useState } from "react";

export const CubesScore = ({
  onScoreChange,
}: {
  onScoreChange: (score: number) => void;
}) => {
  const [numCubes, setNumCubes] = useState(0);

  const handleCubesChange = (value: number) => {
    const newCubes = Math.max(0, value);
    setNumCubes(newCubes);
    onScoreChange(newCubes);
  };

  return (
    <div className="flex items-center justify-center">
      <input
        type="number"
        min="0"
        max="99"
        value={numCubes}
        onChange={(e) => handleCubesChange(parseInt(e.target.value) || 0)}
        className="bg-white text-center"
      />
    </div>
  );
};

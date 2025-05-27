import star from "../assets/icons/star.png";
import hexagon from "../assets/icons/hexagon.png";
import { useGameState } from "../GameContext";
import type { GameState, PiecesState } from "../GameState";

export const PiecesScore = ({
  playerName,
  pieceType,
}: {
  playerName: string;
  pieceType: keyof Omit<GameState["scores"][string], "cubes">;
}) => {
  const { gameState, updateNumPieces, updateNumStars } = useGameState();
  const score = gameState.scores[playerName][pieceType] as PiecesState;

  const handleStarsChange = (value: number) => {
    const newStars = Math.max(0, value);
    updateNumStars(playerName, pieceType, newStars);
  };

  const handlePiecesChange = (value: number) => {
    const newPieces = Math.max(0, value);
    updateNumPieces(playerName, pieceType, newPieces);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12">
          <img src={star} alt="" className="object-contain -z-10" />
          <input
            inputMode="numeric"
            type="number"
            min="0"
            max="99"
            value={score.numStars}
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
            value={score.numPieces}
            onChange={(e) => handlePiecesChange(parseInt(e.target.value) || 0)}
            className="absolute inset-0 p-2 rounded bg-transparent text-center"
          />
        </div>
      </div>
      <div className="text-center">= {score.numStars * score.numPieces}</div>
    </div>
  );
};

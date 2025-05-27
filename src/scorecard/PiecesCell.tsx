import star from "../assets/icons/star.png";
import hexagon from "../assets/icons/hexagon.png";
import { useGameState } from "../GameContext";
import type { GameState, PiecesState } from "../GameState";
import { NumericInput } from "../utils/NumericInput";

export const PiecesCell = ({
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
    <div className="flex flex-col gap-2">
      <div className="flex items-center">
        <div className="relative w-8 h-8">
          <img src={star} alt="" className="object-contain -z-10" />
          <NumericInput
            value={score.numStars}
            onChange={(value) => handleStarsChange(value)}
            className="absolute inset-0 p-1 rounded bg-transparent text-center text-xs"
          />
        </div>
        <span className="text-xs">×</span>
        <div className="relative w-8 h-8">
          <img src={hexagon} alt="" className="object-contain -z-10" />
          <NumericInput
            value={score.numPieces}
            onChange={(value) => handlePiecesChange(value)}
            className="absolute inset-0 p-1 rounded bg-transparent text-center text-xs"
          />
        </div>
      </div>
      <div className="text-center text-xs">
        = {score.numStars * score.numPieces}
      </div>
    </div>
  );
};

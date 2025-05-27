import { useGameState } from "./GameContext";
import marble1 from "./assets/styling/marble-1.jpg";
import { ScoreCard } from "./scorecard/ScoreCard";
import { BackButton } from "./utils/BackButton";
import { StepNavigation } from "./utils/StepNavigation";
import { CubesWizard } from "./wizard/CubesWizard";
import { PiecesWizard } from "./wizard/PiecesWizard";

const defaultPlayerNames = [
  "Architect 1",
  "Architect 2",
  "Architect 3",
  "Architect 4",
];

export const Game = () => {
  const {
    gameState,
    addPlayer,
    removePlayer,
    updatePlayerName,
    nextStep,
    resetGame,
  } = useGameState();

  return (
    <div
      className="min-h-screen w-screen h-screen fixed inset-0"
      style={{
        backgroundImage: `url(${marble1})`,
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
      }}
    >
      {gameState.step === "notStarted" ? (
        <div className="flex flex-col items-center pt-16">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Players</h2>
            <div className="flex flex-col gap-2">
              {Object.keys(gameState.scores).map((player, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={player}
                    onChange={(e) => updatePlayerName(player, e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                  <button
                    onClick={() => removePlayer(player)}
                    disabled={Object.keys(gameState.scores).length <= 1}
                    className="text-red-600 rounded hover:bg-red-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                onClick={() =>
                  addPlayer(
                    defaultPlayerNames.find((name) => !gameState.scores[name])!
                  )
                }
                disabled={Object.keys(gameState.scores).length >= 4}
                className="border border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                Add architect
              </button>
            </div>
          </div>
          <button
            onClick={nextStep}
            disabled={Object.keys(gameState.scores).length < 1}
          >
            Start Game
          </button>
        </div>
      ) : gameState.step !== "done" ? (
        gameState.step !== "cubes" ? (
          <>
            <BackButton />
            <PiecesWizard />
            <StepNavigation />
          </>
        ) : (
          <>
            <BackButton />
            <CubesWizard />
            <StepNavigation />
          </>
        )
      ) : (
        <>
          <BackButton />
          <ScoreCard />
          <div className="flex items-center justify-center p-2">
            <button onClick={resetGame}>Play Again</button>
          </div>
        </>
      )}
    </div>
  );
};

import { useState } from "react";
import "./App.css";
import type { GameState } from "./GameState";
import { GameProvider } from "./GameContext";
import { Game } from "./Game";

function App() {
  const [gameState, setGameState] = useState<GameState>({
    step: "notStarted",
    scores: {
      "Architect 1": {
        houses: { numStars: 0, numPieces: 0 },
        markets: { numStars: 0, numPieces: 0 },
        barracks: { numStars: 0, numPieces: 0 },
        temples: { numStars: 0, numPieces: 0 },
        gardens: { numStars: 0, numPieces: 0 },
        numCubes: 0,
      },
    },
  });

  return (
    <GameProvider initialState={gameState} onStateChange={setGameState}>
      <Game />
    </GameProvider>
  );
}

export default App;

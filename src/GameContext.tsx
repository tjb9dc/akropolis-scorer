import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import {
  nextStep,
  previousStep,
  type GameState,
  type PiecesState,
} from "./GameState";

type PieceType = keyof Omit<GameState["scores"][string], "cubes">;

interface GameContextType {
  gameState: GameState;
  updateNumPieces: (
    playerName: string,
    pieceType: PieceType,
    numPieces: number
  ) => void;
  updateNumStars: (
    playerName: string,
    pieceType: PieceType,
    numStars: number
  ) => void;
  updateNumCubes: (playerName: string, score: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  resetGame: () => void;
  addPlayer: (playerName: string) => void;
  removePlayer: (playerName: string) => void;
  updatePlayerName: (playerName: string, newName: string) => void;
}

export const GameContext = createContext<GameContextType | null>(null);

export function useGameState() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameState must be used within a GameProvider");
  }
  return context;
}

interface GameProviderProps {
  children: ReactNode;
  initialState: GameState;
  onStateChange: (newState: GameState) => void;
}

export function GameProvider({
  children,
  initialState,
  onStateChange,
}: GameProviderProps) {
  const updateNumCubes = (playerName: string, score: number) => {
    onStateChange({
      ...initialState,
      scores: {
        ...initialState.scores,
        [playerName]: {
          ...initialState.scores[playerName],
          numCubes: score,
        },
      },
    });
  };

  const updateNumPieces = (
    playerName: string,
    pieceType: PieceType,
    numPieces: number
  ) => {
    onStateChange({
      ...initialState,
      scores: {
        ...initialState.scores,
        [playerName]: {
          ...initialState.scores[playerName],
          [pieceType]: {
            ...(initialState.scores[playerName][pieceType] as PiecesState),
            numPieces,
          },
        },
      },
    });
  };

  const updateNumStars = (
    playerName: string,
    pieceType: PieceType,
    numStars: number
  ) => {
    onStateChange({
      ...initialState,
      scores: {
        ...initialState.scores,
        [playerName]: {
          ...initialState.scores[playerName],
          [pieceType]: {
            ...(initialState.scores[playerName][pieceType] as PiecesState),
            numStars,
          },
        },
      },
    });
  };

  const addPlayer = (playerName: string) => {
    onStateChange({
      ...initialState,
      scores: {
        ...initialState.scores,
        [playerName]: {
          houses: { numStars: 0, numPieces: 0 },
          markets: { numStars: 0, numPieces: 0 },
          barracks: { numStars: 0, numPieces: 0 },
          temples: { numStars: 0, numPieces: 0 },
          gardens: { numStars: 0, numPieces: 0 },
          numCubes: 0,
        },
      },
    });
  };

  const removePlayer = (playerName: string) => {
    onStateChange({
      ...initialState,
      scores: Object.fromEntries(
        Object.entries(initialState.scores).filter(
          ([key]) => key !== playerName
        )
      ),
    });
  };

  const updatePlayerName = (playerName: string, newName: string) => {
    onStateChange({
      ...initialState,
      scores: Object.fromEntries(
        Object.entries(initialState.scores).map(([key, value]) => [
          key === playerName ? newName : key,
          value,
        ])
      ),
    });
  };

  const resetGame = () => {
    onStateChange({
      ...initialState,
      step: "notStarted",
      scores: Object.fromEntries(
        Object.keys(initialState.scores).map((playerName) => [
          playerName,
          {
            houses: { numStars: 0, numPieces: 0 },
            markets: { numStars: 0, numPieces: 0 },
            barracks: { numStars: 0, numPieces: 0 },
            temples: { numStars: 0, numPieces: 0 },
            gardens: { numStars: 0, numPieces: 0 },
            numCubes: 0,
          },
        ])
      ),
    });
  };

  return (
    <GameContext.Provider
      value={{
        gameState: initialState,
        updateNumPieces,
        updateNumStars,
        updateNumCubes,
        nextStep: () => {
          onStateChange({
            ...initialState,
            step: nextStep(initialState.step),
          });
        },
        previousStep: () => {
          onStateChange({
            ...initialState,
            step: previousStep(initialState.step),
          });
        },
        resetGame,
        addPlayer,
        removePlayer,
        updatePlayerName,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

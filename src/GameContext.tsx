import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { nextStep, type GameState, type PiecesState } from "./GameState";

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
  const updateNumCubes = (playerId: string, score: number) => {
    onStateChange({
      ...initialState,
      scores: {
        ...initialState.scores,
        [playerId]: {
          ...initialState.scores[playerId],
          numCubes: score,
        },
      },
    });
  };

  const updateNumPieces = (
    playerId: string,
    pieceType: PieceType,
    numPieces: number
  ) => {
    onStateChange({
      ...initialState,
      scores: {
        ...initialState.scores,
        [playerId]: {
          ...initialState.scores[playerId],
          [pieceType]: {
            ...(initialState.scores[playerId][pieceType] as PiecesState),
            numPieces,
          },
        },
      },
    });
  };

  const updateNumStars = (
    playerId: string,
    pieceType: PieceType,
    numStars: number
  ) => {
    onStateChange({
      ...initialState,
      scores: {
        ...initialState.scores,
        [playerId]: {
          ...initialState.scores[playerId],
          [pieceType]: {
            ...(initialState.scores[playerId][pieceType] as PiecesState),
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
        addPlayer,
        removePlayer,
        updatePlayerName,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

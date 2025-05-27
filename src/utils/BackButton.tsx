import { useGameState } from "../GameContext";

export const BackButton = () => {
  const { previousStep } = useGameState();
  return (
    <div className="flex justify-start p-2">
      <button
        onClick={previousStep}
        className="text-gray-600 hover:text-gray-800"
      >
        ←
      </button>
    </div>
  );
};

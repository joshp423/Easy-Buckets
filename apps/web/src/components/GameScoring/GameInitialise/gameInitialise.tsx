type GameInitialiseProps = {
  setNewGameCheck: React.Dispatch<
    React.SetStateAction<"none" | "new" | "existing">
  >;
};

export default function GameInitialise({
  setNewGameCheck,
}: GameInitialiseProps) {
  return (
    <div className="gameInitialise">
      <button
        onClick={() => {
          setNewGameCheck("new");
        }}
      >
        Score New Game
      </button>
      <button
        onClick={() => {
          setNewGameCheck("existing");
        }}
      >
        Continuing Scoring Existing Game
      </button>
    </div>
  );
}

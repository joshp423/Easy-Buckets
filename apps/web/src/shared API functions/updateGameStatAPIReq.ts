import type { stackStat } from "../components/GameScoring/ScoringInterface/scoringInterface";

type updateGameStatAPIProps = {
  gameStatlineId: number;
  // gameStatline: GameStatlineUpload;
  statlineUpdateField: string;
  statlineUpdateIndicator: boolean;
  setUndoStack: React.Dispatch<React.SetStateAction<stackStat[]>>;
  undoStack: stackStat[];
};

export async function updateGameStatAPIReq({
  gameStatlineId,
  statlineUpdateField,
  statlineUpdateIndicator,
  undoStack,
  setUndoStack
}: updateGameStatAPIProps) {
  const rsp = await fetch("http://localhost:3000/games/gameStatlines/update", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "PUT",
    body: JSON.stringify({
      gameStatlineId,
      statlineUpdateField,
      statlineUpdateIndicator,
    }),
  });

  const data = await rsp.json();
  
  const newUndo = {
    type: statlineUpdateField,
    adding: statlineUpdateIndicator,
    gameStatId: gameStatlineId
  }
  setUndoStack([...undoStack, newUndo])
  
  return data;
}

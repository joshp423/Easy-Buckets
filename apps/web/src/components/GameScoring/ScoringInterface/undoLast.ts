import type { stackStat } from "./scoringInterface";
import { updateGameStatAPIReq } from "../../../shared API functions/updateGameStatAPIReq";
import { deleteShotAPIReq } from "./deleteShotsAPIReq";
import type { ShotLog } from "../../../types/shotLog";

export default async function undoLast(
  shotLog: ShotLog | null,
  undoStack: stackStat[],
  setUndoStack: React.Dispatch<React.SetStateAction<stackStat[]>>,
  redoStack: stackStat[],
  setRedoStack: React.Dispatch<React.SetStateAction<stackStat[]>>,
) {
  // const navigate = useNavigate();
  console.log(undoStack)
  if (undoStack.length === 0) return;
  const lastStackAction = undoStack[undoStack.length - 1];
  if (
    lastStackAction.type === "2P Make" ||
    lastStackAction.type === "2P Miss" ||
    lastStackAction.type === "3P Make" ||
    lastStackAction.type === "3P Miss"
  ) {
    if (!shotLog) return;
    try {
      await deleteShotAPIReq(shotLog[0].id);
      await updateGameStatAPIReq({
        gameStatlineId: lastStackAction.gameStatId,
        statlineUpdateField: lastStackAction.type,
        statlineUpdateIndicator: false,
        setUndoStack,
        undoStack,
      });
      const newUndoStack = undoStack.slice(0, -1);
      setUndoStack(newUndoStack);
    } catch  {
      // navigate("/error", error);
    }
  } else {
    await updateGameStatAPIReq({
      gameStatlineId: lastStackAction.gameStatId,
      statlineUpdateField: lastStackAction.type,
      statlineUpdateIndicator: false,
      setUndoStack,
      undoStack,
    });
    const newUndoStack = undoStack.slice(0, -1);
    setUndoStack(newUndoStack);
  }
  const newRedo = {
    type: lastStackAction.type,
    adding: false,
    gameStatId: lastStackAction.gameStatId,
  };
  setRedoStack([...redoStack, newRedo]);

}

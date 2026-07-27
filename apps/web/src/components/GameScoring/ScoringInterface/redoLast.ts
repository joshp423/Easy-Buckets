import type { stackStat } from "./scoringInterface";
import { updateGameStatAPIReq } from "../../../shared API functions/updateGameStatAPIReq";
import { uploadShotAPIReq } from "../../../shared API functions/uploadShotAPIReq";
import type { redoStat } from "./scoringInterface";

export default async function redoLast(
  undoStack: stackStat[],
  setUndoStack: React.Dispatch<React.SetStateAction<stackStat[]>>,
  redoStack: redoStat[],
  setRedoStack: React.Dispatch<React.SetStateAction<redoStat[]>>,
) {
  // const navigate = useNavigate();
  if (redoStack.length === 0) return;
  const lastStackAction = redoStack[redoStack.length - 1];
  if (
    lastStackAction.type === "2P Make" ||
    lastStackAction.type === "2P Miss" ||
    lastStackAction.type === "3P Make" ||
    lastStackAction.type === "3P Miss"
  ) {
    try {
      await uploadShotAPIReq({
        gameStatlineId: lastStackAction.gameStatId,
        shot: lastStackAction.shotInfo,
      });
      await updateGameStatAPIReq({
        gameStatlineId: lastStackAction.gameStatId,
        statlineUpdateField: lastStackAction.type,
        statlineUpdateIndicator: true,
      });
      const newRedoStack = redoStack.slice(0, -1);
      setRedoStack(newRedoStack);
      const newUndo = {
        type: lastStackAction.type,
        adding: true,
        gameStatId: lastStackAction.gameStatId,
      };
      setUndoStack([...undoStack, newUndo]);
    } catch {
      // navigate("/error", error);
    }
  } else {
    await updateGameStatAPIReq({
      gameStatlineId: lastStackAction.gameStatId,
      statlineUpdateField: lastStackAction.type,
      statlineUpdateIndicator: true,
    });
    const newRedoStack = redoStack.slice(0, -1);
    setRedoStack(newRedoStack);
    const newUndo = {
      type: lastStackAction.type,
      adding: true,
      gameStatId: lastStackAction.gameStatId,
    };
    setUndoStack([...undoStack, newUndo]);
  }
}

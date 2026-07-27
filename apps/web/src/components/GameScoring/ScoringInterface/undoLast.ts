import type { stackStat } from "./scoringInterface";
import { updateGameStatAPIReq } from "../../../shared API functions/updateGameStatAPIReq";
import { deleteShotAPIReq } from "./deleteShotsAPIReq";
import type { ShotLog } from "../../../types/shotLog";
import type { redoStat } from "./scoringInterface";

export default async function undoLast(
  shotLog: ShotLog | null,
  undoStack: stackStat[],
  setUndoStack: React.Dispatch<React.SetStateAction<stackStat[]>>,
  redoStack: redoStat[],
  setRedoStack: React.Dispatch<React.SetStateAction<redoStat[]>>,
) {
  // const navigate = useNavigate();
  console.log(undoStack);
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
      const shot = await deleteShotAPIReq(shotLog[0].id);
      await updateGameStatAPIReq({
        // if undoing dont add the undo to undoStack, need to differentiate here
        gameStatlineId: lastStackAction.gameStatId,
        statlineUpdateField: lastStackAction.type,
        statlineUpdateIndicator: false,
      });
      const newRedo = {
        type: lastStackAction.type,
        adding: false,
        gameStatId: lastStackAction.gameStatId,
        shotInfo: shot,
      };
      setRedoStack([...redoStack, newRedo]);
      const newUndoStack = undoStack.slice(0, -1);
      setUndoStack(newUndoStack);
    } catch {
      // navigate("/error", error);
    }
  } else {
    await updateGameStatAPIReq({
      gameStatlineId: lastStackAction.gameStatId,
      statlineUpdateField: lastStackAction.type,
      statlineUpdateIndicator: false,
    });
    const newRedo = {
      type: lastStackAction.type,
      adding: false,
      gameStatId: lastStackAction.gameStatId,
      shotInfo: {
        make: true,
        X: 0,
        Y: 0,
        type: 0,
        timeStamp: 0,
      },
    };
    setRedoStack([...redoStack, newRedo]);
    const newUndoStack = undoStack.slice(0, -1);
    setUndoStack(newUndoStack);
  }
}

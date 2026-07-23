import type { stackStat } from "./scoringInterface";
import { updateGameStatAPIReq } from "../../../shared API functions/updateGameStatAPIReq";
import { deleteShotAPIReq } from "./deleteShotsAPIReq";
import type { ShotLog } from "../../../types/shotLog";

export default function undoLast(
  shotLog: ShotLog | null,
  undoStack: stackStat[],
  setUndoStack: React.Dispatch<React.SetStateAction<stackStat[]>>,
  redoStack: stackStat[],
  setRedoStack: React.Dispatch<React.SetStateAction<stackStat[]>>,
) {
  // const navigate = useNavigate();
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
      deleteShotAPIReq(shotLog[0].id);
      updateGameStatAPIReq({
        gameStatlineId: lastStackAction.gameStatId,
        statlineUpdateField: lastStackAction.type,
        statlineUpdateIndicator: false,
        setUndoStack,
        undoStack,
      });
    } catch  {
      // navigate("/error", error);
    }
  } else {
    updateGameStatAPIReq({
      gameStatlineId: lastStackAction.gameStatId,
      statlineUpdateField: lastStackAction.type,
      statlineUpdateIndicator: false,
      setUndoStack,
      undoStack,
    });
  }
  const newRedo = {
    type: lastStackAction.type,
    adding: false,
    gameStatId: lastStackAction.gameStatId,
  };
  setRedoStack([...redoStack, newRedo]);

}

import type { stackStat } from "./scoringInterface";

export default function undoLast(
    undoStack: stackStat[], 
    setUndoStack: React.Dispatch<React.SetStateAction<stackStat[]>>, 
    setRedoStack: React.Dispatch<React.SetStateAction<stackStat[]>>
  ) {
    if (undoStack.length === 0) return;
    const lastStackAction = undoStack[undoStack.length -1];
    switch (lastStackAction.type) {
        case "2P Make": {

        }
    }
  }
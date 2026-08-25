import deleteGameAPIReq from "./deleteGameAPIReq";
import deleteSeasonAPIReq from "./deleteSeasonAPIReq";

type DeleteCheckProps = {
  deletedObj: "game" | "season" | null;
  deletedObjId: number | null;
  setDeleteCheck: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeleteCheck({
  deletedObj,
  deletedObjId,
  setDeleteCheck,
}: DeleteCheckProps) {
  async function deleteObj() {
    if (!deletedObjId) return;

    switch (deletedObj) {
      case "season": {
        const deletedSeason = await deleteSeasonAPIReq(deletedObjId);
        if (deletedSeason) {
          setDeleteCheck(false);
        }
        break;
      }
      case "game": {
        const deletedGame = await deleteGameAPIReq(deletedObjId);
        if (deletedGame) {
          setDeleteCheck(false);
        }
        break;
      }
    }
  }

  return (
    <div className="deleteCheck">
      <h3>Are you sure you want to delete this {deletedObj}?</h3>
      <button
        onClick={() => {
          deleteObj();
        }}
      >
        Yes
      </button>
      <button
        onClick={() => {
          setDeleteCheck(false);
        }}
      >
        No, go back
      </button>
    </div>
  );
}

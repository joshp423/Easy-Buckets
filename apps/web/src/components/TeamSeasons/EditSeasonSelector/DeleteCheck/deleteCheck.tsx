import deleteGameAPIReq from "./deleteGameAPIReq";
import deleteSeasonAPIReq from "./deleteSeasonAPIReq";
import deletePlayerDetailsAPIReq from "../../PlayerListEdit/EditPlayer/deletePlayerAPIReq";
import "./deleteCheck.css";
import { useState } from "react";
import LoadingBall from "../../../../assets/LoadingBall/loadingball";

type DeleteCheckProps = {
  deletedObj: "game" | "season" | "player" | null;
  deletedObjId: number | null;
  setDeleteCheck: React.Dispatch<React.SetStateAction<boolean>>;
  deleteCheck: boolean;
};

export default function DeleteCheck({
  deletedObj,
  deletedObjId,
  setDeleteCheck,
  deleteCheck,
}: DeleteCheckProps) {
  const [loading, setLoading] = useState<boolean>(false);
  async function deleteObj() {
    if (!deletedObjId) return;
    setLoading(true)

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
      case "player": {
        const deletedPlayer = await deletePlayerDetailsAPIReq(deletedObjId);
        if (deletedPlayer) {
          setDeleteCheck(false);
        }
        break;
      }
    }
    setLoading(false)
  }

  return (
    <div
      className="deleteCheck"
      style={deleteCheck ? { display: "flex" } : { display: "none" }}
    >
      <h3>Are you sure you want to delete this {deletedObj}?</h3>
      <div>
        <button
          onClick={() => {
            deleteObj();
          }}
        >
          {loading ? <LoadingBall /> :"Yes"}
        </button>
        <button
          onClick={() => {
            setDeleteCheck(false);
          }}
        >
          No, go back
        </button>
      </div>
    </div>
  );
}

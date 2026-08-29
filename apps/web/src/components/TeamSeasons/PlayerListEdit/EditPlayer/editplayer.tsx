import type { Player } from "../../../../types/player";
import { useState, type SyntheticEvent } from "react";
import { editPlayerDetailsAPIReq } from "./editPlayerDetailsAPIReq";
import "./editPlayer.css";
import DeleteCheck from "../../EditSeasonSelector/DeleteCheck/deleteCheck";
import LoadingBall from "../../../../assets/LoadingBall/loadingball";

type EditPlayerProps = {
  editPlayer: Player | null;
  setEditPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
};

export default function EditPlayer({
  editPlayer,
  setEditPlayer,
}: EditPlayerProps) {
  const [deleteCheck, setDeleteCheck] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  if (!editPlayer) return;

  async function confirmPlayerEdit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!editPlayer) return;
    setLoading(true);
    const form = new FormData(e.currentTarget);

    console.log(form.get("playerName") as string, Number(form.get("playerNumber")), editPlayer.id)

    const updatedPlayer = await editPlayerDetailsAPIReq({
      player: {
        name: form.get("playerName") as string,
        number: Number(form.get("playerNumber")),
        id: editPlayer.id,
      },
    });

    if (updatedPlayer) {
      setEditPlayer(null);
    }
    setLoading(false);
    return;
  }

  if (deleteCheck) {
    return (
      <DeleteCheck
        deletedObj={"player"}
        deletedObjId={editPlayer.id}
        deleteCheck={deleteCheck}
        setDeleteCheck={setDeleteCheck}
      />
    );
  }
  return (
    <div className="editPlayer">
      <form onSubmit={confirmPlayerEdit}>
        <label htmlFor="playerName">Edit Player Name: </label>
        <input type="text" id="playerName" name="playerName" defaultValue={editPlayer.name} />
        <label htmlFor="playerNumber">Edit Player Number: </label>
        <input
          type="number"
          id="playerNumber"
          defaultValue={editPlayer.number}
        />
        <button type="submit">{loading ? <LoadingBall /> :"Confirm Changes"}</button>
        <button
          type="button"
          onClick={() => {
            setDeleteCheck(true);
          }}
        >
          Delete Player From Team
        </button>
      </form>
      <button
        type="button"
        onClick={() => {
          setEditPlayer(null);
        }}
      >
        Back
      </button>
    </div>
  );
}

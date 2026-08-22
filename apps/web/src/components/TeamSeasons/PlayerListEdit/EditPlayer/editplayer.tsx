import type { Player } from "../../../../types/player";
import { type SyntheticEvent } from "react";
import { editPlayerDetailsAPIReq } from "./editPlayerDetailsAPIReq";
import { deletePlayerDetailsAPIReq } from "./deletePlayerAPIReq";

type EditPlayerProps = {
  editPlayer: Player | null;
  setEditPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
};

export default function EditPlayer({
  editPlayer,
  setEditPlayer,
}: EditPlayerProps) {
  // add loading
  if (!editPlayer) return;

  async function confirmPlayerEdit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!editPlayer) return;

    const form = new FormData(e.currentTarget);

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
    return;
  }

  async function deletePlayer(playerId: number) {
    const deletedPlayer = await deletePlayerDetailsAPIReq(playerId);
    if (deletedPlayer) {
      setEditPlayer(null);
    }
    return;
  }

  return (
    <div className="editPlayer">
      <form onSubmit={confirmPlayerEdit}>
        <label htmlFor="playerName">Edit Player Name: </label>
        <input type="text" name="playerName" defaultValue={editPlayer.name} />
        <label htmlFor="playerNumber">Edit Player Number: </label>
        <input
          type="number"
          name="playerNumber"
          defaultValue={editPlayer.number}
        />
        <button type="submit">Confirm Changes</button>
        <button
          type="button"
          onClick={() => {
            deletePlayer(editPlayer.id);
          }}
        >
          Delete Player from team
        </button>
      </form>
    </div>
  );
}

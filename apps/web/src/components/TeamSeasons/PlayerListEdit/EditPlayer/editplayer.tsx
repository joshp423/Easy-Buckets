import type { Player } from "../../../../types/player";
import { useState, type SyntheticEvent } from "react";
import { editPlayerDetailsAPIReq } from "./editPlayerDetailsAPIReq";
import { deletePlayerDetailsAPIReq } from "./deletePlayerAPIReq";

type EditPlayerProps = {
  editPlayer: Player | null;
  setEditPlayer: React.Dispatch<React.SetStateAction<Player | null>>
};

export default function EditPlayer({ editPlayer, setEditPlayer }: EditPlayerProps) {
  // add loading
  const [playerName, setPlayerName] = useState<string>("");
  const [playerNumber, setPlayerNumber] = useState<number>(0);

  if (!editPlayer) return;

  setPlayerName(editPlayer.name);
  setPlayerNumber(editPlayer.number);

  async function confirmPlayerEdit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editPlayer) return;
    const updatedPlayer = await editPlayerDetailsAPIReq({player: {
      name: playerName,
      number: playerNumber,
      id: editPlayer.id
    }});
    if (updatedPlayer) {
      setEditPlayer(null)
    }
    return;
  }

  async function deletePlayer(playerId: number) {
    const deletedPlayer = await deletePlayerDetailsAPIReq(playerId);
    if (deletedPlayer) {
      setEditPlayer(null)
    }
    return;
  }

  return (
    <div className="editPlayer">
      <form onSubmit={confirmPlayerEdit}>
        <label htmlFor="playerName">Edit Player Name: </label>
        <input
          onChange={(e) => {
            setPlayerName(e.target.value);
          }}
          type="text"
          name="playerName"
          defaultValue={editPlayer.name}
        />
        <label htmlFor="playerName">Edit Player Number: </label>
        <input
          onChange={(e) => {
            setPlayerNumber(Number(e.target.value));
          }}
          type="number"
          name="playerName"
          defaultValue={editPlayer.number}
        />
        <button type="submit">Confirm Changes</button>
        <button type="button" onClick={() => {deletePlayer(editPlayer.id)}}>Delete Player from team</button>
      </form>
    </div>
  );
}

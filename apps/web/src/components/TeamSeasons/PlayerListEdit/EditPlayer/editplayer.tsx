import type { Player } from "../../../../types/player";
import { useState, type SyntheticEvent } from "react";
import { editPlayerDetailsAPIReq } from "./editPlayerDetailsAPIReq";

type EditPlayerProps = {
  editPlayer: Player;
  setEditPlayer: React.Dispatch<React.SetStateAction<Player | null>>
};

export default function EditPlayer({ editPlayer, setEditPlayer }: EditPlayerProps) {
  // add loading
  const [playerName, setPlayerName] = useState<string>(editPlayer.name);
  const [playerNumber, setPlayerNumber] = useState<number>(editPlayer.number);

  async function confirmPlayerEdit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
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

  function deletePlayer() {}

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
          placeholder={editPlayer.name}
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
        <button type="button">Delete Player from team</button>
      </form>
    </div>
  );
}

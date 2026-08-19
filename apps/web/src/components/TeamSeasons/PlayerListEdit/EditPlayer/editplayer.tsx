import type { Player } from "../../../../types/player";
import { useState, type SyntheticEvent } from "react";
import { editPlayerDetailsAPIReq } from "./editPlayerDetailsAPIReq";

type EditPlayerProps = {
  editPlayer: Player;
  setEditPlayer: React.Dispatch<React.SetStateAction<Player | null>>
};

export default function EditPlayer({ editPlayer, setEditPlayer }: EditPlayerProps) {
  
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
          value={editPlayer.name}
        />
        <label htmlFor="playerName">Edit Player Number: </label>
        <input
          onChange={(e) => {
            setPlayerNumber(Number(e.target.value));
          }}
          type="number"
          name="playerName"
          value={editPlayer.number}
        />
        <button type="button">Delete Player from team</button>
        <button type="submit">Confirm Changes</button>
      </form>
    </div>
  );
}

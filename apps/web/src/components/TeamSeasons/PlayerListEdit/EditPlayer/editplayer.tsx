import type { Player } from "../../../../types/player";
import { useState, type SyntheticEvent } from "react";

type EditPlayerProps = {
  editPlayer: Player;
};

export default function EditPlayer({ editPlayer }: EditPlayerProps) {
  const [playerName, setPlayerName] = useState<string>(editPlayer.name);
  const [playerNumber, setPlayerNumber] = useState<number>(editPlayer.number);

  function confirmPlayerEdit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
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

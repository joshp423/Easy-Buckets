import { useEffect, useState } from "react";
import { Player } from "../../../types/player";
import { createPlayersAPIRequest } from "./createPlayersAPIRequest";

export default function CreatePlayers() {
  const [addPlayersAmount, setAddPlayersAmount] = useState<number>(1);
  const [newPlayers, setNewPlayers] = useState<Player[]>([])

  const canDecreasePlayers = () => (addPlayersAmount === 1 ? false : true);
  const canIncreasePlayers = () => (addPlayersAmount >= 7 ? false : true);

  useEffect(() => {
    setNewPlayers(prev => Array.from({length: addPlayersAmount}, (_, i) => 
        prev[i] ?? { name '', number: 0 })
    )
  }, [addPlayersAmount]);

  return (
    <div className="addPlayers">
      <h1>Add New Players</h1>
      <form onSubmit={
        
        createPlayersAPIRequest(newPlayers)
      }>
        {Array.from({ length: addPlayersAmount }).map((_, i) => (
          <div key={i}>
            <input type="text" placeholder="Player Name" />
            <input type="number" placeholder="Player Number" />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            canDecreasePlayers() && setAddPlayersAmount(addPlayersAmount - 1)
          }
          style={
            addPlayersAmount === 1
              ? { opacity: "0.6", cursor: "not-allowed" }
              : undefined
          }
        >
          -
        </button>
        <button
          type="button"
          onClick={() =>
            canIncreasePlayers() && setAddPlayersAmount(addPlayersAmount + 1)
          }
          style={
            addPlayersAmount >= 7
              ? { opacity: "0.6", cursor: "not-allowed" }
              : undefined
          }
        >
          +
        </button>
        <button type="submit">Add Players</button>
      </form>
    </div>
  );
}

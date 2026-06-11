import { useEffect, useState, type SyntheticEvent } from "react";
import type { NewPlayer } from "../../../types/newPlayer";
import { createPlayersAPIRequest } from "./createPlayersAPIRequest";
import { useNavigate } from "react-router";

export default function CreatePlayers() {
  const [addPlayersAmount, setAddPlayersAmount] = useState<number>(1);
  const [newPlayers, setNewPlayers] = useState<NewPlayer[]>([]);

  const canDecreasePlayers = () => (addPlayersAmount === 1 ? false : true);
  const canIncreasePlayers = () => (addPlayersAmount >= 7 ? false : true);
  const navigate = useNavigate();

  const updatePlayer = (index: number, field: keyof NewPlayer, value: string | number) => 
    setNewPlayers(prev => {
      const updated = [...prev];
      updated[index] = {...updated[index], [field]: value} //field is a computed property key, field used as key
      return updated
    })

  useEffect(() => {
    //take the previous array and create an array
    const load = async () => {
      setNewPlayers((prev) =>
        Array.from(
          { length: addPlayersAmount },
          (_, i) => prev[i] ?? { name: "", number: 0 }, //if null add placeholder
        ),
      );
    };
    load();
  }, [addPlayersAmount]);

  async function uploadNewPlayers(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const rsp = await createPlayersAPIRequest({ newPlayers });
    console.log(rsp.status)
    if (rsp.status === 201) {
      navigate(0);
      return;
    }
    navigate("/error", {
      state: {
        error: "New message failed, try again later.",
      },
    });
    return
  }

  return (
    <div className="addPlayers">
      <h1>Add New Players</h1>
      <form onSubmit={uploadNewPlayers}>
        {Array.from({ length: addPlayersAmount }).map((_, i) => (
          <div key={i}>
            <input 
              type="text" 
              placeholder="Player Name" 
              value={newPlayers[i]?.name ?? ''} 
              onChange={(e) => { updatePlayer(i, 'name', e.target.value)}}
            />
            <input 
              type="number" 
              placeholder="Player Number"  
              onChange={(e) => { updatePlayer(i, 'number', Number(e.target.value))}}
            />
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

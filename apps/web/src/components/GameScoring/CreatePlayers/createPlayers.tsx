import { useEffect, useState, type SyntheticEvent } from "react";
import type { NewPlayer } from "../../../types/newPlayer";
import { createPlayersAPIRequest } from "./createPlayersAPIRequest";
import { useNavigate } from "react-router";
import "./createPlayers.css";
import LoadingBall from "../../../assets/LoadingBall/loadingball";

type CreatePlayersProps = {
  setAddPlayer: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreatePlayers({ setAddPlayer }: CreatePlayersProps) {
  const [addPlayersAmount, setAddPlayersAmount] = useState<number>(1);
  const [newPlayers, setNewPlayers] = useState<NewPlayer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const canDecreasePlayers = () => (addPlayersAmount === 1 ? false : true);
  const canIncreasePlayers = () => (addPlayersAmount >= 7 ? false : true);
  const navigate = useNavigate();

  const updatePlayers = (
    index: number,
    field: keyof NewPlayer,
    value: string | number,
  ) =>
    setNewPlayers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value }; //field is a computed property key, field used as key
      return updated;
    });

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
    setLoading(true);
    const rsp = await createPlayersAPIRequest({ newPlayers });
    const data = await rsp.json();
    switch (rsp.status) {
      case 201:
        navigate(0);
        return;
      case 400:
        setError(data.errors)
        return;
      case 403:
        navigate("/error", {
          state: {
            error: "An unexpected error occured, please try again later",
          },
        });
        return;
    }
    setLoading(false);
    return;
  }

  return (
    <div className="addPlayers">
      <h1>Add New Players</h1>
      <div className="errorHandling">
          <p>{error}</p>
        </div>
      <form onSubmit={uploadNewPlayers}>
        {Array.from({ length: addPlayersAmount }).map((_, i) => (
          <div key={i}>
            <input
              type="text"
              placeholder="Player Name"
              value={newPlayers[i]?.name ?? ""}
              required
              onChange={(e) => {
                updatePlayers(i, "name", e.target.value);
              }}
            />
            <input
              type="number"
              placeholder="Player Number"
              max={99}
              required
              onChange={(e) => {
                updatePlayers(i, "number", Number(e.target.value));
              }}
            />
          </div>
        ))}
        <div>
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
        </div>
        <button type="submit">
          {loading ? <LoadingBall /> : "Add Players"}
        </button>
      </form>
      <button
        type="button"
        onClick={() => {
          setAddPlayer(false);
        }}
      >
        Back
      </button>
    </div>
  );
}

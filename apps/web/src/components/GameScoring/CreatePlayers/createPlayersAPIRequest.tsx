import { type Player } from "../../../types/player";

type createPlayersAPIRequestProps = {
  newPlayers: Player[]
};

export async function createPlayersAPIRequest({
  newPlayers
  
}: createPlayersAPIRequestProps) {
  const rsp = await fetch(
    "http://localhost:3000//teams/players/create",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "PUT",
      body: JSON.stringify({
        newPlayers
      })
    },
  );

  const data = await rsp.json();
  const team = teamSchema.parse(data);
  return team;
}


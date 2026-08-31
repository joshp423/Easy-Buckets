import type { NewPlayer } from "../../../types/newPlayer";

type createPlayersAPIRequestProps = {
  newPlayers: NewPlayer[];
};

export async function createPlayersAPIRequest({
  newPlayers,
}: createPlayersAPIRequestProps) {
  console.log(newPlayers);
  const rsp = await fetch("http://localhost:3000/teams/players/create", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "POST",
    body: JSON.stringify({
      players: newPlayers,
    }),
  });
  return rsp;
}

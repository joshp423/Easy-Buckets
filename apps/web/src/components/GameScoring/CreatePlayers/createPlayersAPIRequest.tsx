import type { NewPlayer } from "../../../types/newPlayer";
import { API_URL } from "../../../config/api";

type createPlayersAPIRequestProps = {
  newPlayers: NewPlayer[];
};

export async function createPlayersAPIRequest({
  newPlayers,
}: createPlayersAPIRequestProps) {
  const rsp = await fetch(`${API_URL}/teams/players/create`, {
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

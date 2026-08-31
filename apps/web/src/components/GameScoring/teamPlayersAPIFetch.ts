import z from "zod";
import { playerSchema } from "../../types/player";
import { API_URL } from "../../config/api";

const playerArraySchema = z.array(playerSchema);

export async function teamPlayersAPIFetch() {
  const rsp = await fetch(`${API_URL}/teams/players`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "GET",
  });

  const data = await rsp.json();
  const players = playerArraySchema.parse(data);
  return players;
}

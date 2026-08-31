import { gameSchema } from "../types/game";
import { API_URL } from "../config/api";

export async function getSingleGameAPIFetch(id: number) {
  const rsp = await fetch(`${API_URL}/games/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "GET",
  });

  const data = await rsp.json();
  const game = gameSchema.parse(data);
  return game;
}

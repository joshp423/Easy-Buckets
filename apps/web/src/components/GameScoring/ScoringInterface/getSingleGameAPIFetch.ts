import { gameSchema } from "../../../types/game";

export async function getSingleGameAPIFetch(id: number) {
  const rsp = await fetch(`http://localhost:3000/games/${id}`, {
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

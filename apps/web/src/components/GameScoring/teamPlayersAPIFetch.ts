import { playerSchema } from "../../types/player";

export async function teamPlayersAPIFetch() {
  const rsp = await fetch("http://localhost:3000/team/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "GET",
  });
  
  const data = await rsp.json();
  const players = playerSchema.parse(data.players)
  return players

}
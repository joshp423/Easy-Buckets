import { API_URL } from "../../../../config/api";

export default async function deletePlayerDetailsAPIReq(playerId: number) {
  const rsp = await fetch(`${API_URL}/teams/players/delete`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "DELETE",
    body: JSON.stringify({
      playerId,
    }),
  });

  const data = await rsp.json();

  return data;
}

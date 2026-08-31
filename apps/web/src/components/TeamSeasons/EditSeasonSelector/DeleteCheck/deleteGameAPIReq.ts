import { API_URL } from "../../../../config/api";

export default async function deleteGameAPIReq(gameId: number) {
  const rsp = await fetch(`${API_URL}/games/${gameId}/delete`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "DELETE",
  });

  const data = rsp.json();
  return data;
}

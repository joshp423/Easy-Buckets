import { API_URL } from "../../../config/api";

export async function publishGameAPIReq(gameId: number) {
  const rsp = await fetch(`${API_URL}/games/${gameId}/publish`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "PUT",
  });

  return rsp;
}

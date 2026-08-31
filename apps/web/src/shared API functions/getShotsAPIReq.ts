import { shotLogSchema } from "../types/shotLog";
import { API_URL } from "../config/api";

export async function getShotsAPIReq(gameId: number) {
  const rsp = await fetch(`${API_URL}/games/${gameId}/shots`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "GET",
  });

  const data = await rsp.json();
  const shotLog = shotLogSchema.parse(data);
  return shotLog;
}

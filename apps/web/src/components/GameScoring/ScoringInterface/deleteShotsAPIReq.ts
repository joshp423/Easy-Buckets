import { shotSchema } from "../../../types/shot";
import { API_URL } from "../../../config/api";

export async function deleteShotAPIReq(shotId: number) {
  const rsp = await fetch(`${API_URL}/games/shots/${shotId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "DELETE",
  });

  const data = await rsp.json();
  const shotData = shotSchema.parse(data);
  return shotData;
}

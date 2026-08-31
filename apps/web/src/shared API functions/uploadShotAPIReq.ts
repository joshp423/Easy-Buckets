import { shotSchema } from "../types/shot";
import type { Shot } from "../types/shot";
import { API_URL } from "../config/api";

type uploadShotAPIReqProps = {
  gameStatlineId: number;
  shot: Shot;
};

export async function uploadShotAPIReq({
  gameStatlineId,
  shot,
}: uploadShotAPIReqProps) {
  const rsp = await fetch(`${API_URL}/games/shots/create`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "POST",
    body: JSON.stringify({
      gameStatlineId,
      shot,
    }),
  });

  const data = await rsp.json();
  const shotData = shotSchema.parse(data);
  return shotData;
}

import { shotSchema } from "../../../types/shot";

export async function deleteShotAPIReq(shotId: number) {
  const rsp = await fetch(`http://localhost:3000/games/shots/${shotId}`, {
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

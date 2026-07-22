import { shotSchema } from "../../../types/shot";

export async function deleteShotAPIReq(shotId: number) {
  const rsp = await fetch("http://localhost:3000/games/shots/delete", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "DELETE",
    body: JSON.stringify({
      shotId,
    }),
  });

  const data = await rsp.json();
  const shotData = shotSchema.parse(data);
  return shotData;
}

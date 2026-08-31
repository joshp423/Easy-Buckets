import { API_URL } from "../../../../config/api";

export default async function updateSeasonNameAPIReq(
  seasonId: number,
  newSeasonName: string,
) {
  if (!seasonId || !newSeasonName) return;

  const rsp = await fetch(`${API_URL}/seasons/${seasonId}/update/name`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "PUT",
    body: JSON.stringify({
      seasonId,
      newSeasonName,
    }),
  });

  const data = rsp.json();
  return data;
}

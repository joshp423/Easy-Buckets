import { API_URL } from "../../../../config/api";

export default async function deleteSeasonAPIReq(seasonId: number) {
  const rsp = await fetch(`${API_URL}/seasons/${seasonId}/delete`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "DELETE",
  });

  const data = rsp.json();
  return data;
}

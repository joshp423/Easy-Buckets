import { API_URL } from "../../../config/api";

export default async function createTeamAPIReq(teamName: string) {
  const rsp = await fetch(`${API_URL}/teams/create`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "POST",
    body: JSON.stringify({
      name: teamName,
    }),
  });
  return rsp;
}

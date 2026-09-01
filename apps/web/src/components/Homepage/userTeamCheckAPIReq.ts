import { API_URL } from "../../config/api";

export default async function userTeamCheckAPIReq() {
  const rsp = await fetch(`${API_URL}/users/team`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "GET",
  });

  const data = await rsp.json();

  return data;
}

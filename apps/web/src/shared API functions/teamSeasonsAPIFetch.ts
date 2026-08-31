import { teamSchema } from "../types/team";
import { API_URL } from "../config/api";

type teamSeasonsAPIFetchProps = {
  orderBy: "asc" | "desc";
};

export async function teamSeasonsAPIFetch({
  orderBy,
}: teamSeasonsAPIFetchProps) {
  const rsp = await fetch(`${API_URL}/teams/seasons?orderBy=${orderBy}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "GET",
  });

  const data = await rsp.json();
  const team = teamSchema.parse(data);
  return team;
}

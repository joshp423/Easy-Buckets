import { teamSchema } from "../../../types/team";

type teamSeasonsAPIFetchProps = {
  orderBy: "asc" | "desc";
};

export async function teamSeasonsAPIFetch({
  orderBy,
}: teamSeasonsAPIFetchProps) {
  const rsp = await fetch(
    `http://localhost:3000/teams/seasons?orderBy=${orderBy}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "GET",
    },
  );

  const data = await rsp.json();
  const team = teamSchema.parse(data);
  return team;
}

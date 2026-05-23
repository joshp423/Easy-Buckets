
type gameStatsAPIFetchProps = {
  orderBy: "asc" | "desc";
};

export async function gameStatsAPIFetch({
  season: string
  
}: gameStatsAPIFetchProps) {
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


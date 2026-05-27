


type gameStatsAPIFetchProps = {
  seasonId: number
  opponent: string
  date: string
  gameStats: 
};

export async function gameStatsAPIFetch({
  userId
  
}: gameStatsAPIFetchProps) {
  const rsp = await fetch(
    "http://localhost:3000/games/create",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "PUT",
      body: JSON.stringify({

      })
    },
  );

  const data = await rsp.json();
  const team = teamSchema.parse(data);
  return team;
}


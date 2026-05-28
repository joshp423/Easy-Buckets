import { seasonSchema } from "../../../types/season";

type gameStatsAPIFetchProps = {
  id: number;
};

export async function gameStatsAPIFetch({ id }: gameStatsAPIFetchProps) {
  const rsp = await fetch(`http://localhost:3000/seasons/${id}/games`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "GET",
  });

  const data = await rsp.json();
  const season = seasonSchema.parse(data.seasonData);
  const games = season.games;
  return games;
}

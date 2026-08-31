import { seasonSchema } from "../types/season";
import { API_URL } from "../config/api";

type gameStatsAPIFetchProps = {
  id: number;
  draft: boolean;
};

export async function seasonGameAPIFetch({
  id,
  draft,
}: gameStatsAPIFetchProps) {
  const rsp = await fetch(`${API_URL}/seasons/${id}/games?drafts=${draft}`, {
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

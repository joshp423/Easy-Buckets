import { type SeasonOverview } from "../../../types/seasonOverview";
import { type SyntheticEvent } from "react";
import { seasonGameAPIFetch } from "../../../shared API functions/seasonGameAPIFetch";
import { type Game } from "../../../types/game";
import { useState, useEffect } from "react";
type SelectDraftGameProps = {
  teamSeasons: SeasonOverview[];
  selectedDashboardSeason: string;
  setGameDetailsId: React.Dispatch<React.SetStateAction<number | null>>;
};
export default function SelectDraftGame({
  selectedDashboardSeason,
  teamSeasons,
  setGameDetailsId,
}: SelectDraftGameProps) {
  const [seasonData, setSeasonData] = useState<Game[]>([]);
  const [gameId, setGameId] = useState<number | null>(null);

  useEffect(() => {
    const selectedSeason = teamSeasons.find(
      (season) => season.name === selectedDashboardSeason,
    );

    if (!selectedSeason) return;

    const getData = async () => {
      const data = await seasonGameAPIFetch({
        id: selectedSeason.id,
        draft: true,
      });

      setSeasonData(data);
    };

    getData();
  }, [selectedDashboardSeason, teamSeasons]);

  useEffect(() => {
    const load = async () => {
      setGameId(seasonData?.[0].id);
    };
    load();
  }, [seasonData]);
  function selectGame(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setGameDetailsId(gameId);
  }
  return (
    <div className="selectDraftGame">
      <form onSubmit={selectGame}>
        <select
          name="gameSelect"
          id="gameSelect"
          onChange={(e) => {
            setGameId(Number(e.target.value));
          }}
        >
          {seasonData.map(({ id, date, opponent }) => (
            <option key={id} value={id}>
              {String(date)} vs {opponent}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

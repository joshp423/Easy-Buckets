import { type SeasonOverview } from "../../../types/seasonOverview";
import { type SyntheticEvent } from "react";
import { seasonGameAPIFetch } from "../../../shared API functions/seasonGameAPIFetch";
import { type Game } from "../../../types/game";
import { useState, useEffect } from "react";
import "./selectDraftGame.css";
import type { newGameCheck } from "../gameScoring";
import LoadingBall from "../../../assets/LoadingBall/loadingball";

type SelectDraftGameProps = {
  teamSeasons: SeasonOverview[];
  selectedDashboardSeason: string;
  setGameDetails: React.Dispatch<React.SetStateAction<Game | null | "ready">>;
  setNewGameCheck: React.Dispatch<React.SetStateAction<newGameCheck>>;
};
export default function SelectDraftGame({
  selectedDashboardSeason,
  teamSeasons,
  setGameDetails,
  setNewGameCheck,
}: SelectDraftGameProps) {
  const [seasonData, setSeasonData] = useState<Game[]>([]);
  const [gameId, setGameId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const selectedSeason = teamSeasons.find(
      (season) => season.name === selectedDashboardSeason, //make more robust?
    );

    if (!selectedSeason) return;

    const getData = async () => {
      setLoading(true)
      const data = await seasonGameAPIFetch({
        id: selectedSeason.id,
        draft: true,
      });
      if (!data) return;
      setSeasonData(data);
      setLoading(false)
    };

    getData();
  }, [selectedDashboardSeason, teamSeasons]);

  useEffect(() => {
    const load = async () => {
      if (seasonData.length === 0) return;
      setGameId(seasonData?.[0].id);
    };
    load();
  }, [seasonData]);

  function selectGame(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const selectedGame = seasonData.find((season) => season.id === gameId);
    if (!selectedGame) return;
    setGameDetails(selectedGame);
  }

  if (seasonData.length === 0 && !loading) {
    return (
      <div className="selectDraftGame">
        <h1>No Draft Games</h1>
        <button
          type="button"
          onClick={() => {
            setNewGameCheck("none");
          }}
        >
          Back
        </button>
      </div>
    );
  }
  return (
    <div className="selectDraftGame">
      {loading ? <LoadingBall /> : <>
      <h1>Select Draft Game</h1>
      <form onSubmit={selectGame}>
        <select
          name="gameSelect"
          id="gameSelect"
          onChange={(e) => {
            setGameId(Number(e.target.value));
          }}
        >
          {seasonData.map(({ id, date, opponent }) => {
            const formatDate = new Date(date).toLocaleString().split(",", 1);
            return (
              <option key={id} value={id}>
                {formatDate} vs {opponent}
              </option>
            );
          })}
        </select>
        <button type="submit">Next</button>
      </form>
      </>}
    </div>
  );
}

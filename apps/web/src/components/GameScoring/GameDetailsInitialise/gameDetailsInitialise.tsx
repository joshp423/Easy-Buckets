import { useEffect } from "react";
import { type SeasonOverview } from "../../../types/seasonOverview";
import "./gameDetailsInitilialise.css";
import { type Game } from "../../../types/game";
import type { newGameCheck } from "../gameScoring";

type GameDetailsInitialiseProps = {
  setGameDetails: React.Dispatch<React.SetStateAction<Game | null | "ready">>;
  setSelectedSeasonId: React.Dispatch<React.SetStateAction<number | null>>;
  setOpponent: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setReplay: React.Dispatch<React.SetStateAction<string | null>>;
  teamSeasons: SeasonOverview[];
  selectedDashboardSeason: string;
  setNewGameCheck: React.Dispatch<React.SetStateAction<newGameCheck>>;
};

export default function GameDetailsInitialise({
  setGameDetails,
  setSelectedSeasonId,
  setOpponent,
  setDate,
  teamSeasons,
  setReplay,
  selectedDashboardSeason,
  setNewGameCheck,
}: GameDetailsInitialiseProps) {
  useEffect(() => {
    const selectedSeason = teamSeasons.find(
      (season) => season.name === selectedDashboardSeason,
    );

    if (!selectedSeason) return;
    const load = async () => {
      setSelectedSeasonId(selectedSeason?.id);
    };

    load();
  }, [selectedDashboardSeason, teamSeasons, setSelectedSeasonId]);

  return (
    <div className="gameDetailsInitialise">
      <h1>New Game</h1>
      <p>Completing this section will save the game as a draft</p>
      <form
        onSubmit={() => {
          setGameDetails("ready");
        }}
      >
        <label htmlFor="opponent">Opponent: </label>
        <input
          type="text"
          name="opponent"
          required
          onChange={(e) => {
            setOpponent(e.target.value);
          }}
        />
        <label htmlFor="date">Date: </label>
        <input
          type="date"
          name="date"
          required
          onChange={(e) => {
            setDate(String(e.target.value));
          }}
        />
        <label htmlFor="replay">Replay URL (Optional): </label>
        <input
          type="text"
          name="replay"
          placeholder="Youtube link"
          onChange={(e) => {
            setReplay(String(e.target.value));
          }}
        />
        <button type="submit">Next</button>
      </form>
      <button
        onClick={() => {
          setNewGameCheck("none");
        }}
      >
        Back
      </button>
    </div>
  );
}

import { useState, useEffect } from "react";
import { type SeasonOverview } from "../../../types/seasonOverview";
import { createGameDraftAPIRequest } from "./createGameAPIRequest";
import { useNavigate } from "react-router";
import "./gameDetailsInitilialise.css";

type GameDetailsInitialiseProps = {
  setGameDetailsId: React.Dispatch<React.SetStateAction<number | null>>;
  teamSeasons: SeasonOverview[];
  selectedDashboardSeason: string;
};

export default function GameDetailsInitialise({
  setGameDetailsId,
  teamSeasons,
  selectedDashboardSeason,
}: GameDetailsInitialiseProps) {
  const [selectedSeasonId, setSelectedSeasonId] = useState<number | null>(null);
  const [opponent, setOpponent] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [replay, setReplay] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const selectedSeason = teamSeasons.find(
      (season) => season.name === selectedDashboardSeason,
    );

    if (!selectedSeason) return;
    const load = async () => {
      setSelectedSeasonId(selectedSeason?.id);
    };

    load();
  }, [selectedDashboardSeason, teamSeasons]);

  return (
    <div className="gameDetailsInitialise">
      <h1>New Game</h1>
      <p>Completing this section will save the game as a draft</p>
      <form
        onSubmit={(e) =>
          createGameDraftAPIRequest({
            setGameDetailsId,
            e,
            seasonId: selectedSeasonId,
            opponent,
            date,
            replay,
            navigate,
          })
        }
      >
        <label htmlFor="opponent">Opponent </label>
        <input
          type="text"
          name="opponent"
          required
          onChange={(e) => {
            setOpponent(e.target.value);
          }}
        />
        <label htmlFor="date">Date </label>
        <input
          type="date"
          name="date"
          required
          onChange={(e) => {
            setDate(String(e.target.value));
          }}
        />
        <label htmlFor="replay">Replay URL (Optional) </label>
        <input
          type="text"
          name="replay"
          placeholder="Youtube link"
          required
          onChange={(e) => {
            setReplay(String(e.target.value));
          }}
        />
        <button type="submit">Next</button>
      </form>
    </div>
  );
}

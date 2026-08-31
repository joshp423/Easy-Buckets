import { useEffect, useState } from "react";
import SideNav from "../SideNav/sideNav";
import { teamPlayersAPIFetch } from "./teamPlayersAPIFetch";
import type { Player } from "../../types/player";
import SelectActivePlayers from "./SelectActivePlayers/selectActivePlayers";
import CreatePlayers from "./CreatePlayers/createPlayers";
import ScoringInterface from "./ScoringInterface/scoringInterface";
import GameInitialise from "./GameInitialise/gameInitialise";
import SelectDraftGame from "./SelectDraftGame/selectDraftGame";
import "./gameScoring.css";
import GameDetailsInitialise from "./GameDetailsInitialise/gameDetailsInitialise";
import { type SeasonOverview } from "../../types/seasonOverview";
import { teamSeasonsAPIFetch } from "../../shared API functions/teamSeasonsAPIFetch";
import { type Game } from "../../types/game";
import { GameInitialiseSkeleton } from "../skeletons";
import { useOutletContext } from "react-router-dom";
import LoggedOutHP from "../Homepage/loggedOutHP/loggedOutHP";
import NoSeasons from "../Homepage/Dashboard/noSeasons";
import { useNavigate } from "react-router-dom";

type gameScoringProps = {
  loginStatus: boolean;
};
export type newGameCheck = "none" | "new" | "existing";

export default function GameScoring() {
  const [playerList, setPlayerList] = useState<Player[]>([]);
  const [readyCheck, setReadyCheck] = useState<boolean>(false);
  const [addPlayer, setAddPlayer] = useState<boolean>(false);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [newGameCheck, setNewGameCheck] = useState<newGameCheck>("none");
  const [gameDetails, setGameDetails] = useState<Game | null | "ready">(null);
  const [teamSeasons, setTeamSeasons] = useState<SeasonOverview[]>([]);
  const [selectedDashboardSeason, setSelectedDashboardSeason] =
    useState<string>("");
  const [selectedSeasonId, setSelectedSeasonId] = useState<number | null>(null);
  const [opponent, setOpponent] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [replay, setReplay] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { loginStatus } = useOutletContext<gameScoringProps>();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const team = await teamSeasonsAPIFetch({ orderBy: "desc" });
        const seasons = team.seasons;

        if (seasons.length !== 0) {
          setTeamSeasons(seasons);
          setSelectedDashboardSeason(seasons[0].name);
        }
          
      } catch {
        setError("An unexpected error occured, please try again later");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const players = await teamPlayersAPIFetch();
      if (players.length) {
        setPlayerList(players);
      }
      setLoading(false);
    };

    load();
  }, []);

  useEffect(() => {
    if (error) {
      navigate("/error", { state: { error } });
    }
  }, [error, navigate]);


  if (!loginStatus) return <LoggedOutHP />;

  if (teamSeasons.length === 0 && !loading)
    return (
      <div className="gameScoring">
        <SideNav />
        <NoSeasons />
      </div>
    );

  switch (newGameCheck) {
    case "none":
      return (
        <div className="gameScoring">
          <SideNav />
          {loading ? (
            <GameInitialiseSkeleton />
          ) : (
            <GameInitialise
              setNewGameCheck={setNewGameCheck}
              teamSeasons={teamSeasons}
              setSelectedDashboardSeason={setSelectedDashboardSeason}
            />
          )}
        </div>
      );

    case "existing":
      if (!gameDetails) {
        return (
          <div className="gameScoring">
            <SideNav />
            <SelectDraftGame
              teamSeasons={teamSeasons}
              selectedDashboardSeason={selectedDashboardSeason}
              setGameDetails={setGameDetails}
              setNewGameCheck={setNewGameCheck}
            />
          </div>
        );
      }
      return (
        <div className="gameScoring">
          <SideNav />
          <ScoringInterface
            setGameDetails={setGameDetails}
            setSelectedPlayers={setSelectedPlayers}
            selectedPlayers={selectedPlayers}
            gameDetails={gameDetails}
          />
        </div>
      );

    case "new":
      if (!gameDetails) {
        return (
          <div className="gameScoring">
            <SideNav />
            <GameDetailsInitialise
              setGameDetails={setGameDetails}
              setSelectedSeasonId={setSelectedSeasonId}
              setOpponent={setOpponent}
              setDate={setDate}
              setReplay={setReplay}
              teamSeasons={teamSeasons}
              selectedDashboardSeason={selectedDashboardSeason}
              setNewGameCheck={setNewGameCheck}
            />
          </div>
        );
      }
      if (playerList && !readyCheck) {
        return (
          <div className="gameScoring">
            <SideNav />
            <SelectActivePlayers
              selectedPlayers={selectedPlayers}
              gameDetails={gameDetails}
              selectedSeasonId={selectedSeasonId}
              opponent={opponent}
              date={date}
              replay={replay}
              setGameDetails={setGameDetails}
              playerList={playerList}
              setReadyCheck={setReadyCheck}
              setAddPlayer={setAddPlayer}
              addPlayer={addPlayer}
              setSelectedPlayers={setSelectedPlayers}
            />
          </div>
        );
      }

      if (playerList && readyCheck) {
        //session for readyCheck?
        return (
          <div className="gameScoring">
            <SideNav />
            <ScoringInterface
              setGameDetails={setGameDetails}
              setSelectedPlayers={setSelectedPlayers}
              selectedPlayers={selectedPlayers}
              gameDetails={gameDetails}
            />
          </div>
        );
      }

      return (
        <div className="gameScoring">
          <SideNav />
          <CreatePlayers setAddPlayer={setAddPlayer} />
        </div>
      );
  }
}

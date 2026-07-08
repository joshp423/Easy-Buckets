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

export default function GameScoring() {
  const [playerList, setPlayerList] = useState<Player[]>([]);
  const [readyCheck, setReadyCheck] = useState<boolean>(false);
  const [addPlayer, setAddPlayer] = useState<boolean>(false);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [newGameCheck, setNewGameCheck] = useState<"none" | "new" | "existing">(
    "none",
  );
  const [gameDetails, setGameDetails] = useState<Game | null>(null);
  const [teamSeasons, setTeamSeasons] = useState<SeasonOverview[]>([]);
  const [selectedDashboardSeason, setSelectedDashboardSeason] =
    useState<string>("");

  useEffect(() => {
    //relocate
    const load = async () => {
      const team = await teamSeasonsAPIFetch({ orderBy: "desc" });
      const seasons = team.seasons;

      if (seasons.length) {
        setTeamSeasons(seasons);
      }
      const latestSeason = seasons[0].name;

      if (latestSeason) {
        setSelectedDashboardSeason(latestSeason);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const load = async () => {
      const players = await teamPlayersAPIFetch();
      if (players.length) {
        setPlayerList(players);
      }
    };

    load();
  }, []);

  switch (newGameCheck) {
    case "none":
      return (
        <div className="gameScoring">
          <SideNav />
          <GameInitialise
            setNewGameCheck={setNewGameCheck}
            teamSeasons={teamSeasons}
            setSelectedDashboardSeason={setSelectedDashboardSeason}
          />
        </div>
      );

    case "existing": //skip playerselect for draft games, should be pulled anyway. gameStatlines created on selectActivePlayers for the first time 
      if (gameDetails && !readyCheck) {
        return (
          <div className="gameScoring">
            <SideNav />
            <SelectActivePlayers
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
              selectedPlayers={selectedPlayers}
              gameDetails={gameDetails}
            />
          </div>
        );
      }

      return (
        <div className="gameScoring">
          <SideNav />
          <SelectDraftGame
            teamSeasons={teamSeasons}
            selectedDashboardSeason={selectedDashboardSeason}
            setGameDetails={setGameDetails}
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
              teamSeasons={teamSeasons}
              selectedDashboardSeason={selectedDashboardSeason}
            />
          </div>
        );
      }
      if (playerList && !readyCheck) {
        return (
          <div className="gameScoring">
            <SideNav />
            <SelectActivePlayers
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

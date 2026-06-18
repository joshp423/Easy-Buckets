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

export default function GameScoring() {
  const [playerList, setPlayerList] = useState<Player[]>([]);
  const [readyCheck, setReadyCheck] = useState<boolean>(false);
  const [addPlayer, setAddPlayer] = useState<boolean>(false);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [newGameCheck, setNewGameCheck] = useState<"none" | "new" | "existing">(
    "none",
  );
  const [gameDetailsId, setGameDetailsId] = useState<number | null>(null);
  const [teamSeasons, setTeamSeasons] = useState<SeasonOverview[]>([]);
  const [selectedDashboardSeason, setSelectedDashboardSeason] =
    useState<string>("");

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
          <GameInitialise setNewGameCheck={setNewGameCheck} teamSeasons={teamSeasons} setSelectedDashboardSeason={setSelectedDashboardSeason}/>
        </div>
      );

    case "existing":
      return <SelectDraftGame />;

    case "new":
      if (!gameDetailsId) {
        return (
          <div className="gameScoring">
            <SideNav />
            <GameDetailsInitialise
              setGameDetailsId={setGameDetailsId}
              teamSeasons={teamSeasons}
              setTeamSeasons={setTeamSeasons}
              selectedDashboardSeason={selectedDashboardSeason}
              setSelectedDashboardSeason={setSelectedDashboardSeason}
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
            <ScoringInterface selectedPlayers={selectedPlayers} />
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

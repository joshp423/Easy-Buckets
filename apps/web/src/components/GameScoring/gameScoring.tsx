import { useEffect, useState } from "react";
import SideNav from "../SideNav/sideNav";
import { teamPlayersAPIFetch } from "./teamPlayersAPIFetch";
import type { Player } from "../../types/player";
import SelectActivePlayers from "./SelectActivePlayers/selectActivePlayers";
import CreatePlayers from "./CreatePlayers/createPlayers";
import ScoringInterface from "./ScoringInterface/scoringInterface";
import "./gameScoring.css";

export default function GameScoring() {
  const [playerList, setPlayerList] = useState<Player[]>([]);
  const [readyCheck, setReadyCheck] = useState<boolean>(false);
  const [addPlayer, setAddPlayer] = useState<boolean>(false);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [newGameCheck, setNewGameCheck] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      const players = await teamPlayersAPIFetch();
      if (players.length) {
        setPlayerList(players);
      }
    };

    load();
  }, []);

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

import SideNav from "../SideNav/sideNav"
import { useState, useEffect } from "react";
import { type Player } from "../../types/player";
import { teamPlayersAPIFetch } from "../GameScoring/teamPlayersAPIFetch";
import { PlayerListEdit } from "./PlayerListEdit/playerListEdit";

export function TeamSeasons() {

    //active players + edit, season list into game list + edit, team name edit
    const [playerList, setPlayerList] = useState<Player[]>([]);
    const [addPlayer, setAddPlayer] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

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
      
    return(
        <div className="teamSeasons">
            <SideNav />
            <PlayerListEdit playerList={playerList} setAddPlayer={setAddPlayer} addPlayer={addPlayer}/>
        </div>
    )
}
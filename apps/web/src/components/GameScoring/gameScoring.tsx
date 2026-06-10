import { useEffect, useState } from "react"
import SideNav from "../SideNav/sideNav"
import { teamPlayersAPIFetch } from "./teamPlayersAPIFetch"
import type { Player } from "../../types/player"
import SelectActivePlayers from "./SelectActivePlayers/selectActivePlayers"
import CreatePlayers from "./CreatePlayers/createPlayers"
import "./gameScoring.css"

export default function GameScoring() {

    const [playerList, setPlayerList] = useState<Player[]>([])
    

    useEffect(() => {
        const load = async () => {
            const players = await teamPlayersAPIFetch()
            if (players.length) {
                setPlayerList(players)
            }
        }
        
        load()
    },[])

    if (playerList) {
        return(
            <div className="gameScoring">
                <SideNav />
                <SelectActivePlayers playerList={playerList}/>
            </div>
        )
    }

    return(
        <div className="gameScoring">
                <SideNav />
                <CreatePlayers />
            </div>
    )
    
}
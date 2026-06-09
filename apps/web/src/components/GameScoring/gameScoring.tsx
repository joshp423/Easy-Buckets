import SideNav from "../SideNav/sideNav"
import { teamPlayersAPIFetch } from "./teamPlayersAPIFetch"

export default function GameScoring() {
    
    const players = await teamPlayersAPIFetch()
    return(
        <div className="gameScoring">
            <SideNav />

        </div>
    )
}
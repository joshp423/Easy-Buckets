import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { seasonGameAPIFetch } from "../../../../../shared API functions/seasonGameAPIFetch";
import type { Game } from "../../../../../types/game";
import updateSeasonNameAPIReq from "./updateSeasonNameAPIReq";
import { useNavigate } from "react-router";

export default function EditSeason() {
    const { selectedDashboardSeason } = useParams();
    const [seasonGames, setSeasonGames] = useState<Game[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const location = useLocation();
    const seasonId = location.state as number;
    const [seasonName, setSeasonName] = useState<string>("");
    const navigate = useNavigate();
    const [editedGame, setEditedGame] = useState<Game | null>(null)

    useEffect(() => {
        async function getSeasonData() {
            setLoading(true);
            const data = await seasonGameAPIFetch({
                id: seasonId,
                draft: false,
            });
            setSeasonGames(data);
            if (selectedDashboardSeason) setSeasonName(selectedDashboardSeason)
            setLoading(false);
        }
        getSeasonData();
    }, [seasonId, selectedDashboardSeason])

    async function uploadNameChange() {
        setLoading(true);
        const updatedName = await updateSeasonNameAPIReq(seasonId, seasonName);
        if (updatedName){
            navigate(
                `/team-seasons/${updatedName}`, {
                    state: { seasonId }
                }
            )
        }
        setLoading(false);
    }
    //skelly required
    if (editedGame) {
        return(
            <div className="editGame">
                
            </div>
        )
    }
    return(
        <div className="editSeason">
            <div className="seasonNameEdit">
                <form action="" onSubmit={() => {uploadNameChange()}}>
                    <label htmlFor="seasonName">Season Name</label>
                    <input type="text" defaultValue={selectedDashboardSeason} onChange={(e) => {setSeasonName(e.target.value)}}/>
                    <button type="submit">Confirm Changes</button>
                </form>
            </div>
            <div className="seasonGameEditList">
                <ul>
                    {seasonGames.map((game) => {
                        const formatDate = new Date(game.date).toLocaleString();
                        return(
                            <li>
                                <h3>{formatDate} vs: {game.opponent}</h3>
                                <button onClick={() => {setEditedGame(game)}}>Edit Game</button>
                            </li>
                        );
                    })};
                </ul>
            </div>

        </div>
    )
}
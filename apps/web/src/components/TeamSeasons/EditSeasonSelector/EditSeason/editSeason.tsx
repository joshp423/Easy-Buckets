import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { seasonGameAPIFetch } from "../../../../shared API functions/seasonGameAPIFetch";
import type { Game } from "../../../../types/game";
import updateSeasonNameAPIReq from "./updateSeasonNameAPIReq";
import { useNavigate } from "react-router";
import DeleteCheck from "../DeleteCheck/deleteCheck";
import SideNav from "../../../SideNav/sideNav";

export default function EditSeason() {
    const { selectedDashboardSeason } = useParams();
    const [seasonGames, setSeasonGames] = useState<Game[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const location = useLocation();
    const seasonId = location.state.seasonId;
    const [seasonName, setSeasonName] = useState<string>("");
    const navigate = useNavigate();
    const [deleteCheck, setDeleteCheck] = useState<boolean>(false);
    const [deletedObj, setDeletedObj] = useState<"game" | "season" | null>(null);
    const [deletedObjId, setDeletedObjId] = useState<number | null>(null)

    console.log(seasonId)

    useEffect(() => {
        async function getSeasonData() {
            if (deleteCheck) return;
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
    }, [seasonId, selectedDashboardSeason, deleteCheck])

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
    if (deleteCheck) {
        return(
            <div className="seasonEditor">
                <SideNav />
                <DeleteCheck deletedObj={deletedObj} deletedObjId={deletedObjId} setDeleteCheck={setDeleteCheck}/>
            </div>
        )
    }
    return(
        <div className="seasonEditor">
            <SideNav />
            <div className="seasonNameEdit">
                <form action="" onSubmit={() => {uploadNameChange()}}>
                    <label htmlFor="seasonName">Season Name</label>
                    <input type="text" defaultValue={selectedDashboardSeason} onChange={(e) => {setSeasonName(e.target.value)}}/>
                    <button type="submit">Confirm Changes</button>
                    <button onClick={() => {
                        setDeleteCheck(true);
                        setDeletedObj("season");
                        setDeletedObjId(seasonId);
                    }}>Delete Season</button>
                </form>
            </div>
            <div className="seasonGameEditList">
                <ul>
                    {seasonGames.map((game) => {
                        const formatDate = new Date(game.date).toLocaleString();
                        return(
                            <li>
                                <h3>{formatDate} vs: {game.opponent}</h3>
                                <button onClick={() => {
                                    setDeleteCheck(true);
                                    setDeletedObj("game");
                                    setDeletedObjId(game.id);
                                }}>Delete Game</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <DeleteCheck deletedObj={deletedObj} deletedObjId={deletedObjId} setDeleteCheck={setDeleteCheck}/>
        </div>
    )
}
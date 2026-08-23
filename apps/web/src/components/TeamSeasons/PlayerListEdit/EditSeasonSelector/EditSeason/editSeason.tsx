import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { seasonGameAPIFetch } from "../../../../../shared API functions/seasonGameAPIFetch";
import type { Game } from "../../../../../types/game";

export default function EditSeason() {
    const { selectedDashboardSeason } = useParams();
    const [seasonGames, setSeasonGames] = useState<Game[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const location = useLocation();
    const seasonId = location.state as number;

    useEffect(() => {
        async function getSeasonData() {
            setLoading(true);
            const data = await seasonGameAPIFetch({
                id: seasonId,
                draft: false,
            });
            setSeasonGames(data);
            setLoading(false);
        }
        getSeasonData();
    })

    function uploadNameChange() {
        
    }

    return(
        <div className="editSeason">
            <div>
                <form action="" onSubmit={() => {}}>
                    <label htmlFor="seasonName">Season Name</label>
                    <input type="text" defaultValue={selectedDashboardSeason}/>
                    <button type="submit">Confirm Changes</button>
                </form>
            </div>
        </div>
    )
}
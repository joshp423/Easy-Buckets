import { type Season } from "../../../types/season";

type teamSeasonsAPIFetchProps = {
    amount: number,
    sort: "asc" | "desc",
    setTeamSeasons: React.Dispatch<React.SetStateAction<Season[] | "No Seasons">>
}

export async function teamSeasonsAPIFetch({amount, sort, setTeamSeasons}: teamSeasonsAPIFetchProps) {

    const rsp = await fetch(`http://localhost:3000/team/seasons?amount=${amount}&sort=${sort}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "GET",
        });
        if (rsp.status === 200) {
            const data = await rsp.json();
            setTeamSeasons(data.seasons)
        }
    }
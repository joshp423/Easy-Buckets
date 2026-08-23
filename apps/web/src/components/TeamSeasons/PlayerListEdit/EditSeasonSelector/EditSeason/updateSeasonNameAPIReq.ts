export default async function updateSeasonNameAPIReq(seasonId: number, newSeasonName: string) {

    if (!seasonId || !newSeasonName) return;

    const rsp = await fetch(`http://localhost:3000/seasons/${seasonId}/update/name`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "PUT",
        body: JSON.stringify({
            seasonId
        }),
    })

    const data = rsp.json();
    return data;
}
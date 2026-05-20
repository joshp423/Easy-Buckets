type teamSeasonAPIFetchProps = {
    amount: number,
    sort: "asc" | "desc",
    set
}

export async function teamSeasonAPIFetch(amount: number, sort: "asc" | "desc") {

    const rsp = await fetch(`http://localhost:3000/team/seasons?amount=${amount}&sort=${sort}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "GET",
        });
        if (rsp.status === 200) {
            const data = await rsp.json();
            
        }
    }
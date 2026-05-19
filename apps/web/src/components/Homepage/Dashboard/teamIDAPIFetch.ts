
export async function teamIDAPIFetch() {

    const rsp = await fetch("http://localhost:3000/team/", {
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
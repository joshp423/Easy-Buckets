
type seasonAPIFetchProps = {
    email:string
}

export async function seasonAPIFetch({email, setSeasonData}:seasonAPIFetchProps) {
    
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
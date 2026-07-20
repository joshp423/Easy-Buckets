
export default function getShotsAPIReq(gameId: number){
    const rsp = await fetch(`http://localhost:3000/games/${gameId}/shots`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "GET",
  });

  const data = await rsp.json();
  const shotLog = 
}
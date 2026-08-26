export default async function deletePlayerDetailsAPIReq(playerId: number) {
  const rsp = await fetch(`http://localhost:3000/teams/players/delete`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "DELETE",
    body: JSON.stringify({
      playerId,
    }),
  });

  const data = await rsp.json();

  return data;
}

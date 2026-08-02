export async function publishGameAPIReq(gameId: number) {
  const rsp = await fetch(`http://localhost:3000/games/${gameId}/publish`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "PUT",
  });

  const data = await rsp.json();

  return data;
}

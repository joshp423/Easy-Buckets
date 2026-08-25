export default async function deleteGameAPIReq(gameId: number) {
  const rsp = await fetch(`http://localhost:3000/games/${gameId}/delete`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "DELETE",
  });

  const data = rsp.json();
  return data;
}

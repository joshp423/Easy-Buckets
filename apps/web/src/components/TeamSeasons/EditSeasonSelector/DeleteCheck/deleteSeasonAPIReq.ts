export default async function deleteSeasonAPIReq(seasonId: number) {
  const rsp = await fetch(`http://localhost:3000/seasons/${seasonId}/delete`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "DELETE",
  });

  const data = rsp.json();
  return data;
}

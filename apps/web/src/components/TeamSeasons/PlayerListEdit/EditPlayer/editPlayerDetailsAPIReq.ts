import type { Player } from "../../../../types/player";

type editPlayerDetailsAPIReqArgs = {
  player: Player;
};

export async function editPlayerDetailsAPIReq({
  player,
}: editPlayerDetailsAPIReqArgs) {
  const rsp = await fetch(`http://localhost:3000/teams/players/edit`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "PUT",
    body: JSON.stringify({
      player,
    }),
  });

  const data = await rsp.json();

  return data;
}

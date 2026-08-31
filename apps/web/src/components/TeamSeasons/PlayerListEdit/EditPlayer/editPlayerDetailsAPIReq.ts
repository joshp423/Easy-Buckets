import type { Player } from "../../../../types/player";
import { API_URL } from "../../../../config/api";

type editPlayerDetailsAPIReqArgs = {
  player: Player;
};

export async function editPlayerDetailsAPIReq({
  player,
}: editPlayerDetailsAPIReqArgs) {
  const rsp = await fetch(`${API_URL}/teams/players/edit`, {
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

import { API_URL } from "../config/api";

type updateGameStatAPIProps = {
  gameStatlineId: number;
  statlineUpdateField: string;
  statlineUpdateIndicator: boolean;
};

export async function updateGameStatAPIReq({
  gameStatlineId,
  statlineUpdateField,
  statlineUpdateIndicator,
}: updateGameStatAPIProps) {
  const rsp = await fetch(`${API_URL}/games/gameStatlines/update`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "PUT",
    body: JSON.stringify({
      gameStatlineId,
      statlineUpdateField,
      statlineUpdateIndicator,
    }),
  });

  const data = await rsp.json();
  return data;
}

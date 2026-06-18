import { type SyntheticEvent } from "react";
import { type NavigateFunction } from "react-router-dom";

type createGameDraftAPIRequestProps = {
  setGameDetailsId: React.Dispatch<React.SetStateAction<number | null>>;
  e: SyntheticEvent<HTMLFormElement>;
  seasonId: number | null;
  opponent: string;
  date: string;
  replay: string | null;
  navigate: NavigateFunction;
};

export async function createGameDraftAPIRequest({
  setGameDetailsId,
  e,
  seasonId,
  opponent,
  date,
  replay,
  navigate,
}: createGameDraftAPIRequestProps) {
  e.preventDefault();
  console.log(seasonId, opponent, date, replay);

  const rsp = await fetch("http://localhost:3000/games/create", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "POST",
    body: JSON.stringify({
      seasonId,
      opponent,
      date,
    }),
  });

  if (rsp.status !== 201) {
    // const data = await rsp.json();
    navigate("/error");
    return;
  }

  const data = await rsp.json();
  const gameId = data.id;
  setGameDetailsId(gameId);

  if (replay) {
    const replayRsp = await fetch("http://localhost:3000/games/add-replay", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "PUT",
      body: JSON.stringify({
        gameId,
        replay,
      }),
    });
    if (replayRsp.status !== 201) {
      // const data = await rsp.json();
      navigate("/error");
      return;
    }
  }
  return;
}

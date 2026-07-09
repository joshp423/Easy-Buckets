import { type SyntheticEvent } from "react";
import { type NavigateFunction } from "react-router-dom";
import { type Game } from "../../types/game";

type createGameDraftAPIRequestProps = {
  setGameDetails: React.Dispatch<React.SetStateAction<Game | null>>;
  e: SyntheticEvent<HTMLFormElement>;
  selectedPlayers: 
  seasonId: number | null;
  opponent: string;
  date: string;
  replay: string | null;
  navigate: NavigateFunction;
};

export async function createGameDraftAPIRequest({
  setGameDetails,
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
  const gameData = data;
  setGameDetails(gameData);

  if (replay) {
    const replayRsp = await fetch("http://localhost:3000/games/add-replay", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "PUT",
      body: JSON.stringify({
        gameId: gameData.id,
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

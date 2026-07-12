import { type SyntheticEvent } from "react";
import { type NavigateFunction } from "react-router-dom";
import { type Player } from "../../types/player";

type createGameAndPlayerAPIRequestProps = {
  e: SyntheticEvent<HTMLFormElement>;
  seasonId: number | null;
  opponent: string;
  date: string;
  replay: string | null;
  navigate: NavigateFunction;
  playerList: Player[];
};

export async function createGameAndPlayerAPIRequest({
  e,
  seasonId,
  opponent,
  date,
  replay,
  navigate,
  playerList,
}: createGameAndPlayerAPIRequestProps) {
  e.preventDefault();
  

  const gameCreateRsp = await fetch("http://localhost:3000/games/create", {
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

  if (gameCreateRsp.status !== 201) {
    // const data = await rsp.json();
    navigate("/error");
    return;
  }

  const data = await gameCreateRsp.json();
  const gameData = data;
  

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

  const gameStatCreateRsp = await fetch("http://localhost:3000/games/gameStatlines/create", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    method: "POST",
    body: JSON.stringify({
      gameId: gameData.id,
      playerList
    }),
  });
   if (gameStatCreateRsp.status !== 201) {
    // const data = await rsp.json();
    navigate("/error");
    return;
  }

  const gameDataRsp = await fetch(`http://localhost:3000/games/${gameData.id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    method: "GET",
  })

  if (gameDataRsp.status !== 200) {
      // const data = await rsp.json();
    navigate("/error");
    return;
  }
    
  const updatedGameData = await gameDataRsp.json();
  const gD = updatedGameData;
  return gD;
}

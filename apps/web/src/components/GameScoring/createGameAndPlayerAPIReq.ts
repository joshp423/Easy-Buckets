import { type SyntheticEvent } from "react";
import { type NavigateFunction } from "react-router-dom";
import { type Game } from "../../types/game";
import { type Player } from "../../types/player";

type createGameAndPlayerAPIRequestProps = {
  setGameDetails: React.Dispatch<React.SetStateAction<Game | null | "ready">>;
  e: SyntheticEvent<HTMLFormElement>;
  seasonId: number | null;
  opponent: string;
  date: string;
  replay: string | null;
  navigate: NavigateFunction;
  playerList: Player[];
  gameId: number;
};

export async function createGameAndPlayerAPIRequest({
  setGameDetails,
  e,
  seasonId,
  opponent,
  date,
  replay,
  navigate,
  playerList,
  gameId
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

  const gameStatCreateRsp = await fetch("http://localhost:3000/games/gameStatlines/create", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    method: "POST",
    body: JSON.stringify({
      gameId,
      playerList
    }),
  });
   if (gameStatCreateRsp.status !== 201) {
    // const data = await rsp.json();
    navigate("/error");
    return;
  }
}

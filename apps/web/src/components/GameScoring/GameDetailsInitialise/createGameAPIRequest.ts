import { type SyntheticEvent } from "react";

type createGameDraftAPIRequestProps = {
  e: SyntheticEvent<HTMLFormElement>;
  seasonId: number | null;
  opponent: string;
  date: string;
};

export async function createGameDraftAPIRequest({
  e,
  seasonId,
  opponent,
  date,
}: createGameDraftAPIRequestProps) {
  e.preventDefault();

  const rsp = await fetch("http://localhost:3000/games/create", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "PUT",
    body: JSON.stringify({
      seasonId,
      opponent,
      date,
    }),
  });

  if (rsp.status !== 201) {
    const data = await rsp.json();
    switch (rsp.status) {
      case 400:
        setErrors(data.errors || []);
        setLoading(false);
        break;

      case 403:
        setErrors(["Email already exists"]);
        setLoading(false);
        break;
    }
    return;
  }

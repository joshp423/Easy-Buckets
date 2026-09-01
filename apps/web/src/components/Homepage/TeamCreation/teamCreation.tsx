import { useState } from "react";
import type { SyntheticEvent } from "react";
import createTeamAPIReq from "./createTeamAPIReq";
import { useNavigate } from "react-router";
import LoadingBall from "../../../assets/LoadingBall/loadingball";
import "./teamCreation.css";

type teamCreationProps = {
  setTeamCheck: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TeamCreation({ setTeamCheck }: teamCreationProps) {
  const [teamName, setTeamName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function createTeam(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const rsp = await createTeamAPIReq(teamName);
      if (rsp) setTeamCheck(true);
    } catch {
      navigate("/error", {
        state: {
          error: "An unexpected error occured, please try again later",
        },
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="teamCreation">
      <div>
        <h1>No Team Present, Create Below</h1>
        <form onSubmit={createTeam}>
          <label htmlFor="teamName">Team Name: </label>
          <input
            type="text"
            id="teamName"
            onChange={(e) => {
              setTeamName(e.target.value);
            }}
          />
          <button type="submit">
            {loading ? <LoadingBall /> : "Create Team"}
          </button>
        </form>
      </div>
    </div>
  );
}

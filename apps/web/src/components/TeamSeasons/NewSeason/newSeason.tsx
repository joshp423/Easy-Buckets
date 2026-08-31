import { useState } from "react";
import { useNavigate } from "react-router";
import type { SyntheticEvent } from "react";
import "./newSeason.css";
import LoadingBall from "../../../assets/LoadingBall/loadingball";
import { API_URL } from "../../../config/api";

export default function NewSeason() {
  const [seasonName, setSeasonName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function createSeasonAPIReq(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const rsp = await fetch(`${API_URL}/seasons/create`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      body: JSON.stringify({
        seasonName,
      }),
    });
    const data = await rsp.json();
    if (data.status !== 201) {
      if (data.status === 400) {
        setError("Enter valid season name");
        navigate("/error", {
          state: {
            error,
          },
        });
        return;
      }
      navigate("/error", {
        state: {
          error: "An unexpected error occured, please try again later",
        },
      });
    }
    navigate("/score-game");
    setLoading(false);
  }

  return (
    <div className="newSeason">
      <div className="errorHandling">
        <p>{error}</p>
      </div>
      <form
        onSubmit={(e) => {
          createSeasonAPIReq(e);
        }}
      >
        <label htmlFor="seasonName">New Season Name: </label>
        <input
          type="text"
          id="seasonName"
          required
          onChange={(e) => {
            setSeasonName(e.target.value);
          }}
        />
        <button type="submit">{loading ? <LoadingBall /> : "Submit"} </button>
      </form>
    </div>
  );
}

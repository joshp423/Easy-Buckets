import { useState } from "react";
import { useNavigate } from "react-router";
import type { SyntheticEvent } from "react";
import "./newSeason.css";

export default function NewSeason() {
  const [seasonName, setSeasonName] = useState<string>("");
  const navigate = useNavigate();
  async function createSeasonAPIReq(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const newSeason = await fetch("http://localhost:3000/seasons/create", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      body: JSON.stringify({
        seasonName,
      }),
    });

    if (newSeason) {
      navigate("/team-seasons");
    }
  }

  return (
    <div className="newSeason">
      <form
        onSubmit={(e) => {
          createSeasonAPIReq(e);
        }}
      >
        <label htmlFor="seasonName">New Season Name: </label>
        <input
          type="text"
          id="seasonName"
          onChange={(e) => {
            setSeasonName(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

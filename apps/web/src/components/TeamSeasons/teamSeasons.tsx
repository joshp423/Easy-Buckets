import SideNav from "../SideNav/sideNav";
import { useState, useEffect } from "react";
import { type Player } from "../../types/player";
import { teamPlayersAPIFetch } from "../GameScoring/teamPlayersAPIFetch";
import PlayerListEdit from "./PlayerListEdit/playerListEdit";
import { type SeasonOverview } from "../../types/seasonOverview";
import { teamSeasonsAPIFetch } from "../../shared API functions/teamSeasonsAPIFetch";
import EditSeasonSelector from "./EditSeasonSelector/editSeasonSelector";
import "./teamSeasons.css";
import NewSeason from "./NewSeason/newSeason";
import { TeamSeasonsSkeleton } from "../skeletons";
import { useOutletContext } from "react-router-dom";
import LoggedOutHP from "../Homepage/loggedOutHP/loggedOutHP";
import { useNavigate } from "react-router-dom";

type teamSeasonsProps = {
  loginStatus: boolean;
};

export default function TeamSeasons() {
  //active players + edit, season list into game list + edit, team name edit
  const [playerList, setPlayerList] = useState<Player[]>([]);
  const [addPlayer, setAddPlayer] = useState<boolean>(false);
  const [editPlayer, setEditPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [teamSeasons, setTeamSeasons] = useState<SeasonOverview[]>([]);
  const [selectedDashboardSeason, setSelectedDashboardSeason] =
    useState<string>("");
  const [editTeamPlayersToggle, setEditTeamPlayersToggle] =
    useState<boolean>(false);
  const [editSeasonToggle, seteditSeasonToggle] = useState<boolean>(false);
  const [addSeasonToggle, setAddSeasonToggle] = useState<boolean>(true);
  const { loginStatus } = useOutletContext<teamSeasonsProps>();
  const [editedSeason, setEditedSeason] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (editPlayer !== null) return; //only reload when loading complete

    const load = async () => {
      setLoading(true);
      try {
        const players = await teamPlayersAPIFetch();
        if (players.length) {
          setPlayerList(players);
        }
      } catch {
        setError("An unexpected error occured, please try again later");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [editPlayer]);

  useEffect(() => {
    if (editedSeason !== null) return;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const team = await teamSeasonsAPIFetch({ orderBy: "desc" });
        const seasons = team.seasons;

        if (seasons.length !== 0) {
          setTeamSeasons(seasons);
          setSelectedDashboardSeason(seasons[0].name);
        }
      } catch {
        setError("An unexpected error occured, please try again later");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [editedSeason]);

  useEffect(() => {
    if (error) {
      navigate("/error", { state: { error } });
    }
  }, [error, navigate]);

  if (!loginStatus) {
    return <LoggedOutHP />;
  }

  if (loading) {
    return (
      <div className="teamSeasons">
        <SideNav />
        <TeamSeasonsSkeleton />
      </div>
    );
  }

  return (
    <div className="teamSeasons">
      <SideNav />
      <div className="editSectionContainer">
        <div className="editNav">
          <button
            onClick={() => {
              if (editTeamPlayersToggle) {
                setEditTeamPlayersToggle(false);
                return;
              }
              setEditTeamPlayersToggle(true);
              setAddSeasonToggle(false);
              seteditSeasonToggle(false);
            }}
            style={
              editTeamPlayersToggle
                ? {
                    outline: "1px solid black",
                    borderRadius: "12px",
                    backgroundColor: "#e37204",
                    color: "white",
                  }
                : {}
            }
          >
            Edit Team Players
          </button>
          <button
            onClick={() => {
              if (editSeasonToggle) {
                seteditSeasonToggle(false);
                return;
              }
              seteditSeasonToggle(true);
              setEditTeamPlayersToggle(false);
              setAddSeasonToggle(false);
            }}
            style={
              editSeasonToggle
                ? {
                    outline: "1px solid black",
                    borderRadius: "12px",
                    backgroundColor: "#e37204",
                    color: "white",
                  }
                : {}
            }
          >
            Edit Seasons
          </button>
          <button
            onClick={() => {
              if (addSeasonToggle) {
                setAddSeasonToggle(false);
                return;
              }
              setAddSeasonToggle(true);
              setEditTeamPlayersToggle(false);
              seteditSeasonToggle(false);
            }}
            style={
              addSeasonToggle
                ? {
                    outline: "1px solid black",
                    borderRadius: "12px",
                    backgroundColor: "#e37204",
                    color: "white",
                  }
                : {}
            }
          >
            Add New Season
          </button>
        </div>
        <div className="editSection">
          <PlayerListEdit
            editPlayer={editPlayer}
            setEditPlayer={setEditPlayer}
            playerList={playerList}
            setAddPlayer={setAddPlayer}
            addPlayer={addPlayer}
            editTeamPlayersToggle={editTeamPlayersToggle}
          />
          <EditSeasonSelector
            teamSeasons={teamSeasons}
            setSelectedDashboardSeason={setSelectedDashboardSeason}
            selectedDashboardSeason={selectedDashboardSeason}
            editSeasonToggle={editSeasonToggle}
            editedSeason={editedSeason}
            setEditedSeason={setEditedSeason}
          />
          <div
            style={addSeasonToggle ? { display: "flex" } : { display: "none" }}
          >
            <NewSeason />
          </div>
        </div>
      </div>
    </div>
  );
}

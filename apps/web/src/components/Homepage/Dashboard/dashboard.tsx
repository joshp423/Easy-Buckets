import SideNav from "../../SideNav/sideNav";
import { useState, useEffect } from "react";
import { type DashboardView } from "../../../types/dashboardView";
import Nav from "./Nav/nav";
import { type SeasonOverview } from "../../../types/seasonOverview";
import { teamSeasonsAPIFetch } from "../../../shared API functions/teamSeasonsAPIFetch";
import SeasonStatsDisplay from "./SeasonStatsDisplay/seasonStatsDisplay";
import { seasonGameAPIFetch } from "../../../shared API functions/seasonGameAPIFetch";
import type { Game } from "../../../types/game";
import GameDisplay from "./GameDisplay/gameDisplay";
import "./dashboard.css";
import { DashboardSkeleton } from "../../skeletons";
import NoSeasons from "./noSeasons";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const [teamSeasons, setTeamSeasons] = useState<SeasonOverview[]>([]);
  const [seasonData, setSeasonData] = useState<Game[]>([]);
  const [dashboardView, setdashboardView] = useState<DashboardView>("Game");
  const [selectedDashboardSeason, setSelectedDashboardSeason] =
    useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  

  useEffect(() => {
    const selectedSeason = teamSeasons.find(
      (season) => season.name === selectedDashboardSeason,
    );

    if (!selectedSeason) return;

    const getData = async () => {
      setLoading(true);
      setError(null)
      try {
        const data = await seasonGameAPIFetch({
          id: selectedSeason.id,
          draft: false,
        });
        setSeasonData(data);
        setLoading(false);
      } catch {
        setError("An unexpected error occured, please try again later");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [selectedDashboardSeason, teamSeasons]);

  useEffect(() => {
    if (error) {
      navigate("/error", { state: { error } });
    }
  }, [error, navigate]);

  if (!teamSeasons.length && !loading) {
    // if no data
    return (
      <div className="dashboard">
        <SideNav />
        <NoSeasons />
      </div>
    );
  }

  if (dashboardView === "Season") {
    return (
      <div className="dashboard">
        <SideNav />
        <div className="dashboardMain">
          <Nav
            dashboardView={dashboardView}
            setdashboardView={setdashboardView}
            setSelectedDashboardSeason={setSelectedDashboardSeason}
            teamSeasons={teamSeasons}
          />
          <SeasonStatsDisplay seasonData={seasonData} />
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <SideNav />
      <div className="dashboardMain">
        <Nav
          dashboardView={dashboardView}
          setdashboardView={setdashboardView}
          setSelectedDashboardSeason={setSelectedDashboardSeason}
          teamSeasons={teamSeasons}
        />
        {loading ? (
          <DashboardSkeleton />
        ) : (
          <GameDisplay seasonData={seasonData} />
        )}
      </div>
    </div>
  );
}

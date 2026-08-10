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

export default function Dashboard() {
  const [teamSeasons, setTeamSeasons] = useState<SeasonOverview[]>([]);
  const [seasonData, setSeasonData] = useState<Game[]>([]);
  const [dashboardView, setdashboardView] = useState<DashboardView>("Game");
  const [selectedDashboardSeason, setSelectedDashboardSeason] =
    useState<string>("");
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const team = await teamSeasonsAPIFetch({ orderBy: "desc" });
      const seasons = team.seasons;

      if (seasons.length) {
        setTeamSeasons(seasons);
      }

      const latestSeason = seasons[0].name;

      if (latestSeason) {
        setSelectedDashboardSeason(latestSeason);
      }
      setLoading(false);
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
      const data = await seasonGameAPIFetch({
        id: selectedSeason.id,
        draft: false,
      });
      setSeasonData(data);
      setLoading(false);
    };

    getData();
  }, [selectedDashboardSeason, teamSeasons]);
  // add fallback component

  if (!teamSeasons.length) { // if no data
    return (
      <div className="dashboard">
        <SideNav />
        <div className="dashboardMain"></div>
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
          <SeasonStatsDisplay />
        </div>
      </div>
    );
  }

  if (loading) {
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
          <DashboardSkeleton />
        </div>
      </div>
    )
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
        <GameDisplay seasonData={seasonData} />
      </div>
    </div>
  );
}

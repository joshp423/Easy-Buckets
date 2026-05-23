import SideNav from "./SideNav/sideNav";
import { useState } from "react";
import { type DashboardView } from "../../../types/dashboardView";
import Nav from "./Nav/nav";
import { type SeasonOverview } from "../../../types/seasonOverview";
import { useEffect } from "react";
import { teamSeasonsAPIFetch } from "./teamSeasonsAPIFetch";
import GameStatsDisplay from "./GameDisplay/gameDisplay";
import SeasonStatsDisplay from "./SeasonStatsDisplay/seasonStatsDisplay";

export default function Dashboard() {
  const [teamSeasons, setTeamSeasons] = useState<SeasonOverview[]>([]);
  const [seasonData, setSeasonData] = useState<SeasonOverview | null>(null);
  const [dashboardView, setdashboardView] = useState<DashboardView>("Game");
  const [selectedDashboardSeason, setSelectedDashboardSeason] =
    useState<string>("");

  useEffect(() => {
    const load = async () => {
      const team = await teamSeasonsAPIFetch({ orderBy: "desc" });
      const seasons = team.seasons;

      if (seasons.length) {
        setTeamSeasons(seasons);
      }

      const latestSeason = seasons[0].name;

      if (latestSeason) {
        setSelectedDashboardSeason(latestSeason);
      }
    };

    load();
  }, []);

  // useEffect(() => {}, [selectedDashboardSeason]);

  if (!teamSeasons.length) {
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
        <GameStatsDisplay seasonData={seasonData} />
      </div>
    </div>
  );
}

import SideNav from "./SideNav/sideNav";
import { useState } from "react";
import { type DashboardView } from "../../../types/dashboardView";
import Nav from "./Nav/nav";
import { type Season } from "../../../types/season";
import { useEffect } from "react";
import { teamSeasonsAPIFetch } from "./teamSeasonsAPIFetch";
import StatsSection from "./StatsSection/statsSection";

export default function Dashboard() {
  const [teamSeasons, setTeamSeasons] = useState<Season[] | null>(null);
  const [seasonData, setSeasonData] = useState<Season | null>(null);
  const [dashboardView, setdashboardView] = useState<DashboardView>("Game");
  const [selectedDashboardSeason, setSelectedDashboardSeason] = useState<string | null>(null);

  useEffect(() => {
    teamSeasonsAPIFetch({ amount: 0, sort: "desc", setTeamSeasons });
  }, []);

  useEffect(() => {
    if (teamSeasons) { setSelectedDashboardSeason(teamSeasons[0].name)}
  }, [teamSeasons])

  useEffect(() => {}, [selectedDashboardSeason]);

  if (!teamSeasons) {
    return (
      <div className="dashboard">
        <SideNav />
        <div className="dashboardMain"></div>
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
        <StatsSection seasonData={seasonData} />
      </div>
    </div>
  );
}

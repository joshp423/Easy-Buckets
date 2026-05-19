import SideNav from "./SideNav/sideNav";
import { useState } from "react";
import { type DashboardView } from "../../../types/dashboardView";
import Nav from "./Nav/nav";

export default function Dashboard() {
  const [seasonData, setSeasonData] = useState<SeasonData>(null)
  const [dashboardView, setdashboardView] = useState<DashboardView>("Game");
  const [selectedDashboardSeason, setSelectedDashboardSeason] = useState()

  return (
    <div className="dashboard">
      <Nav dashboardView={dashboardView} setdashboardView={setdashboardView} />
      <SideNav />
    </div>
  );
}

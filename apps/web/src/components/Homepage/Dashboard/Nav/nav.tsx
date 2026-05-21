import { type DashboardView } from "../../../../types/dashboardView";
import NavViewSelector from "./NavViewSelector.tsx/navViewSelector";
import NavSeasonSelector from "./NavSeasonSelector/navSeasonSelector";
import { type Season } from "../../../../types/season";

type navProps = {
  dashboardView: DashboardView;
  setdashboardView: React.Dispatch<React.SetStateAction<DashboardView>>;
  teamSeasons: Season[];
  setSelectedDashboardSeason: React.Dispatch<React.SetStateAction<string | null>>
};

export default function Nav({
  dashboardView,
  setdashboardView,
  teamSeasons,
  setSelectedDashboardSeason
}: navProps) {
  return (
    <div className="dashboardNav">
      <NavViewSelector
        dashboardView={dashboardView}
        setdashboardView={setdashboardView}
      />
      <NavSeasonSelector teamSeasons={teamSeasons} setSelectedDashboardSeason={setSelectedDashboardSeason}/>
    </div>
  );
}

import { type DashboardView } from "../../../../types/dashboardView";
import NavViewSelector from "./NavViewSelector.tsx/navViewSelector";
import NavSeasonSelector from "./NavSeasonSelector/navSeasonSelector";
import { type SeasonOverview } from "../../../../types/seasonOverview";

type navProps = {
  dashboardView: DashboardView;
  setdashboardView: React.Dispatch<React.SetStateAction<DashboardView>>;
  teamSeasons: SeasonOverview[];
  setSelectedDashboardSeason: React.Dispatch<React.SetStateAction<string>>;
};

export default function Nav({
  dashboardView,
  setdashboardView,
  teamSeasons,
  setSelectedDashboardSeason,
}: navProps) {
  return (
    <div className="dashboardNav">
      <NavViewSelector
        dashboardView={dashboardView}
        setdashboardView={setdashboardView}
      />
      <NavSeasonSelector
        teamSeasons={teamSeasons}
        setSelectedDashboardSeason={setSelectedDashboardSeason}
      />
    </div>
  );
}

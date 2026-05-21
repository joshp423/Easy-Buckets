import { type DashboardView } from "../../../../../types/dashboardView";

export type navViewProps = {
  dashboardView: DashboardView;
  setdashboardView: React.Dispatch<React.SetStateAction<DashboardView>>;
};

export default function NavViewSelector({
  dashboardView,
  setdashboardView,
}: navViewProps) {
  return (
    <div className="navViewSelector">
      <button
        style={{
          backgroundColor: dashboardView === "Game" ? "blue" : "black",
        }}
        onClick={() =>
          setdashboardView(dashboardView === "Season" ? "Game" : "Season")
        }
      >
        Game View
      </button>
      <button
        style={{
          backgroundColor: dashboardView === "Game" ? "black" : "blue",
        }}
        onClick={() =>
          setdashboardView(dashboardView === "Game" ? "Season" : "Game")
        }
      >
        Season Overview
      </button>
    </div>
  );
}

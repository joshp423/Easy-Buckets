import { type DashboardView } from "../../../../../types/dashboardView";
import "./navViewSelector.css";

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
          backgroundColor: dashboardView === "Game" ? "#e37204" : "#f3f5f8",
          color: dashboardView === "Game" ? "white" : "black",
        }}
        onClick={() =>
          setdashboardView(dashboardView === "Season" ? "Game" : "Season")
        }
      >
        <p>Game View</p>
      </button>
      <button
        style={{
          backgroundColor: dashboardView === "Game" ? "#f3f5f8" : "#e37204",
          color: dashboardView === "Game" ? "black" : "white",
        }}
        onClick={() =>
          setdashboardView(dashboardView === "Game" ? "Season" : "Game")
        }
      >
        <p>Season Overview</p>
      </button>
    </div>
  );
}

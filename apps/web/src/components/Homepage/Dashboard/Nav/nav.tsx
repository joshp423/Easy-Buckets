import { type DashboardView } from "../../../../types/dashboardView";
import NavViewSelector from "./NavViewSelector.tsx/navViewSelector";

type navProps = {
  dashboardView: DashboardView;
  setdashboardView: React.Dispatch<React.SetStateAction<DashboardView>>;
};

export default function Nav({ dashboardView, setdashboardView }: navProps) {
  return (
    <div className="dashboardNav">
      <NavViewSelector
        dashboardView={dashboardView}
        setdashboardView={setdashboardView}
      />
      
    </div>
  );
}

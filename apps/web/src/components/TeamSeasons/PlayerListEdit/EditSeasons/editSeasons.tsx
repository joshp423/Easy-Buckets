import NavSeasonSelector from "../../../Homepage/Dashboard/Nav/NavSeasonSelector/navSeasonSelector";
import type { SeasonOverview } from "../../../../types/seasonOverview";
import { useNavigate } from "react-router";
type EditSeasonsProps = {
  teamSeasons: SeasonOverview[];
  selectedDashboardSeason: string;
  setSelectedDashboardSeason: React.Dispatch<React.SetStateAction<string>>;
};

export default function EditSeasons({
  teamSeasons,
  setSelectedDashboardSeason,
  selectedDashboardSeason,
}: EditSeasonsProps) {

    const navigate = useNavigate();
  //navigate to teamSeasons/seasonName
  return (
    <div className="editSeasons">
      <h3>Season:</h3>
      <NavSeasonSelector
        teamSeasons={teamSeasons}
        setSelectedDashboardSeason={setSelectedDashboardSeason}
      />
      <button onClick={() => {navigate(`/team-seasons/${selectedDashboardSeason}`)}}>Edit Selected Season</button>
    </div>
  );
}

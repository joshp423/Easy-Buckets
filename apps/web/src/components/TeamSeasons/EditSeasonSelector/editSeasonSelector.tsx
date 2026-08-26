import NavSeasonSelector from "../../Homepage/Dashboard/Nav/NavSeasonSelector/navSeasonSelector";
import type { SeasonOverview } from "../../../types/seasonOverview";
import { useNavigate } from "react-router";
type EditSeasonsProps = {
  teamSeasons: SeasonOverview[];
  selectedDashboardSeason: string;
  setSelectedDashboardSeason: React.Dispatch<React.SetStateAction<string>>;
  editSeasonToggle: boolean;
};

export default function EditSeasonSelector({
  teamSeasons,
  setSelectedDashboardSeason,
  selectedDashboardSeason,
  editSeasonToggle
}: EditSeasonsProps) {
  const navigate = useNavigate();
  //navigate to teamSeasons/seasonName
  return (
    <div className="editSeasons" style={editSeasonToggle ? {"display": "flex"}: {"display": "none"}}>
      <h3>Seasons:</h3>
      <NavSeasonSelector
        teamSeasons={teamSeasons}
        setSelectedDashboardSeason={setSelectedDashboardSeason}
      />
      <button
        onClick={() => {
          const season = teamSeasons.find(
            (season) => season.name === selectedDashboardSeason,
          );
          const seasonId = season?.id;
          navigate(`/team-seasons/${selectedDashboardSeason}`, {
            state: { seasonId },
          });
        }}
      >
        Edit Selected Season
      </button>
    </div>
  );
}

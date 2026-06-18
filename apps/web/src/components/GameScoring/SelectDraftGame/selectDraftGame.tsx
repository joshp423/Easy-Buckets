import NavSeasonSelector from "../../Homepage/Dashboard/Nav/NavSeasonSelector/navSeasonSelector";
import { type SeasonOverview } from "../../../types/seasonOverview";

type SelectDraftGameProps = {
  teamSeasons: SeasonOverview[];
  setTeamSeasons: React.Dispatch<React.SetStateAction<SeasonOverview[]>>;
  selectedDashboardSeason: string;
  setSelectedDashboardSeason: React.Dispatch<React.SetStateAction<string>>;
};
export default function SelectDraftGame({
  teamSeasons,
  setTeamSeasons,
  selectedDashboardSeason,
  setSelectedDashboardSeason,
}: SelectDraftGameProps) {
  return (
    <div className="selectDraftGame">
      <NavSeasonSelector 
        teamSeasons={teamSeasons}
        setSelectedDashboardSeason={setSelectedDashboardSeason}
      />
    </div>
  );
}

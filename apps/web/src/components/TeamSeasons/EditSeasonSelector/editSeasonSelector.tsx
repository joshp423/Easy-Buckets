import NavSeasonSelector from "../../Homepage/Dashboard/Nav/NavSeasonSelector/navSeasonSelector";
import type { SeasonOverview } from "../../../types/seasonOverview";
import EditSeason from "./EditSeason/editSeason";
import "./editSeasonSelector.css";

type EditSeasonsProps = {
  teamSeasons: SeasonOverview[];
  selectedDashboardSeason: string;
  setSelectedDashboardSeason: React.Dispatch<React.SetStateAction<string>>;
  editSeasonToggle: boolean;
  editedSeason: number | null;
  setEditedSeason:  React.Dispatch<React.SetStateAction<number | null>>
};

export default function EditSeasonSelector({
  teamSeasons,
  setSelectedDashboardSeason,
  selectedDashboardSeason,
  editSeasonToggle,
  editedSeason,
  setEditedSeason
}: EditSeasonsProps) {
  const seasonName = selectedDashboardSeason;

  if (!editedSeason) {
    return (
      <div
        className="editSeasonSelector"
        style={editSeasonToggle ? { display: "grid" } : { display: "none" }}
      >
        <div>
          <h3>Seasons:</h3>
          <NavSeasonSelector
            teamSeasons={teamSeasons}
            setSelectedDashboardSeason={setSelectedDashboardSeason}
          />
        </div>
        <button
          onClick={() => {
            const season = teamSeasons.find(
              (season) => season.name === selectedDashboardSeason,
            );
            if (!season) return;
            const seasonId = season?.id;
            setEditedSeason(seasonId);
          }}
        >
          Edit Season
        </button>
      </div>
    );
  }

  return (
    <div
      className="editSeasonContainer"
      style={editSeasonToggle ? { display: "flex" } : { display: "none" }}
    >
      <EditSeason
        seasonId={editedSeason}
        setEditedSeason={setEditedSeason}
        seasonName={seasonName}
      />
    </div>
  );
}

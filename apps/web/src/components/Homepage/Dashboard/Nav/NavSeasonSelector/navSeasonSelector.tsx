import { type SeasonOverview } from "../../../../../types/seasonOverview";
import "./navSeasonSelector.css";

type navSeasonSelectorProps = {
  teamSeasons: SeasonOverview[];
  setSelectedDashboardSeason: React.Dispatch<React.SetStateAction<string>>;
};

export default function NavSeasonSelector({
  teamSeasons,
  setSelectedDashboardSeason,
}: navSeasonSelectorProps) {
  return (
    <div className="navSeasonSelector">
      <select
        name="seasonSelect"
        id="seasonSelect"
        onChange={(e) => {
          setSelectedDashboardSeason(e.target.value);
        }}
      >
        {teamSeasons.map(({ id, name }) => (
          <option key={id} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

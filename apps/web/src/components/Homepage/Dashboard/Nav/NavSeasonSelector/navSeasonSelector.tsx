import { type SeasonOverview } from "../../../../../types/seasonOverview";

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
      <form>
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
      </form>
    </div>
  );
}

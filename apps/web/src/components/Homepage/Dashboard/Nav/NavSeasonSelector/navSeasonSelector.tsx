import { type Season } from "../../../../../types/season";

type navSeasonSelectorProps = {
  teamSeasons: Season[];
  setSelectedDashboardSeason: React.Dispatch<React.SetStateAction<string | null>>
};

export default function NavSeasonSelector({
  teamSeasons,
  setSelectedDashboardSeason
}: navSeasonSelectorProps) {
  return (
    <div className="navSeasonSelector">
      <form>
        <select name="seasonSelect" id="seasonSelect" onChange={((e) => {setSelectedDashboardSeason(e.target.value)})}>
          {teamSeasons.map((season) => (
            <option value={season.name}>{season.name}</option>
          ))}
        </select>
      </form>
    </div>
  );
}

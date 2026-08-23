import SideNav from "../SideNav/sideNav";
import { useState, useEffect } from "react";
import { type Player } from "../../types/player";
import { teamPlayersAPIFetch } from "../GameScoring/teamPlayersAPIFetch";
import PlayerListEdit from "./PlayerListEdit/playerListEdit";
import { type SeasonOverview } from "../../types/seasonOverview";
import { teamSeasonsAPIFetch } from "../../shared API functions/teamSeasonsAPIFetch";
import EditSeasonSelector from "./PlayerListEdit/EditSeasonSelector/editSeasonSelector";

export default function TeamSeasons() {
  //active players + edit, season list into game list + edit, team name edit
  const [playerList, setPlayerList] = useState<Player[]>([]);
  const [addPlayer, setAddPlayer] = useState<boolean>(false);
  const [editPlayer, setEditPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [teamSeasons, setTeamSeasons] = useState<SeasonOverview[]>([]);
  const [selectedDashboardSeason, setSelectedDashboardSeason] =
    useState<string>("");

  useEffect(() => {
    if (editPlayer !== null) return; //only reload when loading complete

    const load = async () => {
      setLoading(true);
      const players = await teamPlayersAPIFetch();
      if (players.length) {
        setPlayerList(players);
      }
      setLoading(false);
    };

    load();
  }, [editPlayer]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const team = await teamSeasonsAPIFetch({ orderBy: "desc" });
      const seasons = team.seasons;

      if (seasons.length) {
        setTeamSeasons(seasons);
      }

      const latestSeason = seasons[0].name;

      if (latestSeason) {
        setSelectedDashboardSeason(latestSeason);
      }
      setLoading(false);
    };

    load();
  }, []);

  if (!loading) {
    return (
      <div className="teamSeasons">
        <SideNav />
        <PlayerListEdit
          editPlayer={editPlayer}
          setEditPlayer={setEditPlayer}
          playerList={playerList}
          setAddPlayer={setAddPlayer}
          addPlayer={addPlayer}
        />
        <EditSeasonSelector
          teamSeasons={teamSeasons}
          setSelectedDashboardSeason={setSelectedDashboardSeason}
          selectedDashboardSeason={selectedDashboardSeason}
        />
      </div>
    );
  }
}

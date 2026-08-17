import type { seasonStatPlayer } from "../seasonStatsDisplay";

type SeasonStatLeadersTableProps = {
  seasonStats: seasonStatPlayer[];
};

export default function SeasonStatLeadersTable({
  seasonStats,
}: SeasonStatLeadersTableProps) {
  const statLeaders = {
    points: { name: "", value: 0 },
    fGP: { name: "", value: 0 },
    tPP: { name: "", value: 0 },
    assists: { name: "", value: 0 },
    assistTurnover: { name: "", value: 0 },
    rebounds: { name: "", value: 0 },
    steals: { name: "", value: 0 },
    fouls: { name: "", value: 0 },
  };

  seasonStats.forEach((player) => {
    if (statLeaders.points.value < player.points) {
      statLeaders.points.name = player.name;
      statLeaders.points.value = player.points / player.gamesPlayed;
    }
    if (
      statLeaders.points.value === player.points &&
      statLeaders.points.name !== player.name
    ) {
      statLeaders.fGP.name = player.name + ", " + statLeaders.fGP.name;
    }

    if (
      statLeaders.fGP.value <
      ((player.twoPointFGMake + player.threePointFGMake) /
        (player.twoPointFGA + player.threePointFGA)) *
        100
    ) {
      statLeaders.fGP.name = player.name;
      statLeaders.fGP.value = Math.round(
        ((player.twoPointFGMake + player.threePointFGMake) /
          (player.twoPointFGA + player.threePointFGA)) *
          100,
      );
    }
    if (
      statLeaders.fGP.value ===
        ((player.twoPointFGMake + player.threePointFGMake) /
          (player.twoPointFGA + player.threePointFGA)) *
          100 &&
      statLeaders.fGP.name !== player.name
    ) {
      statLeaders.fGP.name = player.name + ", " + statLeaders.fGP.name;
    }

    if (
      statLeaders.tPP.value <
      (player.threePointFGMake / player.threePointFGA) * 100
    ) {
      statLeaders.tPP.name = player.name;
      statLeaders.tPP.value = Math.round(
        (player.threePointFGMake / player.threePointFGA) * 100,
      );
    }
    if (
      statLeaders.tPP.value <
        (player.threePointFGMake / player.threePointFGA) * 100 &&
      statLeaders.tPP.name !== player.name
    ) {
      statLeaders.tPP.name = player.name + ", " + statLeaders.tPP.name;
    }

    if (statLeaders.assists.value < player.assist) {
      statLeaders.assists.name = player.name;
      statLeaders.assists.value = player.assist;
    }
    if (
      statLeaders.assists.value === player.assist &&
      statLeaders.assists.name !== player.name
    ) {
      statLeaders.assists.name = player.name + ", " + statLeaders.assists.name;
    }

    if (statLeaders.assistTurnover.value < player.assist / player.turnover) {
      statLeaders.assistTurnover.name = player.name;
      statLeaders.assistTurnover.value = player.assist / player.turnover;
    }
    if (
      statLeaders.assistTurnover.value === player.assist / player.turnover &&
      statLeaders.assistTurnover.name !== player.name
    ) {
      statLeaders.assistTurnover.name =
        player.name + ", " + statLeaders.assistTurnover.name;
    }

    if (statLeaders.rebounds.value < player.totalRebounds) {
      statLeaders.rebounds.name = player.name;
      statLeaders.rebounds.value = player.totalRebounds;
    }
    if (
      statLeaders.rebounds.value === player.totalRebounds &&
      statLeaders.rebounds.name !== player.name
    ) {
      statLeaders.rebounds.name =
        player.name + ", " + statLeaders.rebounds.name;
    }

    if (statLeaders.steals.value < player.steal) {
      statLeaders.steals.name = player.name;
      statLeaders.steals.value = player.steal;
    }
    if (
      statLeaders.steals.value === player.steal &&
      statLeaders.steals.name !== player.name
    ) {
      statLeaders.steals.name = player.name + ", " + statLeaders.steals.name;
    }

    if (statLeaders.fouls.value < player.pF) {
      statLeaders.fouls.name = player.name;
      statLeaders.fouls.value = player.pF / player.gamesPlayed;
    }
    if (
      statLeaders.fouls.value === player.pF &&
      statLeaders.fouls.name !== player.name
    ) {
      statLeaders.fouls.name = player.name + ", " + statLeaders.fouls.name;
    }
  });

  return (
    <div className="seasonStatLeadersTable">
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Stat Leader</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Points</td>
            <td>
              {statLeaders.points.name} - {statLeaders.points.value} PPG
            </td>
          </tr>
          <tr>
            <td>Field Goal %</td>
            <td>
              {statLeaders.fGP.name} - {statLeaders.fGP.value}%
            </td>
          </tr>
          <tr>
            <td>Three Point %</td>
            <td>
              {statLeaders.tPP.name} - {statLeaders.tPP.value}%
            </td>
          </tr>
          <tr>
            <td>Assists</td>
            <td>
              {statLeaders.points.name} - {statLeaders.assists.value} APG
            </td>
          </tr>
          <tr>
            <td>Assists/Turnover Ratio</td>
            <td>
              {statLeaders.assistTurnover.name} -{" "}
              {statLeaders.assistTurnover.value}
            </td>
          </tr>
          <tr>
            <td>Rebounds</td>
            <td>
              {statLeaders.rebounds.name} - {statLeaders.rebounds.value} RPG
            </td>
          </tr>
          <tr>
            <td>Steals</td>
            <td>
              {statLeaders.steals.name} - {statLeaders.steals.value} SPG
            </td>
          </tr>
          <tr>
            <td>Fouls</td>
            <td>
              {statLeaders.fouls.name} - {statLeaders.fouls.value} FPG
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

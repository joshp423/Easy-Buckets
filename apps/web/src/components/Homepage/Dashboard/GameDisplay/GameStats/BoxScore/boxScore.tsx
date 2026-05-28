import type { Game } from "../../../../../../types/game";

type boxScoreProps = {
  gameStats: Game;
};

export default function BoxScore({ gameStats }: boxScoreProps) {
  const gameStatlines = gameStats?.gameStatlines;

  if (!gameStatlines) return;

  return (
    <div className="boxScore">
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>FGM</th>
            <th>FGA</th>
            <th>FG%</th>
            <th>3PM</th>
            <th>3PA</th>
            <th>3P%</th>
            <th>FTM</th>
            <th>FTA</th>
            <th>FT%</th>
            <th>PTS</th>
            <th>R-OFF</th>
            <th>R-DEF</th>
            <th>R-TOT</th>
            <th>AST</th>
            <th>BLK</th>
            <th>STL</th>
            <th>TO</th>
            <th>PF</th>
          </tr>
        </thead>
        <tbody>
          {gameStatlines.map((playerStats) => (
            <tr>
              <td>
                {playerStats.player.name} #{playerStats.player.number}
              </td>
              <td>
                {playerStats.twoPointFGMake + playerStats.threePointFGMake}
              </td>
              <td>{playerStats.twoPointFGA + playerStats.threePointFGA}</td>
              <td>
                {Math.round(
                  ((playerStats.threePointFGMake + playerStats.twoPointFGMake) /
                    (playerStats.twoPointFGMiss +
                      playerStats.threePointFGMiss)) *
                    100,
                )}
                %
              </td>
              <td></td>
              <td></td>
              <td>%</td>
              <td></td>
              <td></td>
              <td>%</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

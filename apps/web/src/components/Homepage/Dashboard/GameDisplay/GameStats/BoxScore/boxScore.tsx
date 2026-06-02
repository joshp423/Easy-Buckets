import type { Game } from "../../../../../../types/game";

type boxScoreProps = {
  currentGame: Game;
};

export default function BoxScore({ currentGame }: boxScoreProps) {
  const gameStatlines = currentGame?.gameStatlines;

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
            <th>R-OFF</th>
            <th>R-DEF</th>
            <th>R-TOT</th>
            <th>AST</th>
            <th>BLK</th>
            <th>STL</th>
            <th>TO</th>
            <th>PF</th>
            <th>PTS</th>
          </tr>
        </thead>
        <tbody>
          {gameStatlines.map((playerStats) => {
            const id = playerStats.playerId;
            return (
              <tr key={id}>
                <td>
                  {playerStats.player.name} #{playerStats.player.number}
                </td>
                <td>
                  {playerStats.twoPointFGMake + playerStats.threePointFGMake}
                </td>
                <td>{playerStats.twoPointFGA + playerStats.threePointFGA}</td>
                <td>
                  {Math.round(
                    ((playerStats.threePointFGMake +
                      playerStats.twoPointFGMake) /
                      (playerStats.twoPointFGA + playerStats.threePointFGA)) *
                      100,
                  )}
                  %
                </td>
                <td>{playerStats.threePointFGMake}</td>
                <td>{playerStats.threePointFGA}</td>
                <td>{playerStats.threePointFGPercent}%</td>
                <td>{playerStats.fTMake}</td>
                <td>{playerStats.fTA}</td>
                <td>{playerStats.fTPercent}%</td>
                <td>{playerStats.oReb}</td>
                <td>{playerStats.dReb}</td>
                <td>{playerStats.totalRebounds}</td>
                <td>{playerStats.assist}</td>
                <td>{playerStats.block}</td>
                <td>{playerStats.steal}</td>
                <td>{playerStats.turnover}</td>
                <td>{playerStats.pF}</td>
                <td>{playerStats.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

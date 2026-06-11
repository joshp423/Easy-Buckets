import type { Game } from "../../../../../../types/game";
import "./boxScore.css";

type boxScoreProps = {
  currentGame: Game;
};

export default function BoxScore({ currentGame }: boxScoreProps) {
  const gameStatlines = currentGame?.gameStatlines;

  if (!gameStatlines) return;

  const teamTotals = {
    twoPointFGMiss: 0,
    twoPointFGMake: 0,
    twoPointFGA: 0,
    threePointFGMiss: 0,
    threePointFGMake: 0,
    threePointFGA: 0,
    fTMiss: 0,
    fTMake: 0,
    fTA: 0,
    oReb: 0,
    dReb: 0,
    assist: 0,
    block: 0,
    steal: 0,
    turnover: 0,
    pF: 0,
    totalRebounds: 0,
    points: 0,
  };

  gameStatlines.forEach((playerStats) => {
    teamTotals.twoPointFGMiss += playerStats.twoPointFGMiss;
    teamTotals.twoPointFGMake += playerStats.twoPointFGMake;
    teamTotals.twoPointFGA += playerStats.twoPointFGA;
    teamTotals.threePointFGMiss += playerStats.threePointFGMiss;
    teamTotals.threePointFGMake += playerStats.threePointFGMake;
    teamTotals.threePointFGA += playerStats.threePointFGA;
    teamTotals.fTMiss += playerStats.fTMiss;
    teamTotals.fTMake += playerStats.fTMake;
    teamTotals.fTA += playerStats.fTA;
    teamTotals.oReb += playerStats.oReb;
    teamTotals.dReb += playerStats.dReb;
    teamTotals.assist += playerStats.assist;
    teamTotals.block += playerStats.block;
    teamTotals.steal += playerStats.steal;
    teamTotals.turnover += playerStats.turnover;
    teamTotals.pF += playerStats.pF;
    teamTotals.totalRebounds += playerStats.totalRebounds;
    teamTotals.points += playerStats.points;
  });

  console.log(teamTotals);

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
        <tfoot>
          <tr>
            <td></td>
            <td>{teamTotals.twoPointFGMake + teamTotals.threePointFGMake}</td>
            <td>{teamTotals.twoPointFGA + teamTotals.threePointFGA}</td>
            <td>
              {Math.round(
                ((teamTotals.threePointFGMake + teamTotals.twoPointFGMake) /
                  (teamTotals.twoPointFGA + teamTotals.threePointFGA)) *
                  100,
              )}
              %
            </td>
            <td>{teamTotals.threePointFGMake}</td>
            <td>{teamTotals.threePointFGA}</td>
            <td>
              {Math.round(
                (teamTotals.threePointFGMake / teamTotals.threePointFGA) * 100,
              )}
              %
            </td>
            <td>{teamTotals.fTMake}</td>
            <td>{teamTotals.fTA}</td>
            <td>{Math.round((teamTotals.fTMake / teamTotals.fTA) * 100)}%</td>
            <td>{teamTotals.oReb}</td>
            <td>{teamTotals.dReb}</td>
            <td>{teamTotals.totalRebounds}</td>
            <td>{teamTotals.assist}</td>
            <td>{teamTotals.block}</td>
            <td>{teamTotals.steal}</td>
            <td>{teamTotals.turnover}</td>
            <td>{teamTotals.pF}</td>
            <td>{teamTotals.points}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

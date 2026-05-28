import type { Game } from "../../../../../../types/game";

type teamStatProps = {
  currentGame: Game
}


export default function TeamStats({currentGame}: teamStatProps) {

  if (!currentGame) return;

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
    points: 0
  }

  currentGame?.gameStatlines.forEach((playerStats) => {
    teamTotals.twoPointFGMiss += playerStats.twoPointFGMiss
    teamTotals.twoPointFGMake += playerStats.twoPointFGMake
    teamTotals.twoPointFGA += playerStats.twoPointFGA
    teamTotals.threePointFGMiss += playerStats.threePointFGMiss
    teamTotals.threePointFGMake += playerStats.threePointFGMake
    teamTotals.threePointFGA += playerStats.threePointFGA
    teamTotals.fTMiss += playerStats.fTMiss
    teamTotals.fTMake += playerStats.fTMake
    teamTotals.fTA += playerStats.fTA
    teamTotals.oReb += playerStats.oReb
    teamTotals.dReb += playerStats.dReb
    teamTotals.assist += playerStats.assist
    teamTotals.block += playerStats.block
    teamTotals.steal += playerStats.steal
    teamTotals.turnover += playerStats.turnover
    teamTotals.pF += playerStats.pF
    teamTotals.threePointFGMake += playerStats.threePointFGMake
    teamTotals.totalRebounds += playerStats.totalRebounds
    teamTotals.points += playerStats.points
  })

  return (
    <div className="teamStats">
      <h1>Team Stats</h1>
      <table>
        <thead>
          <tr>
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
          <tr>
            <td>
              {teamTotals.twoPointFGMake+teamTotals.threePointFGMake}
            </td>
            <td>{teamTotals.twoPointFGA + teamTotals.threePointFGA}</td>
            <td>
              {Math.round(
                ((teamTotals.threePointFGMake + teamTotals.twoPointFGMake) /
                  (teamTotals.twoPointFGA + teamTotals.threePointFGA)) *
                  100
              )}
              %
            </td>
            <td>{teamTotals.threePointFGMake}</td>
            <td>{teamTotals.threePointFGA}</td>
            <td>{Math.round(teamTotals.threePointFGMake/teamTotals.threePointFGA*100)}%</td>
            <td>{teamTotals.fTMake}</td>
            <td>{teamTotals.fTA}</td>
            <td>{Math.round(teamTotals.fTMake/teamTotals.fTA*100)}%</td>
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
        </tbody>
      </table>
    </div>
  )
}

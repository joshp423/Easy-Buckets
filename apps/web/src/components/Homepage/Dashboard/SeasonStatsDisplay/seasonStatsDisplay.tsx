import type { Game } from "../../../../types/game";
import "./seasonStatsDisplay.css"

type SeasonStatsDisplayProps = {
  seasonData: Game[];
};

//season and player stats, overall shots?
//get just playerStats from specific season or work out from these stats?



export default function SeasonStatsDisplay({ seasonData }: SeasonStatsDisplayProps) {
  if (!seasonData) return;

  type seasonStatPlayer = {
    name: string;
    number: number;
    id: number,
    twoPointFGMiss: number;
    twoPointFGMake: number;
    twoPointFGA: number;
    threePointFGMiss: number;
    threePointFGMake: number;
    threePointFGA: number;
    fTMiss: number;
    fTMake: number;
    fTA: number;
    oReb: number;
    dReb: number;
    assist: number;
    block: number;
    steal: number;
    turnover: number;
    pF: number;
    totalRebounds: number;
    points: number;
    threePointFGPercent: number;
    fTPercent: number;

  };

  
  //reduce makes it so we can reference the array while building it as well as not have the same exact number of fields.
  const seasonStats:seasonStatPlayer[] = seasonData.reduce<seasonStatPlayer[]>((accumulatedArray, game) => {
    game.gameStatlines.forEach((gameStatline) => {
      const existingPlayerSeasonStat = accumulatedArray.find(playerSeasonStats => playerSeasonStats.id === gameStatline.playerId)
      if (!existingPlayerSeasonStat) {
        accumulatedArray.push({
          name: gameStatline.player.name,
          number: gameStatline.player.number,
          id: gameStatline.playerId,
          twoPointFGMiss:  gameStatline.twoPointFGMiss,
          twoPointFGMake: gameStatline.twoPointFGMake,
          twoPointFGA: gameStatline.twoPointFGA,
          threePointFGMiss: gameStatline.threePointFGMiss,
          threePointFGMake: gameStatline.threePointFGMake,
          threePointFGA: gameStatline.threePointFGA,
          fTMiss: gameStatline.fTMiss,
          fTMake: gameStatline.fTMake,
          fTA: gameStatline.fTA,
          oReb: gameStatline.oReb,
          dReb: gameStatline.dReb,
          assist: gameStatline.assist,
          block: gameStatline.block,
          steal: gameStatline.steal,
          turnover: gameStatline.turnover,
          pF: gameStatline.pF,
          totalRebounds: gameStatline.totalRebounds,
          points: gameStatline.points,
          threePointFGPercent: gameStatline.threePointFGPercent,
          fTPercent: gameStatline.fTPercent,
        });
        return;
      }
        existingPlayerSeasonStat.twoPointFGMiss += gameStatline.twoPointFGMiss;
        existingPlayerSeasonStat.twoPointFGMake += gameStatline.twoPointFGMake;
        existingPlayerSeasonStat.twoPointFGA += gameStatline.twoPointFGA;
        existingPlayerSeasonStat.threePointFGMiss += gameStatline.threePointFGMiss;
        existingPlayerSeasonStat.threePointFGMake += gameStatline.threePointFGMake;
        existingPlayerSeasonStat.threePointFGA += gameStatline.threePointFGA;
        existingPlayerSeasonStat.fTMiss += gameStatline.fTMiss;
        existingPlayerSeasonStat.fTMake += gameStatline.fTMake;
        existingPlayerSeasonStat.fTA += gameStatline.fTA;
        existingPlayerSeasonStat.oReb += gameStatline.oReb;
        existingPlayerSeasonStat.dReb += gameStatline.dReb;
        existingPlayerSeasonStat.assist += gameStatline.assist;
        existingPlayerSeasonStat.block += gameStatline.block;
        existingPlayerSeasonStat.steal += gameStatline.steal;
        existingPlayerSeasonStat.turnover += gameStatline.turnover;
        existingPlayerSeasonStat.pF += gameStatline.pF;
        existingPlayerSeasonStat.totalRebounds += gameStatline.totalRebounds;
        existingPlayerSeasonStat.points += gameStatline.points;
        existingPlayerSeasonStat.fTPercent = existingPlayerSeasonStat.fTMake / existingPlayerSeasonStat.fTA
        existingPlayerSeasonStat.threePointFGPercent = existingPlayerSeasonStat.threePointFGMake / existingPlayerSeasonStat.threePointFGA
      })
      return accumulatedArray;
    }, [])
    console.log(seasonStats)
  
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
  
  seasonStats.forEach((player) => {
    teamTotals.twoPointFGMiss += player.twoPointFGMiss;
    teamTotals.twoPointFGMake += player.twoPointFGMake;
    teamTotals.twoPointFGA += player.twoPointFGA;
    teamTotals.threePointFGMiss += player.threePointFGMiss;
    teamTotals.threePointFGMake += player.threePointFGMake;
    teamTotals.threePointFGA += player.threePointFGA;
    teamTotals.fTMiss += player.fTMiss;
    teamTotals.fTMake += player.fTMake;
    teamTotals.fTA += player.fTA;
    teamTotals.oReb += player.oReb;
    teamTotals.dReb += player.dReb;
    teamTotals.assist += player.assist;
    teamTotals.block += player.block;
    teamTotals.steal += player.steal;
    teamTotals.turnover += player.turnover;
    teamTotals.pF += player.pF;
    teamTotals.totalRebounds += player.totalRebounds;
    teamTotals.points += player.points;
  })
  
  return (
    <div className="seasonStatsContainer">
      <div className="seasonStatsBoxScore">
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
            {seasonStats.map((playerSeasonStats) => {
              const id = playerSeasonStats.id;
              return (
                <tr key={id}>
                  <td>{playerSeasonStats.name} #{playerSeasonStats.number}</td>
                  <td>{playerSeasonStats.twoPointFGMake + playerSeasonStats.threePointFGMake}</td>
                  <td>{playerSeasonStats.twoPointFGA + playerSeasonStats.threePointFGA}</td>
                  <td>
                    {Math.round(
                      ((playerSeasonStats.threePointFGMake + playerSeasonStats.twoPointFGMake) /
                      (playerSeasonStats.twoPointFGA + playerSeasonStats.threePointFGA)) * 100,
                    )} %
                  </td>
                  <td>{playerSeasonStats.threePointFGMake}</td>
                  <td>{playerSeasonStats.threePointFGA}</td>
                  <td>{playerSeasonStats.threePointFGPercent}%</td>
                  <td>{playerSeasonStats.fTMake}</td>
                  <td>{playerSeasonStats.fTA}</td>
                  <td>{playerSeasonStats.fTPercent}%</td>
                  <td>{playerSeasonStats.oReb}</td>
                  <td>{playerSeasonStats.dReb}</td>
                  <td>{playerSeasonStats.totalRebounds}</td>
                  <td>{playerSeasonStats.assist}</td>
                  <td>{playerSeasonStats.block}</td>
                  <td>{playerSeasonStats.steal}</td>
                  <td>{playerSeasonStats.turnover}</td>
                  <td>{playerSeasonStats.pF}</td>
                  <td>{playerSeasonStats.points}</td>
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
    </div>
  )
}

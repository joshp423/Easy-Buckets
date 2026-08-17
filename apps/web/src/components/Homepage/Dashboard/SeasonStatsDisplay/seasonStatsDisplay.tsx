import type { Game } from "../../../../types/game";
import "./seasonStatsDisplay.css";
import ShotChart from "../GameDisplay/GameStats/ShotChart/shotChart";
import type { ShotLog } from "../../../../types/shotLog";
import { useState } from "react";

type SeasonStatsDisplayProps = {
  seasonData: Game[];
};

//season and player stats, overall shots?
//get just playerStats from specific season or work out from these stats?

export default function SeasonStatsDisplay({
  seasonData,
}: SeasonStatsDisplayProps) {
  const [selectedShot, setSelectedShot] = useState<number | null>(null);

  if (!seasonData) return;

  type seasonStatPlayer = {
    name: string;
    number: number;
    id: number;
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
    gamesPlayed: number;
  };

  //reduce makes it so we can reference the array while building it as well as not have the same exact number of fields.
  const seasonStats: seasonStatPlayer[] = seasonData.reduce<seasonStatPlayer[]>(
    (accumulatedArray, game) => {
      game.gameStatlines.forEach((gameStatline) => {
        const existingPlayerSeasonStat = accumulatedArray.find(
          (playerSeasonStats) => playerSeasonStats.id === gameStatline.playerId,
        );
        if (!existingPlayerSeasonStat) {
          accumulatedArray.push({
            name: gameStatline.player.name,
            number: gameStatline.player.number,
            id: gameStatline.playerId,
            twoPointFGMiss: gameStatline.twoPointFGMiss,
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
            gamesPlayed: 1,
          });
          return;
        }
        existingPlayerSeasonStat.twoPointFGMiss += gameStatline.twoPointFGMiss;
        existingPlayerSeasonStat.twoPointFGMake += gameStatline.twoPointFGMake;
        existingPlayerSeasonStat.twoPointFGA += gameStatline.twoPointFGA;
        existingPlayerSeasonStat.threePointFGMiss +=
          gameStatline.threePointFGMiss;
        existingPlayerSeasonStat.threePointFGMake +=
          gameStatline.threePointFGMake;
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
        existingPlayerSeasonStat.fTPercent =
          existingPlayerSeasonStat.fTMake / existingPlayerSeasonStat.fTA;
        existingPlayerSeasonStat.threePointFGPercent =
          existingPlayerSeasonStat.threePointFGMake /
          existingPlayerSeasonStat.threePointFGA;
        existingPlayerSeasonStat.gamesPlayed += 1
      });
      return accumulatedArray;
    },
    [],
  );
  const seasonShots: ShotLog = seasonData.reduce<ShotLog>((acc, game) => {
    game.gameStatlines.forEach((gameStatline) => {
      gameStatline.shots?.forEach((shot) => {
        const newShot = {
          id: gameStatline.playerId, // using this to bulk select shots
          gameStatlineId: gameStatline.id,
          make: shot.make,
          X: shot.X,
          Y: shot.Y,
          type: shot.type,
          timeStamp: shot.timeStamp,
          gameStatline: {
            player: {
              name: gameStatline.player.name,
              number: gameStatline.player.number,
            },
          },
        };
        acc.push(newShot);
      });
    });
    return acc;
  }, []);


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
  });

  const statLeaders = {
    points: {name: "", value: 0},
    fGP: {name: "", value: 0},
    tPP: {name: "", value: 0},
    assists: {name: "", value: 0},
    assistTurnover: {name: "", value: 0},
    rebounds: {name: "", value: 0},
    steals: {name: "", value: 0},
    fouls: {name: "", value: 0},
  };


  seasonStats.forEach((player) => {

    if (statLeaders.points.value < player.points) {
      statLeaders.points.name = player.name;
      statLeaders.points.value = player.points / player.gamesPlayed
    }
    if (statLeaders.points.value === player.points && statLeaders.points.name !== player.name) {statLeaders.fGP.name = player.name + ", " + statLeaders.fGP.name;}

    if (statLeaders.fGP.value < (player.twoPointFGMake + player.threePointFGMake) / (player.twoPointFGA + player.threePointFGA) * 100) {
      statLeaders.fGP.name = player.name;
      statLeaders.fGP.value = Math.round((player.twoPointFGMake + player.threePointFGMake) / (player.twoPointFGA + player.threePointFGA) * 100);
    }
    if (statLeaders.fGP.value === (player.twoPointFGMake + player.threePointFGMake) / (player.twoPointFGA + player.threePointFGA) * 100 && statLeaders.fGP.name !== player.name) {
      statLeaders.fGP.name = player.name + ", " + statLeaders.fGP.name;
    }

    if (statLeaders.tPP.value < (player.threePointFGMake / player.threePointFGA ) * 100) {
      statLeaders.tPP.name = player.name;
      statLeaders.tPP.value = Math.round((player.threePointFGMake / player.threePointFGA) * 100);
    }
    if (statLeaders.tPP.value < (player.threePointFGMake / player.threePointFGA ) * 100 && statLeaders.tPP.name !== player.name) {
      statLeaders.tPP.name = player.name + ", " + statLeaders.tPP.name;
    }

    if (statLeaders.assists.value < player.assist) {
      statLeaders.assists.name = player.name;
      statLeaders.assists.value = player.assist;
    }
    if (statLeaders.assists.value === player.assist && statLeaders.assists.name !== player.name) {
      statLeaders.assists.name = player.name + ", " + statLeaders.assists.name;
    }

    if (statLeaders.assistTurnover.value < player.assist / player.turnover) {
      statLeaders.assistTurnover.name = player.name;
      statLeaders.assistTurnover.value = player.assist / player.turnover
    }
    if (statLeaders.assistTurnover.value === player.assist / player.turnover && statLeaders.assistTurnover.name !== player.name) {
      statLeaders.assistTurnover.name = player.name + ", " + statLeaders.assistTurnover.name;
    }

    if (statLeaders.rebounds.value < player.totalRebounds) {
      statLeaders.rebounds.name = player.name;
      statLeaders.rebounds.value = player.totalRebounds
    }
    if (statLeaders.rebounds.value === player.totalRebounds && statLeaders.rebounds.name !== player.name) {statLeaders.rebounds.name = player.name + ", " + statLeaders.rebounds.name;}

    if (statLeaders.steals.value < player.steal) {
      statLeaders.steals.name = player.name;
      statLeaders.steals.value = player.steal;
    }
    if (statLeaders.steals.value === player.steal && statLeaders.steals.name !== player.name) {statLeaders.steals.name = player.name + ", " + statLeaders.steals.name;}

    if (statLeaders.fouls.value < player.pF) {
      statLeaders.fouls.name = player.name;
      statLeaders.fouls.value = player.pF / player.gamesPlayed;
    }
    if (statLeaders.fouls.value === player.pF && statLeaders.fouls.name !== player.name) {statLeaders.fouls.name = player.name + ", " + statLeaders.fouls.name;}

  })
  

  return (
    <div className="seasonStatsContainer">
      <ShotChart shotLog={seasonShots} selectedShot={selectedShot} />
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
                <tr key={id} style={{"cursor": "pointer"}} onClick={() => {
                  if (selectedShot === id) {
                    setSelectedShot(null);
                    return;
                  }
                  setSelectedShot((playerSeasonStats.id));
                }}
                className={selectedShot === id ? "selected" : ""}
                >
                  <td>
                    {playerSeasonStats.name} #{playerSeasonStats.number}
                  </td>
                  <td>
                    {playerSeasonStats.twoPointFGMake +
                      playerSeasonStats.threePointFGMake}
                  </td>
                  <td>
                    {playerSeasonStats.twoPointFGA +
                      playerSeasonStats.threePointFGA}
                  </td>
                  <td>
                    {Math.round(
                      ((playerSeasonStats.threePointFGMake +
                        playerSeasonStats.twoPointFGMake) /
                        (playerSeasonStats.twoPointFGA +
                          playerSeasonStats.threePointFGA)) *
                        100,
                    )}{" "}
                    %
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
                  (teamTotals.threePointFGMake / teamTotals.threePointFGA) *
                    100,
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
              <td>{statLeaders.points.name} - {statLeaders.points.value} PPG</td>
            </tr>
            <tr>
              <td>Field Goal %</td>
              <td>{statLeaders.fGP.name} - {statLeaders.fGP.value}%</td>
            </tr>
            <tr>
              <td>Three Point %</td>
              <td>{statLeaders.tPP.name} - {statLeaders.tPP.value}%</td>
            </tr>
            <tr>
              <td>Assists</td>
              <td>{statLeaders.points.name} - {statLeaders.assists.value} APG</td>
            </tr>
            <tr>
              <td>Assists/Turnover Ratio</td>
              <td>{statLeaders.assistTurnover.name} - {statLeaders.assistTurnover.value}</td>
            </tr>
            <tr>
              <td>Rebounds</td>
              <td>{statLeaders.rebounds.name} - {statLeaders.rebounds.value} RPG</td>
            </tr>
            <tr>
              <td>Steals</td>
              <td>{statLeaders.points.name} - {statLeaders.rebounds.value} SPG</td>
            </tr>
            <tr>
              <td>Fouls</td>
              <td>{statLeaders.fouls.name} - {statLeaders.fouls.value} FPG</td>
            </tr>
          </tbody>   
        </table>
      </div>
    </div>
  );
}

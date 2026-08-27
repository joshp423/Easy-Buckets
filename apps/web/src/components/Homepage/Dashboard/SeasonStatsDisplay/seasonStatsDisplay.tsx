import type { Game } from "../../../../types/game";
import "./seasonStatsDisplay.css";
import ShotChart from "../GameDisplay/GameStats/ShotChart/shotChart";
import type { ShotLog } from "../../../../types/shotLog";
import { useState } from "react";
import SeasonStatsTable from "./SeasonStatsTable/seasonStatsTable";
import SeasonStatLeadersTable from "./SeasonStatLeadersTable/seasonStatLeadersTable";
import NoGames from "../noGames";

type SeasonStatsDisplayProps = {
  seasonData: Game[];
};

export type seasonStatPlayer = {
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

export default function SeasonStatsDisplay({
  seasonData,
}: SeasonStatsDisplayProps) {
  const [selectedShot, setSelectedShot] = useState<number | null>(null);

  if (seasonData.length === 0) return <NoGames />

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
        existingPlayerSeasonStat.gamesPlayed += 1;
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
    <div className="seasonStatsContainer">
      <div>
        <SeasonStatLeadersTable seasonStats={seasonStats} />
        <ShotChart shotLog={seasonShots} selectedShot={selectedShot} />
      </div>
      <SeasonStatsTable
        seasonStats={seasonStats}
        setSelectedShot={setSelectedShot}
        selectedShot={selectedShot}
      />
    </div>
  );
}

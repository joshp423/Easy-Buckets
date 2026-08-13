import { number } from "zod";
import type { Game } from "../../../../types/game";
import { useState } from "react";

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
  };

  

  const seasonStats:seasonStatPlayer[] = seasonData.reduce<seasonStatPlayer[]>((accumulatedArray, game) => {
    game.gameStatlines.forEach((gameStatline) => {
      const existingPlayerSeasonStat = accumulatedArray.find(playerSeasonStats => playerSeasonStats.id === gameStatline.playerId)
      if (!existingPlayerSeasonStat) {
        accumulatedArray.push({
          name: gameStatline.player.name,
          number: gameStatline.player.number,
          id: gameStatline.playerId,
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
        });
        return;
      }
        existingPlayerSeasonStat.twoPointFGMiss + gameStatline.twoPointFGMiss,
        existingPlayerSeasonStat.twoPointFGMake + gameStatline.twoPointFGMake,
        existingPlayerSeasonStat.twoPointFGA + gameStatline.twoPointFGA,
        existingPlayerSeasonStat.threePointFGMiss + gameStatline.threePointFGMiss,
        existingPlayerSeasonStat.threePointFGMake + gameStatline.threePointFGMake,
        existingPlayerSeasonStat.threePointFGA + gameStatline.threePointFGA,
        existingPlayerSeasonStat.fTMiss + gameStatline.fTMiss,
        existingPlayerSeasonStat.fTMake + gameStatline.fTMake,
        existingPlayerSeasonStat.fTA + gameStatline.fTA,
        existingPlayerSeasonStat.oReb + gameStatline.oReb,
        existingPlayerSeasonStat.dReb + gameStatline.dReb,
        existingPlayerSeasonStat.assist + gameStatline.assist,
        existingPlayerSeasonStat.block + gameStatline.block,
        existingPlayerSeasonStat.steal + gameStatline.steal,
        existingPlayerSeasonStat.turnover + gameStatline.turnover,
        existingPlayerSeasonStat.pF + gameStatline.pF,
        existingPlayerSeasonStat.totalRebounds + gameStatline.totalRebounds,
        existingPlayerSeasonStat.points + gameStatline.points,
      })
      return accumulatedArray;
    }, [])
  

  // const seasonStats:seasonStatPlayer[] = seasonData.forEach((game) => {
  //   game.gameStatlines.forEach((gameStatline) => {
  //     const existingPlayerSeasonStat = seasonStats.find( playerSeasonStats => playerSeasonStats.id === gameStatline.playerId)
  //     if (!existingPlayerSeasonStat) {
  //       const newPlayerObj = {
  //         name: gameStatline.player.name,
  //         number: gameStatline.player.number,
  //         id: gameStatline.playerId,
  //         twoPointFGMiss: 0,
  //         twoPointFGMake: 0,
  //         twoPointFGA: 0,
  //         threePointFGMiss: 0,
  //         threePointFGMake: 0,
  //         threePointFGA: 0,
  //         fTMiss: 0,
  //         fTMake: 0,
  //         fTA: 0,
  //         oReb: 0,
  //         dReb: 0,
  //         assist: 0,
  //         block: 0,
  //         steal: 0,
  //         turnover: 0,
  //         pF: 0,
  //         totalRebounds: 0,
  //         points: 0,
  //       }
  //       seasonStats.push(newPlayerObj)
  //       return;
  //     }
  //     const updatedPlayerSeasonStat = {
  //       name: existingPlayerSeasonStat.name,
  //       number: existingPlayerSeasonStat.number,
  //       id: existingPlayerSeasonStat.id,
  //       twoPointFGMiss: existingPlayerSeasonStat.twoPointFGMiss + gameStatline.twoPointFGMiss,
  //       twoPointFGMake: existingPlayerSeasonStat.twoPointFGMake + gameStatline.twoPointFGMake,
  //       twoPointFGA: existingPlayerSeasonStat.twoPointFGA + gameStatline.twoPointFGA,
  //       threePointFGMiss: existingPlayerSeasonStat.threePointFGMiss + gameStatline.threePointFGMiss,
  //       threePointFGMake: existingPlayerSeasonStat.threePointFGMake + gameStatline.threePointFGMake,
  //       threePointFGA: existingPlayerSeasonStat.threePointFGA + gameStatline.threePointFGA,
  //       fTMiss: existingPlayerSeasonStat.fTMiss + gameStatline.fTMiss,
  //       fTMake: existingPlayerSeasonStat.fTMake + gameStatline.fTMake,
  //       fTA: existingPlayerSeasonStat.fTA + gameStatline.fTA,
  //       oReb: existingPlayerSeasonStat.oReb + gameStatline.oReb,
  //       dReb: existingPlayerSeasonStat.dReb + gameStatline.dReb,
  //       assist: existingPlayerSeasonStat.assist + gameStatline.assist,
  //       block: existingPlayerSeasonStat.block + gameStatline.block,
  //       steal: existingPlayerSeasonStat.steal + gameStatline.steal,
  //       turnover: existingPlayerSeasonStat.turnover + gameStatline.turnover,
  //       pF: existingPlayerSeasonStat.pF + gameStatline.pF,
  //       totalRebounds: existingPlayerSeasonStat.totalRebounds + gameStatline.totalRebounds,
  //       points: existingPlayerSeasonStat.points + gameStatline.points,
  //     }
  //     seasonStats[seasonStats.indexOf(existingPlayerSeasonStat)] = updatedPlayerSeasonStat;
  //     return;
  //   })
  // })
  

  seasonData.forEach((game) => {
    teamTotals.twoPointFGMiss += game.gameStatlines.twoPointFGMiss;
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
  })
  
  return (
    <div className="seasonStatsContainer">


    </div>
  )
}

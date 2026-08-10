import type { Game } from "../../../../types/game";

type SeasonStatsDisplayProps = {
  seasonData: Game[];
};

//season and player stats, overall shots?
//get just playerStats from specific season or work out from these stats?


export default function SeasonStatsDisplay({ seasonData }: SeasonStatsDisplayProps) {
  if (!seasonData) return;

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

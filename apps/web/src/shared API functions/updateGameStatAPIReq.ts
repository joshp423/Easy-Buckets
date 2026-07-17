// type GameStatlineUpload = {
//   twoPointFGMiss: number;
//   twoPointFGMake: number;
//   twoPointFGA: number;
//   threePointFGMiss: number;
//   threePointFGMake: number;
//   threePointFGA: number;
//   fTMiss: number;
//   fTMake: number;
//   fTA: number;
//   oReb: number;
//   dReb: number;
//   assist: number;
//   block: number;
//   steal: number;
//   turnover: number;
//   pF: number;
//   twoPointFGPercent: number;
//   threePointFGPercent: number;
//   fTPercent: number;
//   totalRebounds: number;
//   points: number;
// }

type updateGameStatAPIProps = {
  gameStatlineId: number;
  // gameStatline: GameStatlineUpload;
  statlineUpdateField: string;
  statlineUpdateIndicator: boolean;
};

export async function updateGameStatAPIReq({
  gameStatlineId,
  statlineUpdateField,
  statlineUpdateIndicator,
}: updateGameStatAPIProps) {
  const rsp = await fetch("http://localhost:3000/games/gameStatlines/update", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "PUT",
    body: JSON.stringify({
      gameStatlineId,
      statlineUpdateField,
      statlineUpdateIndicator,
    }),
  });

  const data = await rsp.json();
  return data;
}

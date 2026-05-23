import { useEffect, useState } from "react";
import { type SeasonOverview } from "../../../../../types/seasonOverview";

type GameViewPagerProps = {
  setSelectedGame: React.Dispatch<React.SetStateAction<number>>
  selectedGame: number
  seasonData: SeasonOverview | null
}

export default function GameViewPager({ seasonData, stats }: GameViewPagerProps) {
  const [currentPage, setCurrentPage] = useState<number>(0)


  const currentGame = seasonData.games[currentPage]
  
  const canPageLeft = () => currentPage < 0 ?  true :  false
  const canPageRight = () => currentPage >= gameAmount ? false : true

  return (
    <div className="gameViewPager">
      {/* add icon */}
      <button onClick={() => { canPageLeft() && setCurrentPage(currentPage-1)}}>&lt;</button>
      <p>{selectedGame+1}</p>
      <GameStats game={currentGame, currentStats}
      <button onClick={() => { canPageRight() && setCurrentPage(currentPage+1)}}>right</button>
    </div>
  )
}










export function GameViewPage2r({ seasonData }: GameViewPagerProps) {
    const [currPage, setCurrPage] = useState<number>(0);
    const selectedGame = seasonData.games[currPage]

    const changePage = (action: "forward" | "backward") => {
        const nextPage = Math.min(currPage + 1, seasonData.games.length - 1)
        const prevPage = Math.max(currPage - 1, 0)

        setCurrPage(
            action === "forward"
            ? nextPage
            : prevPage
        );
};

  return (
    <div className="gameViewPager">
      {/* add icon */}
      <button onClick={(e) => {changePage("backward")}}>&lt;</button>
      <p>{selectedGame+1}</p>
      <GameStats game = {selectedGame}
      <button onClick={(e) => {changePage("forward")}}>&gt;</button>
    </div>
  )
}
import GameStats from "./GameStats/gameStats";
import { type Season } from "../../../../types/season";
import { useState } from "react";

type GameDisplayProps = {
  seasonData: Season | null
}

export default function GameDisplay({ seasonData }: GameDisplayProps) {
  
const [currentPage, setCurrentPage] = useState<number>(0)
const currentGame = seasonData.games[currentPage]
const gameAmount = seasonData.game.length();
  
const canPageLeft = () => currentPage < 0 ?  true :  false
const canPageRight = () => currentPage >= gameAmount ? false : true

  
  return (
    <div className="gameDisplay">
      <GameStats seasonData={seasonData} currentGame={currentGame}/>
      <div className="gameViewPager">
        {/* add icon */}
        <button onClick={() => { canPageLeft() && setCurrentPage(currentPage-1)}}>&lt;</button>
        <p>{currentPage+1}</p>
        <button onClick={() => { canPageRight() && setCurrentPage(currentPage+1)}}>right</button>
      </div>
    </div>
  ) 
}

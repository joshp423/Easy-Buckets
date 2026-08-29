import GameStats from "./GameStats/gameStats";
import { useState } from "react";
import type { Game } from "../../../../types/game";
import "./gameDisplay.css";
import NoGames from "../noGames";

type GameDisplayProps = {
  seasonData: Game[];
};

export default function GameDisplay({ seasonData }: GameDisplayProps) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const currentGame = seasonData?.[currentPage];
  const gameAmount = seasonData?.length || 0;

  const canPageLeft = () => (currentPage < 1 ? false : true);
  const canPageRight = () => (currentPage >= gameAmount - 1 ? false : true);

  if (!currentGame) return <NoGames />;

  return (
    <div className="gameDisplay">
      <GameStats currentGame={currentGame} />
      <div className="gameViewPager">
        {/* add icon + button disable */}
        <button
          onClick={() => canPageLeft() && setCurrentPage(currentPage - 1)}
          className={canPageLeft() ? "" : "disabled"}
        >
          &lt;
        </button>
        <p>Game {currentPage + 1}</p>
        <button
          onClick={() => canPageRight() && setCurrentPage(currentPage + 1)}
          className={canPageRight() ? "" : "disabled"}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

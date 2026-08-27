import { useNavigate } from "react-router";
import "./noGames.css";
export default function NoGames() {
    const navigate = useNavigate()
    return (
        <div className="noGamesContainer">
            <h3>No Games...</h3>
            <button
            onClick={() => {
                navigate("/score-game");
            }}
            >
            Create New Game?
            </button>
        </div>
    )
}
import { useNavigate } from "react-router";
import "./noSeasons.css";
export default function NoSeasons() {
  const navigate = useNavigate();
  return (
    <div className="noSeasonsContainer">
      <h3>No Seasons Yet For This Team</h3>
      <button
        onClick={() => {
          navigate("/team-seasons");
        }}
      >
        Create New Season?
      </button>
    </div>
  );
}

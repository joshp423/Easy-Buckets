import { useNavigate } from "react-router";
import "./loggedOutHP.css";

export default function LoggedOutHP() {
  const navigate = useNavigate();
  return (
    <div className="HpMain">
      <div className="hpTitle">
        <h1>Easy Buckets</h1>
      </div>
      <div>
        <div className="hpBlurb">
          <h1>
            Looking for an <i>easy</i> way to score your basketball games and
            view stats and other insights?
          </h1>
          <p> You're in the right place. </p>
          <div>
            <button
              onClick={() => {
                navigate("/sign-up");
              }}
            >
              Sign Up
            </button>
            <button
              onClick={() => {
                navigate("/log-in");
              }}
            >
              Log In
            </button>
          </div>
        </div>
        <div className="hpImage"></div>
      </div>
    </div>
  );
}

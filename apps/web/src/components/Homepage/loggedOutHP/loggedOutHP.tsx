import { Link } from "react-router";
import "./loggedOutHP.css"

export default function LoggedOutHP() {
  return (
    <div className="HpMain">
      <div className="hpTitle"><h1>Easy Buckets</h1></div>
      <div className="hpBlurb">
        <h1>
        Looking for an <i>easy</i> way to score your basketball teams' games and
        view stats and other insights?
        </h1>
        <p> Youre in the right place. </p>
        <div>
          <Link to={"/sign-up"}>Sign Up</Link>
        <Link to={"/log-in"}>Log In</Link>
        </div>
      </div>
    </div>
  );
}

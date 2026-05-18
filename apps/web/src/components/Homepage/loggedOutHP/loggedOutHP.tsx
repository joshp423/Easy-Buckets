import { Link } from "react-router"

export default function LoggedOutHP() {
    return(
        <div className="HpMain">
            <h1>Easy Buckets</h1>
            <h1>
                Looking for an <i>easy</i> way to score your basketball teams' games and
                view stats and other insights?
            </h1>
            <p> Youre in the right place. </p>
            <Link to={"/sign-up"}>Sign Up</Link>
            <Link to={"/log-in"}>Log In</Link>
        </div>
    )
}
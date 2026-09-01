import { Link } from "react-router";
import NavLinks from "./NavLinks/navLinks";
import logOut from "./logOut";
import { useOutletContext } from "react-router-dom";
import { faBasketball, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./sideNav.css";

type sideNavProps = {
  setLoginStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SideNav() {
  const { setLoginStatus } = useOutletContext<sideNavProps>();

  return (
    <div className="sideNav">
      <Link to="/">
        <div><FontAwesomeIcon icon={faBasketball} /><p>Easy Buckets</p></div>
      </Link>
      <div className="navLinks">
        <NavLinks />
      </div>
      <div className="sideNavSpace"></div>
      <button type="button" onClick={() => logOut({ setLoginStatus })}>
        <FontAwesomeIcon icon={faPowerOff} />
        <p>Sign Out</p>
      </button>
    </div>
  );
}

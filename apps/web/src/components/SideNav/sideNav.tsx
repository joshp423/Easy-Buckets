import { Link } from "react-router";
import NavLinks from "./NavLinks/navLinks";
import logOut from "./logOut";
import { useOutletContext } from "react-router-dom";
import "./sideNav.css";

type sideNavProps = {
  setLoginStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SideNav() {
  const { setLoginStatus } = useOutletContext<sideNavProps>();

  return (
    <div className="sideNav">
      <Link to="/">
        <div>Easy Buckets</div>
      </Link>
      <div className="navLinks">
        <NavLinks />
      </div>
      <div className="sideNavSpace"></div>
      {/* Pass function reference */}
      <button type="button" onClick={() => logOut({ setLoginStatus })}>
        <div>Sign Out</div>
      </button>
    </div>
  );
}

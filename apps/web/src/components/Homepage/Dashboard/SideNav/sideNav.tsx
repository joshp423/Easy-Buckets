import { Link } from "react-router";
import NavLinks from "./NavLinks/navLinks";
import logOut from "./logOut";
import { useOutletContext } from "react-router-dom";

type sideNavProps = {
    setLoginStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SideNav() {

  const { setLoginStatus } = useOutletContext<sideNavProps>();

  return (
    <div className="sideNav">
      <Link to="/">
        <div>EasyBuckets</div>
      </Link>
      <div>
        <NavLinks />
      </div>
      {/* Pass function reference */}
      <button type="button" onClick={() => logOut({setLoginStatus})}> 
        <div>Sign Out</div>
      </button>
    </div>
  );
}

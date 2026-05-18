import { Link } from "react-router";
import NavLinks from "./NavLinks/navLinks";

export default function SideNav() {
  return (
    <div className="sideNav">
      <Link to="/">
        <div>EasyBuckets</div>
      </Link>
      <div>
        <NavLinks />
      </div>
    </div>
  );
}

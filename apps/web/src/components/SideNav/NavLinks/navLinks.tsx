import { Link, useLocation } from "react-router";
import "./navLinks.css";
import {
  faChartSimple,
  faClipboard,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const links = [
  { name: "Stats", href: "/", icon: faChartSimple },
  { name: "Game Scoring", href: "/score-game", icon: faClipboard },
  { name: "Team & Seasons", href: "/team-seasons", icon: faBookOpen },
];

export default function NavLinks() {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <>
      {links.map(({ href, name, icon }) => {
        // const icon = link.icon;
        return (
          <Link
            to={href}
            style={{
              backgroundColor: pathName === href ? "#e37204" : "#f3f5f8",
              color: pathName === href ? "white" : "black",
            }}
            key={name}
          >
            <FontAwesomeIcon icon={icon} />
            <p>{name}</p>
          </Link>
        );
      })}
    </>
  );
}

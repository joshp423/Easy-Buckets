import { Link, useLocation } from "react-router";
import "./navLinks.css"
//add icons

const links = [
  { name: "Stats", href: "/" },
  { name: "Game Scoring", href: "/new-game" },
  { name: "Team", href: "/team" },
];

export default function NavLinks() {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <>
      {links.map(({ href, name }) => {
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
            <p>{name}</p>
          </Link>
        );
      })}
    </>
  );
}

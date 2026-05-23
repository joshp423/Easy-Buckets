import { Link, useLocation } from "react-router";

//add icons

const links = [
  { name: "Stats", href: "/" },
  { name: "Game Scoring", href: "/new-game" },
  { name: "Team", href: "/team" },
];

export default function NavLinks() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      {links.map(({ href, name }) => {
        // const icon = link.icon;
        return (
          <Link
            to={href}
            style={{
              backgroundColor: pathname === href ? "blue" : "white",
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

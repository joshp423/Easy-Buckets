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
      {links.map((link) => {
        // const icon = link.icon;
        return (
          <Link
            to={link.href}
            style={{
              backgroundColor: pathname === link.href ? "blue" : "white",
            }}
          >
            <p>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

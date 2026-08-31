import App from "./App";
import Homepage from "./components/Homepage/homePage";
import SignUp from "./components/SignUp/signUp";
import LogIn from "./components/Login/logIn";
import GameScoring from "./components/GameScoring/gameScoring";
import TeamSeasons from "./components/TeamSeasons/teamSeasons";
import ErrorPage from "./components/ErrorPage/errorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "/sign-up", element: <SignUp /> },
      { path: "/log-in", element: <LogIn /> },
      { path: "/score-game", element: <GameScoring /> },
      { path: "/team-seasons", element: <TeamSeasons /> },
      { path: "/error", element: <ErrorPage />}
    ],
  },
];

export default routes;

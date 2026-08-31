import { useOutletContext } from "react-router-dom";
import LoggedOutHP from "./loggedOutHP/loggedOutHP";
import Dashboard from "./Dashboard/dashboard";

type homepageProps = {
  loginStatus: boolean;
};

export default function Homepage() {
  const { loginStatus } = useOutletContext<homepageProps>();

  if (loginStatus) {
    return <Dashboard />;
  }

  return <LoggedOutHP />;
}

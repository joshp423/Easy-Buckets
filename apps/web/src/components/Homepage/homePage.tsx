import { useOutletContext } from "react-router-dom";
import LoggedOutHP from "./loggedOutHP/loggedOutHP";
// import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard/dashboard";

type homepageProps = {
  loginStatus: boolean;
};

export default function Homepage() {
  const { loginStatus } = useOutletContext<homepageProps>();
  // const navigate = useNavigate();

  if (loginStatus) {
    return (
      <Dashboard />
    )
  }

  return <LoggedOutHP />;
}

import { useOutletContext } from "react-router-dom";
import LoggedOutHP from "./loggedOutHP/loggedOutHP";
// import { useNavigate } from "react-router-dom";

type homepageProps = {
  loginStatus: boolean;
};

export default function Homepage() {

  const { loginStatus } = useOutletContext<homepageProps>();
  // const navigate = useNavigate();

  if (loginStatus) {
    return(
      <>
      </>
    )
  }

  return <LoggedOutHP />
}

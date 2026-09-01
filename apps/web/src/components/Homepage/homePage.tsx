import { useOutletContext } from "react-router-dom";
import LoggedOutHP from "./loggedOutHP/loggedOutHP";
import Dashboard from "./Dashboard/dashboard";
import { useEffect } from "react";
import { useState } from "react";
import userTeamCheckAPIReq from "./userTeamCheckAPIReq";
import TeamCreation from "./TeamCreation/teamCreation";
import LoadingBall from "../../assets/LoadingBall/loadingball";
import { useNavigate } from "react-router-dom";

type homepageProps = {
  loginStatus: boolean;
};

export default function Homepage() {
  const { loginStatus } = useOutletContext<homepageProps>();
  const [teamCheck, setTeamCheck] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const existingTeam = await userTeamCheckAPIReq();
        if (existingTeam) setTeamCheck(true);
      } catch {
        navigate("/error", {
          state: {
            error: "An unexpected error occured, please try again later",
          },
        });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [navigate]);

  if (loginStatus) {

    if (loading) return (
      <div>
        <LoadingBall />
      </div>
    )
    return (
      <>
        {teamCheck ? (
          <Dashboard />
        ) : (
          <div>
            <TeamCreation setTeamCheck={setTeamCheck} />
          </div>
        )}
      </>
    );
  }

  return <LoggedOutHP />;
}

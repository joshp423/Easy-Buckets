import { useOutletContext } from "react-router-dom";
import LoggedOutHP from "./loggedOutHP/loggedOutHP";
import Dashboard from "./Dashboard/dashboard";
import { useEffect } from "react";
import { useState } from "react";
import userTeamCheckAPIReq from "./userTeamCheckAPIReq";
import TeamCreation from "./TeamCreation/teamCreation";

type homepageProps = {
  loginStatus: boolean;
};

export default function Homepage() {
  const { loginStatus } = useOutletContext<homepageProps>();
  const [teamCheck, setTeamCheck] = useState<boolean>(false);

  useEffect(() => {
    async function load() {
      const existingTeam = await userTeamCheckAPIReq();
      if (existingTeam) setTeamCheck(true);
    }
    load();
  }, []);

  if (loginStatus) {
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

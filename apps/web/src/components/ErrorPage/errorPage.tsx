import { useLocation } from "react-router-dom";
import "./errorPage.css";
import SideNav from "../SideNav/sideNav";

type errorPageState = {
  error: string;
};

function ErrorPage() {
  const location = useLocation();
  const error = location.state as errorPageState | null;

  return (
    <div className="errorPage">
      <SideNav />
      <div>
        <h1>Something went wrong</h1>
        <h3>{error?.error}</h3>
      </div>
    </div>
  );
}

export default ErrorPage;

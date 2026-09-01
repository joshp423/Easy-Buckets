import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logInAPI } from "./logInAPI";
import { useOutletContext } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./logIn.css";
import LoadingBall from "../../assets/LoadingBall/loadingball";
import { faEnvelope, faKey, faBasketball } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type logInProps = {
  loginStatus: boolean;
  setLoginStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LogIn() {
  const navigate = useNavigate();
  const { loginStatus, setLoginStatus } = useOutletContext<logInProps>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean>(false);

  if (loginStatus) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="logInContainer">
      <div className="logIn">
        <div className="logInTitle">
          <FontAwesomeIcon icon={faBasketball} />
          <h1
            onClick={() => {
              navigate("/");
            }}
          >
            Easy Buckets
          </h1>
        </div>
        <form
          onSubmit={(e) => {
            setLoading(true);
            logInAPI({
              e,
              setLoginStatus,
              setLoading,
              setErrors,
              email,
              password,
              navigate,
              setSuccess
            });
          }}
        >
          <div className="logInForm">
            <h1>Please log in to continue</h1>
            <div className="errorHandling">
              {errors?.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </div>
            <label htmlFor="username">Email: </label>
            <div className="logInFormInput">
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                name="email"
                type="text"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <label htmlFor="username"> Password: </label>

            <div className="logInFormInput">
              <FontAwesomeIcon icon={faKey} />
              <input
                name="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" style={success ? {"backgroundColor": "green"} : {}}>
              <div>{loading ? <LoadingBall /> : <p>Log In</p>}</div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

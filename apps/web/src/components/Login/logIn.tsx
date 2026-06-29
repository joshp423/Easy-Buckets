import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logInAPI } from "./logInAPI";
import { useOutletContext } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./logIn.css";

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

  if (loginStatus) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="logInContainer">
      <div className="logIn">
        <div className="logInTitle">
          <h1>Easy Buckets</h1>
        </div>
        <form
          onSubmit={(e) =>
            logInAPI({
              e,
              setLoginStatus,
              setLoading,
              setErrors,
              email,
              password,
              navigate,
            })
          }
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
              <input
                name="email"
                type="text"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <label htmlFor="username"> Password: </label>
            {/* add icons to inputs and button */}
            <div className="logInFormInput">
              <input
                name="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">
              <div style={{ display: loading === true ? "none" : "flex" }}>
                <p>Log In</p>
              </div>{" "}
              <div
                style={{ display: loading === true ? "flex" : "none" }}
              ></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

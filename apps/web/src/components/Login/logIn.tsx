import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logInAPI } from "./logInAPI";
import { useOutletContext } from "react-router-dom";
import { Navigate } from "react-router-dom";

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
    <div className="logIn">
      <div className="LogInTitle">
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
        <div className="signUpForm">
          <div className="errorHandling">
            {errors?.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </div>
          <h1>Please log in to continue</h1>
          <label htmlFor="username">Email: </label>
          <input
            name="email"
            type="text"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="username"> Password: </label>
          <input
            name="password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">
            <div style={{ display: loading === true ? "none" : "flex" }}>
              Log In
            </div>{" "}
            <div style={{ display: loading === true ? "flex" : "none" }}></div>
          </button>
        </div>
      </form>
    </div>
  );
}

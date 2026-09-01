import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpAPI } from "./signUpAPI";
import "./signUp.css";
import LoadingBall from "../../assets/LoadingBall/loadingball";
import { faEnvelope, faKey, faBasketball } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean>(false);

  return (
    <div className="signUpContainer">
      <div className="signUp">
        <div className="signUpTitle">
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
          onSubmit={(e) =>
            signUpAPI({ e, setLoading, setErrors, email, password, navigate, setSuccess })
          }
        >
          <div className="signUpForm">
            <div className="errorHandling">
              {errors?.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </div>
            <h1>Sign Up</h1>
            <label htmlFor="email">Email: </label>
            <div className="signUpFormInput">
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                name="email"
                id="email"
                type="text"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <label htmlFor="password"> Password: </label>
            <div className="signUpFormInput">
              <FontAwesomeIcon icon={faKey} />
              <input
                name="password"
                id="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">
              <div style={success ? {"backgroundColor": "green"} : {}}>{loading ? <LoadingBall /> : <p>Submit</p>}</div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

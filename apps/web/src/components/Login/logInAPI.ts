import { type SyntheticEvent } from "react";
import { type NavigateFunction } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { type JwtPayload } from "../../types/jwtPayload";

type LogInAPIProps = {
  e: SyntheticEvent<HTMLFormElement>;
  setLoginStatus: (status: boolean) => void;
  setLoading: (status: boolean) => void;
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
  email: string;
  password: string;
  navigate: NavigateFunction;
};

export async function logInAPI({
  e,
  setLoginStatus,
  setLoading,
  setErrors,
  email,
  password,
  navigate,
}: LogInAPIProps) {
  e.preventDefault();
  setLoading(true);

  const rsp = await fetch("http://localhost:3000/users/log-in", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await rsp.json();

  switch (rsp.status) {
    case 200: {
      const decoded = jwtDecode<JwtPayload>(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("loggedUserId", String(decoded.id));
      setLoginStatus(true);
      navigate("/");
      break;
    }

    case 400:
    case 403:
    case 500:
      setErrors(["Incorrect email or password"]);
      break;
  }
  setLoading(false);
}

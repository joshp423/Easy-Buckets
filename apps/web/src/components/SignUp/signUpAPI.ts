import { type SyntheticEvent } from "react";
import { type NavigateFunction } from "react-router-dom";
import { API_URL } from "../../config/api";

type signUpAPIProps = {
  e: SyntheticEvent<HTMLFormElement>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
  email: string;
  password: string;
  navigate: NavigateFunction;
};

export async function signUpAPI({
  e,
  setLoading,
  setErrors,
  email,
  password,
  navigate,
}: signUpAPIProps) {
  e.preventDefault();
  setLoading(true);

  const rsp = await fetch(`${API_URL}/users/sign-up`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (rsp.status !== 201) {
    const data = await rsp.json();
    switch (rsp.status) {
      case 400:
        setErrors(data.errors || []);
        setLoading(false);
        break;

      case 403:
        setErrors(["Email already exists"]);
        setLoading(false);
        break;
    }
    return;
  }
  setLoading(false);
  navigate("/");
}

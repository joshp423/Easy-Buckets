import "./App.css";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const App = () => {
  const [loginStatus, setLoginStatus] = useState<boolean>(() =>
    Boolean(localStorage.getItem("token")),
  );
  return (
    <>
      <Outlet
        context={{ loginStatus: loginStatus, setLoginStatus: setLoginStatus }}
      />
    </>
  );
};

export default App;

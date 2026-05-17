import App from "./App";
import Homepage from "./components/HomePage/homePage"
import SignUp from "./components/SignUp/signUp";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "/log-in", element: <SignUp /> },
    ],
  },
];

export default routes;
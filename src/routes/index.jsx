import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
import Feed from "../pages/User/Feed";
import Home from "../pages/User/Home";
import UserPage from "../pages/User/UserPage";
import UserRoot from "../pages/User/UserRoot";

export const ROUTES = [
  {
    path: "/",
    element: <UserRoot />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "feed",
        element: <Feed />,
      },
      {
        path: "userPage",
        element: <UserPage />,
      },
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
];
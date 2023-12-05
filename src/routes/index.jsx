import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
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
    ],
  },
];
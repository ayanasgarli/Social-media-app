import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
import Feed from "../pages/User/Feed";
import Home from "../pages/User/Home";
import UserPage from "../pages/User/UserPage";
import UserRoot from "../pages/User/UserRoot";
import UserDetails from "../pages/User/UserDetails";

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
      {
        path: "/details/:id",
        element: <UserDetails />,
      },
    ],
  },
];
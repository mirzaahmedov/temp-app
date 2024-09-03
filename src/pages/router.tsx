import { createBrowserRouter } from "react-router-dom";

import Home from "./Home/page";
import Signin from "./Signin/page";
import AuthGuard from "@/features/auth/guard";
import Organization from "./Organization/page";
import OrganizationUsers from "./Organization/Users/page";

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "*",
    element: <AuthGuard />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "org",
        element: <Organization />,
      },
      {
        path: "org/users",
        element: <OrganizationUsers />,
      },
    ],
  },
]);

export default router;

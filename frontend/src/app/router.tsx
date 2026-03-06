import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/RootLayout.tsx";
import HomePage from "../pages/HomePage.tsx";
import UserModal from "../pages/UserModal.tsx";
import ErrorPage from "../pages/404.tsx";
import PublicOnlyRoute from "../features/auth/guards/PublicOnlyRoute.tsx";
import UrlModal from "../pages/UrlModal.tsx";

export default createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        children: [
          {
            path: "auth",
            element: <PublicOnlyRoute />,
            children: [
              {
                path: "signup",
                element: <UserModal formType="signup" />,
              },
              {
                path: "login",
                element: <UserModal formType="login" />,
              },
            ],
          },
          {
            path: "edit",
            element: <UrlModal  />

          }
        ],
      },
      {
        path: "/404",
        element: <ErrorPage />,
      },
    ],
  },
]);

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { PublicRoutes } from "./PublicRoutes";
import { AdminRoutes } from "./AdminRoutes";
import AdminLayout from "../layouts/AdminLayout";
import NotFoundPage from "../pages/errors/NotFoundPage";
import ErrorPage from "../pages/errors/ErrorPage";


export const routerConfig = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      ...PublicRoutes,
    ],
    errorElement: <ErrorPage />,
  },
  {
    element: <AdminLayout />,
    children: [
      ...AdminRoutes,
    ],
    errorElement: <ErrorPage />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        element: <NotFoundPage />,
        path: "*" 
      }
    ],
  },
]);
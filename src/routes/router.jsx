import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AddService from "../pages/AddService";
import AllServices from "../pages/AllServices";
import ServiceDetails from "../pages/ServiceDetails";
import ManageServices from "../pages/ManageServices";
import UpdateService from "../pages/UpdateService";
import BookedServices from "../pages/BookedServices";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../pages/NotFound";
import ServiceToDo from "../pages/ServiceToDo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/add-service",
        element: (
          <PrivateRoute>
            <AddService />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-services",
        element: <AllServices />,
        loader: () =>
          fetch("https://home-repaire-bakcend.vercel.app/service-count"),
      },
      {
        path: "/services/:id",
        element: (
          <PrivateRoute>
            <ServiceDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://home-repaire-bakcend.vercel.app/services/${params.id}`
          ),
      },
      {
        path: "/update-service/:id",
        element: <UpdateService />,
      },
      {
        path: "/manage-services",
        element: (
          <PrivateRoute>
            <ManageServices />
          </PrivateRoute>
        ),
      },
      {
        path: "/booked-services",
        element: (
          <PrivateRoute>
            <BookedServices />
          </PrivateRoute>
        ),
      },
      {
        path: "/service-to-do",
        element: (
          <PrivateRoute>
            <ServiceToDo />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Component imports
import ErrorPage from "./routes/error/ErrorPage";
import LoginPage from "./routes/login/LoginPage";
import Dashboard from "./routes/dashboard/Dashboard";
import ClassPage from "./routes/class/ClassPage";
import AssignmentView from "./routes/assignment/AssignmentView";
import UserPage from "./routes/user/UserPage";

import "./assets/styles/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/class/:class_id",
    element: <ClassPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/assignment/:assign_id",
    element: <AssignmentView />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user/:user_id",
    element: <UserPage />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

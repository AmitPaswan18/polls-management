import React from "react";
import ReactDOM from "react-dom/client";
import Registrationform from "./components/auth/Registrationform.jsx";
import LoginForm from "./components/auth/LoginForm.jsx";
import DashBoard from "./pages/Dashboard.jsx";
import { Provider } from "react-redux";
// import AllPolls from "./components/AllPolls.jsx";
import store from "./redux/store/store.js";
import { initialState } from "./redux/Slices/authSlice.js";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/signup",
    element: <Registrationform />,
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

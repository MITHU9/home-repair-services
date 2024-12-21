import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";
import ServiceContextProvider from "./context/Context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ServiceContextProvider>
      <RouterProvider router={router} />
    </ServiceContextProvider>
  </StrictMode>
);

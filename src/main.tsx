import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout/index.tsx";
import "./index.css";
import App from "./pages/App.tsx";
import FeedBack from "./pages/feedback/index.tsx";
import Changelog from "./pages/changelog/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/changelog",
        element: <Changelog />,
      },
      {
        path: "/feedback",
        element: <FeedBack />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);

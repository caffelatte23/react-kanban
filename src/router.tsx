import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Board";
import ListView from "./pages/List";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/list",
      element: <ListView />,
    },
  ],
  { basename: "/" }
);

const RouterView: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default RouterView;

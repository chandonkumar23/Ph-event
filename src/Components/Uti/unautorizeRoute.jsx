import { createBrowserRouter } from "react-router-dom";
import Unauthorized from "../pages/Unauthorized";
import Events from "../Events/Events";
import AddEvent from "../AddEvent/AddEvent";
import MyEvent from "../MyEvent/MyEvent";
import Home from "../Hero/Home";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/unauthorized", element: <Unauthorized /> },

  {
    path: "/events",
    element: <Events />,
    loader: requireAuth,
  },
  {
    path: "/addEvent",
    element: <AddEvent />,
    loader: requireAuth,
  },
  {
    path: "/myEvent",
    element: <MyEvent />,
    loader: requireAuth,
  },
]);

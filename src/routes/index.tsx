import { Home, Messaging } from "../components";

const homeRoute = {
  path: "/",
  element: <Home />,
};

const messagingRoute = {
  path: "/messaging",
  element: <Messaging />,
};

const routes = [homeRoute, messagingRoute];

export default routes;

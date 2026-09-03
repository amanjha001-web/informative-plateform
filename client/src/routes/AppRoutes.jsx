import { useRoutes } from "react-router-dom";

import PublicRoutes from "./PublicRoutes";

const AppRoutes = () => {
  const routes = useRoutes([PublicRoutes]);

  return routes;
};

export default AppRoutes;

import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Loader from "../components/common/Loader";

const AuthRoutes = lazy(() => import("./AuthRoutes"));
const AdminRoutes = lazy(() => import("./AdminRoutes"));

const RouteLoader = () => {
  return (
    <div className="route-loader">
      <Loader />
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        <Route path="/auth/*" element={<AuthRoutes />} />

        <Route path="/admin/*" element={<AdminRoutes />} />

        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

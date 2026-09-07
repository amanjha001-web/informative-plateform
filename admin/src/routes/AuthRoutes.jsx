import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Loader from "../components/common/Loader";

const Login = lazy(() => import("../pages/auth/Login"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"));

const AuthRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="route-loader">
          <Loader />
        </div>
      }
    >
      <Routes>
        <Route path="login" element={<Login />} />

        <Route path="forgot-password" element={<ForgotPassword />} />

        <Route path="reset-password" element={<ResetPassword />} />

        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AuthRoutes;

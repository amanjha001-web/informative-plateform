import { useState } from "react";

import AuthLayout from "../../layouts/AuthLayout";
import AuthHeader from "../../components/auth/AuthHeader";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleLogin = async (values) => {
    setServerError("");
    setLoading(true);

    try {
      /*
       * Backend integration:
       *
       * const response = await authService.login(values);
       *
       * After successful authentication:
       * navigate("/admin/dashboard");
       */

      console.log("Login:", values);
    } catch (error) {
      setServerError(error?.message || "Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeader
        title="Welcome Back"
        description="Sign in to access your admin dashboard."
      />

      <LoginForm
        onSubmit={handleLogin}
        loading={loading}
        serverError={serverError}
      />
    </AuthLayout>
  );
};

export default Login;

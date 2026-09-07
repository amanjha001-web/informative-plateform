import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";

import AuthLayout from "../../layouts/AuthLayout";
import AuthHeader from "../../components/auth/AuthHeader";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Email is required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      /*
       * Backend integration:
       *
       * await authService.forgotPassword({
       *   email: trimmedEmail,
       * });
       */

      setSuccess(
        "If an account exists with this email, a password reset link has been sent.",
      );
    } catch (error) {
      setError(
        error?.message || "Unable to process your request. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeader
        title="Forgot Password?"
        description="Enter your email address and we'll send you a password reset link."
      />

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {error && (
          <div className="auth-form__error" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="auth-form__success" role="status">
            {success}
          </div>
        )}

        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setError("");
            setSuccess("");
          }}
          error={error}
          icon={Mail}
          autoComplete="email"
          required
        />

        <Button type="submit" fullWidth loading={loading}>
          Send Reset Link
        </Button>

        <Link to="/auth/login" className="auth-form__back-link">
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Back to Login</span>
        </Link>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;

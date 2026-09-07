import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";
import AuthHeader from "../../components/auth/AuthHeader";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setServerError("");
    setSuccess("");
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.password) {
      nextErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setServerError("");
    setSuccess("");

    if (!token) {
      setServerError("Invalid or missing password reset token.");
      return;
    }

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      /*
       * Backend integration:
       *
       * await authService.resetPassword({
       *   token,
       *   password: formData.password,
       * });
       */

      setSuccess(
        "Your password has been reset successfully. You can now sign in.",
      );

      setFormData({
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      setServerError(
        error?.message || "Unable to reset your password. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeader
        title="Reset Password"
        description="Create a new secure password for your account."
      />

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {serverError && (
          <div className="auth-form__error" role="alert">
            {serverError}
          </div>
        )}

        {success && (
          <div className="auth-form__success" role="status">
            {success}
          </div>
        )}

        <div className="auth-form__password">
          <Input
            label="New Password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            icon={Lock}
            autoComplete="new-password"
            required
          />

          <button
            type="button"
            className="auth-form__password-toggle"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff size={18} aria-hidden="true" />
            ) : (
              <Eye size={18} aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="auth-form__password">
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            icon={Lock}
            autoComplete="new-password"
            required
          />

          <button
            type="button"
            className="auth-form__password-toggle"
            onClick={() => setShowConfirmPassword((current) => !current)}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? (
              <EyeOff size={18} aria-hidden="true" />
            ) : (
              <Eye size={18} aria-hidden="true" />
            )}
          </button>
        </div>

        <p className="auth-form__hint">
          Password must contain at least 8 characters.
        </p>

        <Button
          type="submit"
          fullWidth
          loading={loading}
          disabled={Boolean(success)}
        >
          Reset Password
        </Button>

        <Link to="/auth/login" className="auth-form__back-link">
          Back to Login
        </Link>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;

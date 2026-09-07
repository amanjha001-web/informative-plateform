import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "../common/Button";
import Input from "../common/Input";

const DEFAULT_VALUES = {
  email: "",
  password: "",
  rememberMe: false,
};

const LoginForm = ({ onSubmit, loading = false, serverError = "" }) => {
  const [formData, setFormData] = useState(DEFAULT_VALUES);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!formData.password) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit?.(formData);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      {serverError && (
        <div className="auth-form__error" role="alert">
          {serverError}
        </div>
      )}

      <Input
        label="Email Address"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        icon={Mail}
        autoComplete="email"
        required
      />

      <div className="login-form__password">
        <Input
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          icon={Lock}
          autoComplete="current-password"
          required
        />

        <button
          type="button"
          className="login-form__password-toggle"
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

      <div className="login-form__options">
        <label className="login-form__remember">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
          />

          <span>Remember me</span>
        </label>

        <Link to="/auth/forgot-password" className="login-form__forgot">
          Forgot password?
        </Link>
      </div>

      <Button type="submit" fullWidth loading={loading}>
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;

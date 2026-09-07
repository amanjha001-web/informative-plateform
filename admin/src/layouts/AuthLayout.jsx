
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

const AuthLayout = ({
  children,
  title = "Welcome Back",
  description = "",
  showBrand = true,
}) => {
  return (
    <div className="auth-layout">
      <div className="auth-layout__container">
        {showBrand && (
          <div className="auth-layout__brand">
            <Link
              to="/auth/login"
              className="auth-layout__brand-link"
              aria-label="Go to login"
            >
              <span className="auth-layout__brand-icon">
                <ShieldCheck
                  size={22}
                  aria-hidden="true"
                />
              </span>

              <span className="auth-layout__brand-name">
                Admin Panel
              </span>
            </Link>
          </div>
        )}

        <main className="auth-layout__main">
          {(title || description) && (
            <div className="auth-layout__header">
              {title && (
                <h1 className="auth-layout__title">
                  {title}
                </h1>
              )}

              {description && (
                <p className="auth-layout__description">
                  {description}
                </p>
              )}
            </div>
          )}

          <div className="auth-layout__content">
            {children}
          </div>
        </main>

        <footer className="auth-layout__footer">
          <p>
            © {new Date().getFullYear()} Admin Panel. All
            rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AuthLayout;

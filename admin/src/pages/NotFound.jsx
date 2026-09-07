
import { Link } from "react-router-dom";
import { ArrowLeft, Home, SearchX } from "lucide-react";

const NotFound = () => {
  return (
    <section className="not-found-page">
      <div className="not-found-page__content">
        <div className="not-found-page__icon">
          <SearchX size={36} aria-hidden="true" />
        </div>

        <span className="not-found-page__code">
          404
        </span>

        <h1 className="not-found-page__title">
          Page Not Found
        </h1>

        <p className="not-found-page__description">
          The page you are looking for doesn't exist, has been
          moved, or you don't have access to it.
        </p>

        <div className="not-found-page__actions">
          <Link
            to="/admin/dashboard"
            className="not-found-page__button not-found-page__button--primary"
          >
            <Home size={17} aria-hidden="true" />
            Go to Dashboard
          </Link>

          <button
            type="button"
            className="not-found-page__button not-found-page__button--secondary"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={17} aria-hidden="true" />
            Go Back
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;




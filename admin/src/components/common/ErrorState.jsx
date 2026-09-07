
import { AlertCircle, RefreshCw } from "lucide-react";
import Button from "./Button";

const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn't load this data. Please try again.",
  retryText = "Try Again",
  onRetry,
  className = "",
}) => {
  const errorClassName = [
    "error-state",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={errorClassName} role="alert">
      <div className="error-state__icon">
        <AlertCircle size={28} aria-hidden="true" />
      </div>

      <div className="error-state__content">
        <h3 className="error-state__title">
          {title}
        </h3>

        <p className="error-state__message">
          {message}
        </p>

        {onRetry && (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            icon={<RefreshCw size={15} />}
            onClick={onRetry}
          >
            {retryText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;

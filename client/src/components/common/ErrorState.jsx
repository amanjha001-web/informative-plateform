import { AlertCircle, RefreshCw } from "lucide-react";

const ErrorState = ({
  title = "Something went wrong",
  description = "We couldn't load this content. Please try again.",
  onRetry,
  retryText = "Try Again",
  icon: Icon = AlertCircle,
  className = "",
}) => {
  return (
    <div
      className={[
        "flex min-h-[280px] w-full flex-col items-center justify-center",
        "rounded-xl border border-dashed",
        "border-[rgb(var(--border))]",
        "bg-[rgb(var(--card))]",
        "px-6 py-10 text-center",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="alert"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[rgb(var(--danger))]/10">
        <Icon
          size={26}
          strokeWidth={1.8}
          className="text-[rgb(var(--danger))]"
          aria-hidden="true"
        />
      </div>

      <h3 className="text-lg font-semibold text-[rgb(var(--foreground))]">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-[rgb(var(--muted-foreground))]">
        {description}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[rgb(var(--primary))] px-4 text-sm font-medium text-[rgb(var(--primary-foreground))] transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))] focus-visible:ring-offset-2"
        >
          <RefreshCw size={16} aria-hidden="true" />
          {retryText}
        </button>
      )}
    </div>
  );
};

export default ErrorState;

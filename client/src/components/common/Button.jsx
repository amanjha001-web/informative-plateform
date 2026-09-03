import Loader from "./Loader";

const VARIANTS = {
  primary:
    "bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:opacity-90",

  secondary:
    "bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:opacity-80",

  outline:
    "border border-[rgb(var(--border))] bg-transparent text-[rgb(var(--foreground))] hover:bg-[rgb(var(--secondary))]",

  ghost:
    "bg-transparent text-[rgb(var(--foreground))] hover:bg-[rgb(var(--secondary))]",

  danger: "bg-[rgb(var(--danger))] text-white hover:opacity-90",
};

const SIZES = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  className = "",
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center gap-2",
        "rounded-lg font-medium",
        "transition-all duration-200",
        "focus:outline-none focus-visible:ring-2",
        "focus-visible:ring-[rgb(var(--primary))]",
        "focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        VARIANTS[variant] || VARIANTS.primary,
        SIZES[size] || SIZES.md,
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {loading && <Loader size="sm" />}
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default Button;

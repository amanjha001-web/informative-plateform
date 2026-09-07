import { Loader2 } from "lucide-react";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  icon: Icon,
  onClick,
  className = "",
}) => {
  const classes = [
    "ui-button",
    `ui-button--${variant}`,
    `ui-button--${size}`,
    fullWidth ? "ui-button--full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <Loader2 className="ui-button__spinner" size={18} />
      ) : (
        Icon && <Icon size={18} />
      )}

      <span>{children}</span>
    </button>
  );
};

export default Button;

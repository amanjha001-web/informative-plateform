const VARIANTS = {
  default: "bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))]",

  primary: "bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]",

  success: "bg-[rgb(var(--success))]/10 text-[rgb(var(--success))]",

  warning: "bg-[rgb(var(--warning))]/10 text-[rgb(var(--warning))]",

  danger: "bg-[rgb(var(--danger))]/10 text-[rgb(var(--danger))]",

  outline:
    "border border-[rgb(var(--border))] bg-transparent text-[rgb(var(--foreground))]",
};

const SIZES = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
  lg: "px-3 py-1.5 text-sm",
};

const Badge = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) => {
  return (
    <span
      className={[
        "inline-flex items-center justify-center",
        "w-fit rounded-full font-medium",
        "whitespace-nowrap",
        VARIANTS[variant] || VARIANTS.default,
        SIZES[size] || SIZES.md,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;

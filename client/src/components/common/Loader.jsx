import { LoaderCircle } from "lucide-react";

const SIZES = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 28,
  xl: 36,
};

const Loader = ({ size = "md", label = "", className = "", ...props }) => {
  const iconSize = SIZES[size] || SIZES.md;

  return (
    <span
      className={[
        "inline-flex items-center justify-center",
        "text-[rgb(var(--primary))]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="status"
      aria-label={label || "Loading"}
      {...props}
    >
      <LoaderCircle
        size={iconSize}
        strokeWidth={2}
        className="animate-spin"
        aria-hidden="true"
      />

      {label && (
        <span className="ml-2 text-sm text-[rgb(var(--muted-foreground))]">
          {label}
        </span>
      )}
    </span>
  );
};

export default Loader;

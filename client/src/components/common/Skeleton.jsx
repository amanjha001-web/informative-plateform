const VARIANTS = {
  text: "rounded-md",
  circular: "rounded-full",
  rectangular: "rounded-lg",
};

const Skeleton = ({
  width = "w-full",
  height = "h-4",
  variant = "text",
  className = "",
  ...props
}) => {
  return (
    <div
      aria-hidden="true"
      className={[
        "animate-pulse",
        "bg-[rgb(var(--secondary))]",
        width,
        height,
        VARIANTS[variant] || VARIANTS.text,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
};

export default Skeleton;

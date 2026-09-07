
const Skeleton = ({
  width = "100%",
  height = "16px",
  variant = "text",
  count = 1,
  className = "",
}) => {
  const skeletonClassName = [
    "skeleton",
    `skeleton--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const items = Array.from({ length: count });

  return (
    <div className="skeleton-group">
      {items.map((_, index) => (
        <span
          key={index}
          className={skeletonClassName}
          style={{
            width,
            height,
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

export default Skeleton;

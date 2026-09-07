const Badge = ({
  children,
  variant = "default",
  size = "md",
  dot = false,
  className = "",
}) => {
  const classes = [
    "ui-badge",
    `ui-badge--${variant}`,
    `ui-badge--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes}>
      {dot && <span className="ui-badge__dot" />}
      {children}
    </span>
  );
};

export default Badge;

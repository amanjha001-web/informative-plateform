const Avatar = ({
  src = "",
  alt = "User avatar",
  name = "",
  size = "md",
  className = "",
}) => {
  const getInitials = (value) => {
    if (!value?.trim()) {
      return "U";
    }

    const words = value.trim().split(/\s+/);

    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }

    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
  };

  const avatarClassName = ["avatar", `avatar--${size}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={avatarClassName}>
      {src ? (
        <img src={src} alt={alt} className="avatar__image" />
      ) : (
        <span className="avatar__initials" aria-label={name || alt}>
          {getInitials(name)}
        </span>
      )}
    </div>
  );
};

export default Avatar;

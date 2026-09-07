import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";

const UserMenu = ({
  user = {
    name: "Admin User",
    email: "admin@example.com",
  },
  onLogout,
}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const displayName = user?.name || "Admin User";
  const email = user?.email || "admin@example.com";

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  const handleLogout = () => {
    setOpen(false);

    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        type="button"
        className="user-menu__trigger"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <div className="user-menu__avatar">{initials}</div>

        <div className="user-menu__info">
          <span className="user-menu__name">{displayName}</span>

          <span className="user-menu__email">{email}</span>
        </div>

        <ChevronDown
          size={16}
          className={`user-menu__chevron ${
            open ? "user-menu__chevron--open" : ""
          }`}
        />
      </button>

      {open && (
        <div className="user-menu__dropdown" role="menu">
          <div className="user-menu__dropdown-header">
            <div className="user-menu__dropdown-avatar">{initials}</div>

            <div>
              <strong>{displayName}</strong>
              <span>{email}</span>
            </div>
          </div>

          <div className="user-menu__divider" />

          <Link
            to="/admin/profile"
            className="user-menu__item"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            <User size={17} />
            <span>Profile</span>
          </Link>

          <Link
            to="/admin/settings"
            className="user-menu__item"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            <Settings size={17} />
            <span>Settings</span>
          </Link>

          <div className="user-menu__divider" />

          <button
            type="button"
            className="user-menu__item user-menu__item--danger"
            role="menuitem"
            onClick={handleLogout}
          >
            <LogOut size={17} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

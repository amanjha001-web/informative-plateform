import { NavLink } from "react-router-dom";
import { Search, X } from "lucide-react";

import { NAVIGATION } from "../../constants/navigation";

const MobileMenu = ({
  isOpen,
  onClose,
  id = "mobile-navigation",
  className = "",
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={["fixed inset-0 z-[60] md:hidden", className]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close mobile menu"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Menu Panel */}
      <aside
        id={id}
        className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col border-l border-[rgb(var(--border))] bg-[rgb(var(--background))] shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-[rgb(var(--border))] px-5">
          <span className="text-lg font-bold text-[rgb(var(--foreground))]">
            Menu
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-2 text-[rgb(var(--muted-foreground))] transition-colors hover:bg-[rgb(var(--secondary))] hover:text-[rgb(var(--foreground))] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))]"
          >
            <X size={21} aria-hidden="true" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <div className="flex flex-col gap-1">
            {NAVIGATION.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  [
                    "rounded-lg px-4 py-3 text-sm font-medium",
                    "transition-colors duration-200",
                    isActive
                      ? "bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]"
                      : "text-[rgb(var(--foreground))] hover:bg-[rgb(var(--secondary))]",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}

            <NavLink
              to="/search"
              onClick={onClose}
              className={({ isActive }) =>
                [
                  "mt-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium",
                  "transition-colors duration-200",
                  isActive
                    ? "bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]"
                    : "text-[rgb(var(--foreground))] hover:bg-[rgb(var(--secondary))]",
                ].join(" ")
              }
            >
              <Search size={18} aria-hidden="true" />
              Search
            </NavLink>
          </div>
        </nav>
      </aside>
    </div>
  );
};

export default MobileMenu;

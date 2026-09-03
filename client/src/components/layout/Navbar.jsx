import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Moon, Search, Sun, X } from "lucide-react";

import { NAVIGATION } from "../../constants/navigation";
import { APP_CONFIG } from "../../constants/config";
import useTheme from "../../hooks/useTheme";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isDark, toggleTheme } = useTheme();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[rgb(var(--border))] bg-[rgb(var(--background))]/95 backdrop-blur">
        <div className="container-custom">
          <div className="flex h-16 items-center justify-between gap-4 sm:gap-6">
            {/* Logo */}
            <Link
              to="/"
              onClick={closeMenu}
              className="min-w-0 shrink-0 truncate text-lg font-bold tracking-tight text-[rgb(var(--foreground))] sm:text-xl"
              aria-label={`${APP_CONFIG.name} Home`}
            >
              {APP_CONFIG.name}
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden items-center gap-1 md:flex"
              aria-label="Main navigation"
            >
              {NAVIGATION.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      "rounded-lg px-3 py-2 text-sm font-medium",
                      "transition-colors duration-200",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))]",
                      isActive
                        ? "bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]"
                        : "text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--secondary))] hover:text-[rgb(var(--foreground))]",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden items-center gap-1 md:flex">
              <Link
                to="/search"
                aria-label="Search"
                className="rounded-lg p-2.5 text-[rgb(var(--muted-foreground))] transition-colors hover:bg-[rgb(var(--secondary))] hover:text-[rgb(var(--foreground))] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))]"
              >
                <Search size={19} aria-hidden="true" />
              </Link>

              {APP_CONFIG.features.darkMode && (
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={
                    isDark ? "Switch to light mode" : "Switch to dark mode"
                  }
                  className="rounded-lg p-2.5 text-[rgb(var(--muted-foreground))] transition-colors hover:bg-[rgb(var(--secondary))] hover:text-[rgb(var(--foreground))] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))]"
                >
                  {isDark ? (
                    <Sun size={19} aria-hidden="true" />
                  ) : (
                    <Moon size={19} aria-hidden="true" />
                  )}
                </button>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-1 md:hidden">
              {APP_CONFIG.features.darkMode && (
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={
                    isDark ? "Switch to light mode" : "Switch to dark mode"
                  }
                  className="rounded-lg p-2.5 text-[rgb(var(--muted-foreground))] transition-colors hover:bg-[rgb(var(--secondary))] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))]"
                >
                  {isDark ? (
                    <Sun size={19} aria-hidden="true" />
                  ) : (
                    <Moon size={19} aria-hidden="true" />
                  )}
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsMenuOpen((current) => !current)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
                className="rounded-lg p-2.5 text-[rgb(var(--muted-foreground))] transition-colors hover:bg-[rgb(var(--secondary))] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))]"
              >
                {isMenuOpen ? (
                  <X size={21} aria-hidden="true" />
                ) : (
                  <Menu size={21} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        id="mobile-navigation"
      />
    </>
  );
};

export default Navbar;

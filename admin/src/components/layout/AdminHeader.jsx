import { Menu, PanelLeftClose, PanelLeftOpen, Sun, Moon } from "lucide-react";

import UserMenu from "./UserMenu";
import useTheme from "../../hooks/useTheme";

const AdminHeader = ({
  sidebarCollapsed,
  onToggleSidebar,
  onOpenMobileMenu,
}) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="admin-header">
      <div className="admin-header__left">
        {/* Mobile Menu */}
        <button
          type="button"
          className="admin-header__mobile-menu"
          onClick={onOpenMobileMenu}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        {/* Desktop Sidebar Toggle */}
        <button
          type="button"
          className="admin-header__sidebar-toggle"
          onClick={onToggleSidebar}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? (
            <PanelLeftOpen size={21} />
          ) : (
            <PanelLeftClose size={21} />
          )}
        </button>

        <div className="admin-header__title">
          <span>Admin Panel</span>
        </div>
      </div>

      <div className="admin-header__right">
        {/* Theme Toggle */}
        <button
          type="button"
          className="admin-header__action"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* User */}
        <UserMenu />
      </div>
    </header>
  );
};

export default AdminHeader;

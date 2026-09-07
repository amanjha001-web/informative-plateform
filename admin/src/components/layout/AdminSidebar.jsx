import { NavLink } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

import { NAVIGATION } from "../../constants/navigation";

const AdminSidebar = ({ collapsed = false }) => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (id) => {
    setOpenMenus((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  return (
    <aside
      className={`admin-sidebar ${collapsed ? "admin-sidebar--collapsed" : ""}`}
    >
      {/* Logo */}
      <div className="admin-sidebar__logo">
        <div className="admin-sidebar__logo-icon">I</div>

        {!collapsed && (
          <span className="admin-sidebar__logo-text">Informative</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="admin-sidebar__nav">
        {NAVIGATION.map((item) => {
          const Icon = item.icon;

          if (item.children) {
            const isOpen = openMenus[item.id];

            return (
              <div key={item.id} className="admin-sidebar__group">
                <button
                  type="button"
                  className="admin-sidebar__group-button"
                  onClick={() => toggleMenu(item.id)}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon size={20} />

                  {!collapsed && (
                    <>
                      <span>{item.label}</span>

                      {isOpen ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </>
                  )}
                </button>

                {!collapsed && isOpen && (
                  <div className="admin-sidebar__children">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;

                      return (
                        <NavLink
                          key={child.id}
                          to={child.path}
                          className={({ isActive }) =>
                            `admin-sidebar__link ${
                              isActive ? "admin-sidebar__link--active" : ""
                            }`
                          }
                        >
                          <ChildIcon size={18} />
                          <span>{child.label}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `admin-sidebar__link ${
                  isActive ? "admin-sidebar__link--active" : ""
                }`
              }
              title={collapsed ? item.label : undefined}
            >
              <Icon size={20} />

              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;

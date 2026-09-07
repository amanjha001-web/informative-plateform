import { X } from "lucide-react";
import { NavLink } from "react-router-dom";

import { NAVIGATION } from "../../constants/navigation";

const AdminMobileMenu = ({ open, onClose }) => {
  if (!open) {
    return null;
  }

  return (
    <div className="mobile-menu-overlay" onClick={onClose}>
      <aside
        className="mobile-menu"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="mobile-menu__header">
          <div className="mobile-menu__brand">
            <div className="mobile-menu__logo">I</div>

            <span>Informative</span>
          </div>

          <button
            type="button"
            className="mobile-menu__close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mobile-menu__nav">
          {NAVIGATION.map((item) => {
            const Icon = item.icon;

            if (item.children) {
              return (
                <div key={item.id} className="mobile-menu__group">
                  <div className="mobile-menu__group-title">
                    <Icon size={19} />
                    <span>{item.label}</span>
                  </div>

                  <div className="mobile-menu__children">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;

                      return (
                        <NavLink
                          key={child.id}
                          to={child.path}
                          onClick={onClose}
                          className={({ isActive }) =>
                            `mobile-menu__link ${
                              isActive ? "mobile-menu__link--active" : ""
                            }`
                          }
                        >
                          <ChildIcon size={18} />
                          <span>{child.label}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              );
            }

            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `mobile-menu__link ${
                    isActive ? "mobile-menu__link--active" : ""
                  }`
                }
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </div>
  );
};

export default AdminMobileMenu;

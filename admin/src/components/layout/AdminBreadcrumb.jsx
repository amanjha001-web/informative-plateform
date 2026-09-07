import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const routeLabels = {
  admin: "Admin",
  dashboard: "Dashboard",
  articles: "Articles",
  add: "Add Article",
  edit: "Edit Article",
  categories: "Categories",
  users: "Users",
  enquiries: "Enquiries",
  faq: "FAQ",
  media: "Media",
  pages: "Pages",
  seo: "SEO",
  roles: "Roles & Permissions",
  "activity-logs": "Activity Logs",
  settings: "Settings",
  profile: "Profile",
};

const AdminBreadcrumb = () => {
  const location = useLocation();

  const segments = location.pathname.split("/").filter(Boolean);

  const items = segments.map((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join("/")}`;

    return {
      label:
        routeLabels[segment] ||
        segment.charAt(0).toUpperCase() + segment.slice(1),
      path,
      isLast: index === segments.length - 1,
    };
  });

  return (
    <nav className="admin-breadcrumb" aria-label="Breadcrumb">
      <Link
        to="/admin/dashboard"
        className="admin-breadcrumb__home"
        aria-label="Dashboard"
      >
        <Home size={16} />
      </Link>

      {items
        .filter((item) => item.label !== "Admin")
        .map((item) => (
          <div key={item.path} className="admin-breadcrumb__item">
            <ChevronRight size={15} className="admin-breadcrumb__separator" />

            {item.isLast ? (
              <span className="admin-breadcrumb__current">{item.label}</span>
            ) : (
              <Link to={item.path} className="admin-breadcrumb__link">
                {item.label}
              </Link>
            )}
          </div>
        ))}
    </nav>
  );
};

export default AdminBreadcrumb;

import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/layout/AdminSidebar";
import AdminHeader from "../components/layout/AdminHeader";
import AdminMobileMenu from "../components/layout/AdminMobileMenu";
import AdminBreadcrumb from "../components/layout/AdminBreadcrumb";

const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed((current) => !current);
  };

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="admin-layout">
      {/* Desktop Sidebar */}
      <AdminSidebar collapsed={sidebarCollapsed} />

      {/* Mobile Sidebar */}
      <AdminMobileMenu open={mobileMenuOpen} onClose={closeMobileMenu} />

      {/* Main Area */}
      <div
        className={`admin-main ${
          sidebarCollapsed ? "admin-main--collapsed" : ""
        }`}
      >
        {/* Header */}
        <AdminHeader
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={toggleSidebar}
          onOpenMobileMenu={openMobileMenu}
        />

        {/* Page Content */}
        <main className="admin-content">
          <div className="admin-content__inner">
            {/* Breadcrumb */}
            <AdminBreadcrumb />

            {/* Current Page */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

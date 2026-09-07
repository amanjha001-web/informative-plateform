import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import Loader from "../components/common/Loader";

const Dashboard = lazy(() => import("../pages/Dashboard"));

const Articles = lazy(() => import("../pages/Articles"));
const AddArticle = lazy(() => import("../pages/AddArticle"));
const EditArticle = lazy(() => import("../pages/EditArticle"));

const Categories = lazy(() => import("../pages/Categories"));

const Users = lazy(() => import("../pages/Users"));

const Enquiries = lazy(() => import("../pages/Enquiries"));

const FAQ = lazy(() => import("../pages/FAQ"));

const Media = lazy(() => import("../pages/Media"));

const Pages = lazy(() => import("../pages/Pages"));

const SEO = lazy(() => import("../pages/SEO"));

const Roles = lazy(() => import("../pages/Roles"));

const Settings = lazy(() => import("../pages/Settings"));

const ActivityLogs = lazy(() => import("../pages/ActivityLogs"));

const Profile = lazy(() => import("../pages/Profile"));

const NotFound = lazy(() => import("../pages/NotFound"));

const RouteLoader = () => {
  return (
    <div className="route-loader">
      <Loader />
    </div>
  );
};

const AdminRoutes = () => {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        <Route element={<AdminLayout />}>
          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Articles */}
          <Route path="articles" element={<Articles />} />

          <Route path="articles/add" element={<AddArticle />} />

          <Route path="articles/:id/edit" element={<EditArticle />} />

          {/* Categories */}
          <Route path="categories" element={<Categories />} />

          {/* Users */}
          <Route path="users" element={<Users />} />

          {/* Enquiries */}
          <Route path="enquiries" element={<Enquiries />} />

          {/* FAQ */}
          <Route path="faq" element={<FAQ />} />

          {/* Media */}
          <Route path="media" element={<Media />} />

          {/* Pages */}
          <Route path="pages" element={<Pages />} />

          {/* SEO */}
          <Route path="seo" element={<SEO />} />

          {/* Roles & Permissions */}
          <Route path="roles" element={<Roles />} />

          {/* Activity Logs */}
          <Route path="activity-logs" element={<ActivityLogs />} />

          {/* Settings */}
          <Route path="settings" element={<Settings />} />

          {/* Profile */}
          <Route path="profile" element={<Profile />} />

          {/* /admin → /admin/dashboard */}
          <Route index element={<Navigate to="/admin/dashboard" replace />} />

          {/* Invalid admin route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;

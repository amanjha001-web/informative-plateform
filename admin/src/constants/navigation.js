import {
  Activity,
  FileText,
  Folder,
  HelpCircle,
  Image,
  LayoutDashboard,
  MessageSquare,
  Search,
  Settings,
  ShieldCheck,
  Users,
  FileEdit,
} from "lucide-react";

import { PERMISSIONS } from "./permissions";

export const NAVIGATION = Object.freeze([
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
    permission: PERMISSIONS.DASHBOARD_VIEW,
  },

  {
    id: "content",
    label: "Content",
    icon: FileText,
    children: [
      {
        id: "articles",
        label: "Articles",
        path: "/admin/articles",
        icon: FileText,
        permission: PERMISSIONS.ARTICLES_VIEW,
      },
      {
        id: "categories",
        label: "Categories",
        path: "/admin/categories",
        icon: Folder,
        permission: PERMISSIONS.CATEGORIES_VIEW,
      },
      {
        id: "pages",
        label: "Pages",
        path: "/admin/pages",
        icon: FileEdit,
        permission: PERMISSIONS.PAGES_VIEW,
      },
      {
        id: "faq",
        label: "FAQ",
        path: "/admin/faq",
        icon: HelpCircle,
        permission: PERMISSIONS.FAQ_VIEW,
      },
    ],
  },

  {
    id: "media",
    label: "Media",
    path: "/admin/media",
    icon: Image,
    permission: PERMISSIONS.MEDIA_VIEW,
  },

  {
    id: "users",
    label: "Users",
    path: "/admin/users",
    icon: Users,
    permission: PERMISSIONS.USERS_VIEW,
  },

  {
    id: "enquiries",
    label: "Enquiries",
    path: "/admin/enquiries",
    icon: MessageSquare,
    permission: PERMISSIONS.ENQUIRIES_VIEW,
  },

  {
    id: "seo",
    label: "SEO",
    path: "/admin/seo",
    icon: Search,
    permission: PERMISSIONS.SEO_VIEW,
  },

  {
    id: "roles",
    label: "Roles & Permissions",
    path: "/admin/roles",
    icon: ShieldCheck,
    permission: PERMISSIONS.ROLES_VIEW,
  },

  {
    id: "activity",
    label: "Activity Logs",
    path: "/admin/activity-logs",
    icon: Activity,
    permission: PERMISSIONS.ACTIVITY_LOGS_VIEW,
  },

  {
    id: "settings",
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
    permission: PERMISSIONS.SETTINGS_VIEW,
  },
]);

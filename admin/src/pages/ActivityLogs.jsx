import { useMemo, useState } from "react";
import {
  Activity,
  CalendarDays,
  Filter,
  RefreshCw,
  Search,
  ShieldCheck,
} from "lucide-react";

import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import Drawer from "../components/common/Drawer";

import ActivityTable from "../components/activity/ActivityTable";
import ActivityDetails from "../components/activity/ActivityDetails";

const INITIAL_ACTIVITIES = [
  {
    id: "ACT-001",
    action: "login",
    resource: "Authentication",
    description: "Admin user logged into the dashboard.",
    resourceId: null,
    ipAddress: "103.84.21.45",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    createdAt: "2026-09-07T09:15:00",
    user: {
      name: "Aman Kumar",
      email: "admin@example.com",
      avatar: "",
    },
    metadata: {
      method: "password",
      success: true,
    },
  },
  {
    id: "ACT-002",
    action: "create",
    resource: "Article",
    description: "Created a new article.",
    resourceId: "ART-1024",
    ipAddress: "103.84.21.45",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    createdAt: "2026-09-07T08:42:00",
    user: {
      name: "Rahul Sharma",
      email: "rahul@example.com",
      avatar: "",
    },
    metadata: {
      title: "Latest Technology Trends",
      status: "draft",
    },
  },
  {
    id: "ACT-003",
    action: "update",
    resource: "Category",
    description: "Updated category information.",
    resourceId: "CAT-102",
    ipAddress: "49.36.118.22",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    createdAt: "2026-09-06T17:30:00",
    user: {
      name: "Priya Singh",
      email: "priya@example.com",
      avatar: "",
    },
    metadata: {
      field: "description",
    },
  },
  {
    id: "ACT-004",
    action: "delete",
    resource: "Media",
    description: "Deleted an uploaded media file.",
    resourceId: "MED-450",
    ipAddress: "117.201.54.12",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    createdAt: "2026-09-06T15:12:00",
    user: {
      name: "Aman Kumar",
      email: "admin@example.com",
      avatar: "",
    },
    metadata: {
      fileName: "banner-home.webp",
    },
  },
  {
    id: "ACT-005",
    action: "logout",
    resource: "Authentication",
    description: "Admin user logged out of the dashboard.",
    resourceId: null,
    ipAddress: "103.84.21.45",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    createdAt: "2026-09-06T13:45:00",
    user: {
      name: "Vikas Kumar",
      email: "vikas@example.com",
      avatar: "",
    },
    metadata: {},
  },
];

const ActivityLogs = () => {
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);

  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [resourceFilter, setResourceFilter] = useState("all");

  const [selectedActivity, setSelectedActivity] = useState(null);

  const [detailsOpen, setDetailsOpen] = useState(false);

  const filteredActivities = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return activities.filter((activity) => {
      const matchesSearch =
        !normalizedSearch ||
        activity.user?.name?.toLowerCase().includes(normalizedSearch) ||
        activity.user?.email?.toLowerCase().includes(normalizedSearch) ||
        activity.description?.toLowerCase().includes(normalizedSearch) ||
        activity.ipAddress?.toLowerCase().includes(normalizedSearch) ||
        activity.resource?.toLowerCase().includes(normalizedSearch);

      const matchesAction =
        actionFilter === "all" || activity.action === actionFilter;

      const matchesResource =
        resourceFilter === "all" || activity.resource === resourceFilter;

      return matchesSearch && matchesAction && matchesResource;
    });
  }, [activities, search, actionFilter, resourceFilter]);

  const stats = useMemo(() => {
    return {
      total: activities.length,
      logins: activities.filter((item) => item.action === "login").length,
      creates: activities.filter((item) => item.action === "create").length,
      deletes: activities.filter((item) => item.action === "delete").length,
    };
  }, [activities]);

  const handleView = (activity) => {
    setSelectedActivity(activity);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedActivity(null);
  };

  const handleRefresh = () => {
    setActivities([...INITIAL_ACTIVITIES]);
    setSearch("");
    setActionFilter("all");
    setResourceFilter("all");
  };

  const handleClearFilters = () => {
    setSearch("");
    setActionFilter("all");
    setResourceFilter("all");
  };

  return (
    <section className="activity-logs-page">
      <div className="activity-logs-page__header">
        <div>
          <div className="activity-logs-page__title-row">
            <Activity size={24} aria-hidden="true" />

            <h1 className="activity-logs-page__title">Activity Logs</h1>
          </div>

          <p className="activity-logs-page__description">
            Monitor administrative actions and system activity across the
            platform.
          </p>
        </div>

        <Button
          type="button"
          variant="secondary"
          icon={RefreshCw}
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </div>

      <div className="activity-logs-page__stats">
        <div className="activity-logs-page__stat">
          <div className="activity-logs-page__stat-icon">
            <Activity size={18} />
          </div>

          <div>
            <span className="activity-logs-page__stat-label">
              Total Activities
            </span>

            <strong className="activity-logs-page__stat-value">
              {stats.total}
            </strong>
          </div>
        </div>

        <div className="activity-logs-page__stat">
          <div className="activity-logs-page__stat-icon">
            <ShieldCheck size={18} />
          </div>

          <div>
            <span className="activity-logs-page__stat-label">Logins</span>

            <strong className="activity-logs-page__stat-value">
              {stats.logins}
            </strong>
          </div>
        </div>

        <div className="activity-logs-page__stat">
          <div className="activity-logs-page__stat-icon">
            <CalendarDays size={18} />
          </div>

          <div>
            <span className="activity-logs-page__stat-label">Created</span>

            <strong className="activity-logs-page__stat-value">
              {stats.creates}
            </strong>
          </div>
        </div>

        <div className="activity-logs-page__stat">
          <div className="activity-logs-page__stat-icon">
            <Filter size={18} />
          </div>

          <div>
            <span className="activity-logs-page__stat-label">Deleted</span>

            <strong className="activity-logs-page__stat-value">
              {stats.deletes}
            </strong>
          </div>
        </div>
      </div>

      <div className="activity-logs-page__filters">
        <div className="activity-logs-page__search">
          <Input
            name="activity-search"
            placeholder="Search user, email, IP, resource..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            icon={Search}
          />
        </div>

        <div className="activity-logs-page__filter">
          <Select
            name="action"
            value={actionFilter}
            onChange={(event) => setActionFilter(event.target.value)}
            options={[
              { value: "all", label: "All Actions" },
              { value: "login", label: "Login" },
              { value: "logout", label: "Logout" },
              { value: "create", label: "Created" },
              { value: "update", label: "Updated" },
              { value: "delete", label: "Deleted" },
            ]}
          />
        </div>

        <div className="activity-logs-page__filter">
          <Select
            name="resource"
            value={resourceFilter}
            onChange={(event) => setResourceFilter(event.target.value)}
            options={[
              {
                value: "all",
                label: "All Resources",
              },
              {
                value: "Authentication",
                label: "Authentication",
              },
              {
                value: "Article",
                label: "Article",
              },
              {
                value: "Category",
                label: "Category",
              },
              {
                value: "Media",
                label: "Media",
              },
            ]}
          />
        </div>

        {(search || actionFilter !== "all" || resourceFilter !== "all") && (
          <Button type="button" variant="ghost" onClick={handleClearFilters}>
            Clear
          </Button>
        )}
      </div>

      <div className="activity-logs-page__results">
        <div className="activity-logs-page__results-header">
          <div>
            <h2 className="activity-logs-page__results-title">
              Activity History
            </h2>

            <span className="activity-logs-page__results-count">
              {filteredActivities.length}{" "}
              {filteredActivities.length === 1 ? "activity" : "activities"}
            </span>
          </div>
        </div>

        <ActivityTable activities={filteredActivities} onView={handleView} />
      </div>

      <Drawer
        open={detailsOpen}
        onClose={handleCloseDetails}
        title="Activity Details"
      >
        <ActivityDetails activity={selectedActivity} />
      </Drawer>
    </section>
  );
};

export default ActivityLogs;

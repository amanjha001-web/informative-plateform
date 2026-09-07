import { Eye, LogIn, LogOut, Plus, Shield, Trash2, User } from "lucide-react";

import Button from "../common/Button";
import Badge from "../common/Badge";
import EmptyState from "../common/EmptyState";

const ACTION_CONFIG = {
  login: {
    label: "Login",
    variant: "success",
    icon: LogIn,
  },
  logout: {
    label: "Logout",
    variant: "secondary",
    icon: LogOut,
  },
  create: {
    label: "Created",
    variant: "info",
    icon: Plus,
  },
  update: {
    label: "Updated",
    variant: "warning",
    icon: Shield,
  },
  delete: {
    label: "Deleted",
    variant: "danger",
    icon: Trash2,
  },
};

const ActivityTable = ({ activities = [], onView }) => {
  if (activities.length === 0) {
    return (
      <EmptyState
        icon={Shield}
        title="No activity found"
        description="There are no activity logs to display."
      />
    );
  }

  const getActionConfig = (action) => {
    return (
      ACTION_CONFIG[action] || {
        label: action || "Unknown",
        variant: "secondary",
        icon: Shield,
      }
    );
  };

  return (
    <div className="activity-table">
      <div className="activity-table__wrapper">
        <table className="activity-table__table">
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Resource</th>
              <th>IP Address</th>
              <th>Date & Time</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {activities.map((activity) => {
              const config = getActionConfig(activity.action);

              const ActionIcon = config.icon;

              return (
                <tr key={activity.id}>
                  <td>
                    <div className="activity-table__user">
                      <div className="activity-table__avatar">
                        {activity.user?.avatar ? (
                          <img src={activity.user.avatar} alt="" />
                        ) : (
                          <User size={16} aria-hidden="true" />
                        )}
                      </div>

                      <div>
                        <span className="activity-table__user-name">
                          {activity.user?.name || "System"}
                        </span>

                        {activity.user?.email && (
                          <span className="activity-table__user-email">
                            {activity.user.email}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td>
                    <Badge variant={config.variant}>
                      <span className="activity-table__action">
                        <ActionIcon size={13} aria-hidden="true" />
                        {config.label}
                      </span>
                    </Badge>
                  </td>

                  <td>
                    <div className="activity-table__resource">
                      <span className="activity-table__resource-name">
                        {activity.resource || "—"}
                      </span>

                      {activity.resourceId && (
                        <code>{activity.resourceId}</code>
                      )}
                    </div>
                  </td>

                  <td>
                    <code className="activity-table__ip">
                      {activity.ipAddress || "—"}
                    </code>
                  </td>

                  <td>
                    <span className="activity-table__date">
                      {activity.createdAt || "—"}
                    </span>
                  </td>

                  <td>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      icon={Eye}
                      onClick={() => onView?.(activity)}
                      aria-label={`View activity by ${activity.user?.name || "system"}`}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityTable;

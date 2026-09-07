import { Clock3, FileText, Globe, Monitor, Shield, User } from "lucide-react";

import Badge from "../common/Badge";

const formatDateTime = (value) => {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(date);
};

const getActionLabel = (action) => {
  const labels = {
    login: "Login",
    logout: "Logout",
    create: "Created",
    update: "Updated",
    delete: "Deleted",
  };

  return labels[action] || action || "Unknown";
};

const getActionVariant = (action) => {
  const variants = {
    login: "success",
    logout: "secondary",
    create: "info",
    update: "warning",
    delete: "danger",
  };

  return variants[action] || "secondary";
};

const ActivityDetails = ({ activity = null }) => {
  if (!activity) {
    return null;
  }

  return (
    <div className="activity-details">
      <div className="activity-details__header">
        <div className="activity-details__icon">
          <Shield size={22} aria-hidden="true" />
        </div>

        <div className="activity-details__heading">
          <h2 className="activity-details__title">Activity Details</h2>

          <p className="activity-details__description">
            Detailed information about this activity.
          </p>
        </div>
      </div>

      <div className="activity-details__section">
        <div className="activity-details__section-title">
          <FileText size={16} aria-hidden="true" />
          Activity
        </div>

        <div className="activity-details__grid">
          <div className="activity-details__item">
            <span className="activity-details__label">Action</span>

            <div>
              <Badge variant={getActionVariant(activity.action)}>
                {getActionLabel(activity.action)}
              </Badge>
            </div>
          </div>

          <div className="activity-details__item">
            <span className="activity-details__label">Resource</span>

            <span className="activity-details__value">
              {activity.resource || "—"}
            </span>
          </div>

          <div className="activity-details__item activity-details__item--full">
            <span className="activity-details__label">Description</span>

            <span className="activity-details__value">
              {activity.description || "—"}
            </span>
          </div>

          {activity.resourceId && (
            <div className="activity-details__item">
              <span className="activity-details__label">Resource ID</span>

              <code className="activity-details__code">
                {activity.resourceId}
              </code>
            </div>
          )}
        </div>
      </div>

      <div className="activity-details__section">
        <div className="activity-details__section-title">
          <User size={16} aria-hidden="true" />
          User
        </div>

        <div className="activity-details__user">
          <div className="activity-details__avatar">
            {activity.user?.avatar ? (
              <img src={activity.user.avatar} alt="" />
            ) : (
              <User size={18} aria-hidden="true" />
            )}
          </div>

          <div>
            <span className="activity-details__user-name">
              {activity.user?.name || "System"}
            </span>

            {activity.user?.email && (
              <span className="activity-details__user-email">
                {activity.user.email}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="activity-details__section">
        <div className="activity-details__section-title">
          <Globe size={16} aria-hidden="true" />
          Request Information
        </div>

        <div className="activity-details__grid">
          <div className="activity-details__item">
            <span className="activity-details__label">IP Address</span>

            <code className="activity-details__code">
              {activity.ipAddress || "—"}
            </code>
          </div>

          <div className="activity-details__item">
            <span className="activity-details__label">Timestamp</span>

            <span className="activity-details__value activity-details__value--inline">
              <Clock3 size={14} aria-hidden="true" />
              {formatDateTime(activity.createdAt)}
            </span>
          </div>

          <div className="activity-details__item activity-details__item--full">
            <span className="activity-details__label">User Agent</span>

            <span className="activity-details__value activity-details__value--break">
              <Monitor size={14} aria-hidden="true" />
              {activity.userAgent || "—"}
            </span>
          </div>
        </div>
      </div>

      {activity.metadata && Object.keys(activity.metadata).length > 0 && (
        <div className="activity-details__section">
          <div className="activity-details__section-title">
            <FileText size={16} aria-hidden="true" />
            Metadata
          </div>

          <pre className="activity-details__metadata">
            {JSON.stringify(activity.metadata, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ActivityDetails;

import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Edit3,
  FilePlus,
  LogIn,
  Trash2,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";

const ActivityFeed = ({
  activities = [],
  title = "Recent Activity",
  description = "Latest actions performed in the admin panel",
}) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case "login":
        return LogIn;

      case "user_created":
        return UserPlus;

      case "article_created":
        return FilePlus;

      case "article_updated":
        return Edit3;

      case "deleted":
        return Trash2;

      case "success":
        return CheckCircle2;

      default:
        return Activity;
    }
  };

  return (
    <section className="dashboard-list-card">
      <div className="dashboard-list-card__header">
        <div>
          <h3 className="dashboard-list-card__title">{title}</h3>

          <p className="dashboard-list-card__description">{description}</p>
        </div>

        <Link
          to="/admin/activity-logs"
          className="dashboard-list-card__view-all"
        >
          View all
          <ArrowRight size={15} />
        </Link>
      </div>

      <div className="dashboard-activity-list">
        {activities.length === 0 ? (
          <div className="dashboard-activity-empty">
            <Activity size={22} />
            <span>No recent activity available</span>
          </div>
        ) : (
          activities.map((activity) => {
            const Icon = getActivityIcon(activity.type);

            return (
              <div
                key={activity.id || activity._id}
                className="dashboard-activity-item"
              >
                <div className="dashboard-activity-item__icon">
                  <Icon size={17} />
                </div>

                <div className="dashboard-activity-item__content">
                  <p className="dashboard-activity-item__message">
                    {activity.message}
                  </p>

                  <div className="dashboard-activity-item__meta">
                    {activity.user && <span>{activity.user}</span>}

                    {activity.date && (
                      <>
                        {activity.user && (
                          <span className="dashboard-activity-item__dot">
                            •
                          </span>
                        )}

                        <span>{activity.date}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default ActivityFeed;

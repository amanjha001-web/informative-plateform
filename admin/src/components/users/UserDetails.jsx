import { Calendar, Mail, Shield, User } from "lucide-react";

import Avatar from "../common/Avatar";
import Badge from "../common/Badge";

const UserDetails = ({ user = {} }) => {
  const {
    name = user.fullName || "Unknown User",
    email = "No email available",
    role = "user",
    status = "active",
    createdAt = "",
    lastLogin = "",
  } = user;

  const normalizedStatus = status.toLowerCase();

  const statusVariant =
    normalizedStatus === "active"
      ? "success"
      : normalizedStatus === "blocked"
        ? "danger"
        : "warning";

  return (
    <div className="user-details">
      <div className="user-details__header">
        <Avatar src={user.avatar} name={name} size="lg" />

        <div className="user-details__identity">
          <h3 className="user-details__name">{name}</h3>

          <p className="user-details__email">{email}</p>

          <div className="user-details__badges">
            <Badge variant={statusVariant} size="sm" dot>
              {normalizedStatus
                ? normalizedStatus.charAt(0).toUpperCase() +
                  normalizedStatus.slice(1)
                : "Unknown"}
            </Badge>

            <Badge variant="default" size="sm">
              {role}
            </Badge>
          </div>
        </div>
      </div>

      <div className="user-details__divider" />

      <div className="user-details__info">
        <div className="user-details__info-item">
          <div className="user-details__info-icon">
            <User size={17} />
          </div>

          <div>
            <span className="user-details__info-label">Username</span>
            <strong className="user-details__info-value">
              {user.username || "—"}
            </strong>
          </div>
        </div>

        <div className="user-details__info-item">
          <div className="user-details__info-icon">
            <Mail size={17} />
          </div>

          <div>
            <span className="user-details__info-label">Email</span>
            <strong className="user-details__info-value">{email}</strong>
          </div>
        </div>

        <div className="user-details__info-item">
          <div className="user-details__info-icon">
            <Shield size={17} />
          </div>

          <div>
            <span className="user-details__info-label">Role</span>
            <strong className="user-details__info-value">{role}</strong>
          </div>
        </div>

        <div className="user-details__info-item">
          <div className="user-details__info-icon">
            <Calendar size={17} />
          </div>

          <div>
            <span className="user-details__info-label">Joined</span>
            <strong className="user-details__info-value">
              {createdAt || "—"}
            </strong>
          </div>
        </div>

        <div className="user-details__info-item">
          <div className="user-details__info-icon">
            <Calendar size={17} />
          </div>

          <div>
            <span className="user-details__info-label">Last Login</span>
            <strong className="user-details__info-value">
              {lastLogin || "—"}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

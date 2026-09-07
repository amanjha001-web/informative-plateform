import { Edit, Eye, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";

import Avatar from "../common/Avatar";
import Badge from "../common/Badge";
import EmptyState from "../common/EmptyState";

const UserTable = ({ users = [], onView, onEdit, onDelete }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const handleMenuToggle = (id) => {
    setOpenMenu((current) => (current === id ? null : id));
  };

  const handleView = (user) => {
    setOpenMenu(null);
    onView?.(user);
  };

  const handleEdit = (user) => {
    setOpenMenu(null);
    onEdit?.(user);
  };

  const handleDelete = (user) => {
    setOpenMenu(null);
    onDelete?.(user);
  };

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "success";
      case "blocked":
        return "danger";
      case "inactive":
        return "warning";
      default:
        return "default";
    }
  };

  if (users.length === 0) {
    return (
      <div className="user-table-empty">
        <EmptyState
          title="No users found"
          description="There are no users matching your current filters."
        />
      </div>
    );
  }

  return (
    <div className="user-table-wrapper">
      <table className="user-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Joined</th>
            <th className="user-table__actions-header">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => {
            const userId = user.id || user._id;
            const name = user.fullName || user.name || "Unknown User";

            const status = user.status || "active";
            const role = user.role || "user";

            return (
              <tr key={userId}>
                <td>
                  <div className="user-table__user">
                    <Avatar src={user.avatar} name={name} size="md" />

                    <div className="user-table__user-info">
                      <span className="user-table__name">{name}</span>

                      {user.username && (
                        <span className="user-table__username">
                          @{user.username}
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                <td>
                  <span className="user-table__email">{user.email || "—"}</span>
                </td>

                <td>
                  <Badge variant="default" size="sm">
                    {role}
                  </Badge>
                </td>

                <td>
                  <Badge variant={getStatusVariant(status)} size="sm" dot>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Badge>
                </td>

                <td>
                  <span className="user-table__date">
                    {user.createdAt || "—"}
                  </span>
                </td>

                <td>
                  <div className="user-table__actions">
                    <button
                      type="button"
                      className="user-table__action"
                      title="View user"
                      onClick={() => handleView(user)}
                    >
                      <Eye size={17} />
                    </button>

                    <button
                      type="button"
                      className="user-table__action"
                      title="Edit user"
                      onClick={() => handleEdit(user)}
                    >
                      <Edit size={17} />
                    </button>

                    <div className="user-table__menu">
                      <button
                        type="button"
                        className="user-table__action"
                        title="More actions"
                        aria-expanded={openMenu === userId}
                        onClick={() => handleMenuToggle(userId)}
                      >
                        <MoreVertical size={17} />
                      </button>

                      {openMenu === userId && (
                        <div className="user-table__dropdown">
                          <button
                            type="button"
                            className="user-table__dropdown-item"
                            onClick={() => handleView(user)}
                          >
                            <Eye size={16} />
                            <span>View</span>
                          </button>

                          <button
                            type="button"
                            className="user-table__dropdown-item"
                            onClick={() => handleEdit(user)}
                          >
                            <Edit size={16} />
                            <span>Edit</span>
                          </button>

                          <button
                            type="button"
                            className="user-table__dropdown-item user-table__dropdown-item--danger"
                            onClick={() => handleDelete(user)}
                          >
                            <Trash2 size={16} />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

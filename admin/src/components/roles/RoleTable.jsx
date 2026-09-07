import { Edit, MoreVertical, Shield, Trash2, Users } from "lucide-react";

import Button from "../common/Button";
import EmptyState from "../common/EmptyState";

const RoleTable = ({ roles = [], onEdit, onDelete, onManagePermissions }) => {
  if (roles.length === 0) {
    return (
      <EmptyState
        icon={Shield}
        title="No roles found"
        description="Create a role to start managing users and permissions."
      />
    );
  }

  return (
    <div className="role-table">
      <div className="role-table__wrapper">
        <table className="role-table__table">
          <thead>
            <tr>
              <th>Role</th>
              <th>Description</th>
              <th>Users</th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td>
                  <div className="role-table__role">
                    <div className="role-table__icon">
                      <Shield size={18} aria-hidden="true" />
                    </div>

                    <div>
                      <span className="role-table__name">{role.name}</span>

                      {role.system && (
                        <span className="role-table__system">System</span>
                      )}
                    </div>
                  </div>
                </td>

                <td>
                  <span className="role-table__description">
                    {role.description || "—"}
                  </span>
                </td>

                <td>
                  <div className="role-table__users">
                    <Users size={16} aria-hidden="true" />

                    <span>{role.userCount ?? 0}</span>
                  </div>
                </td>

                <td>
                  <button
                    type="button"
                    className="role-table__permissions"
                    onClick={() => onManagePermissions?.(role)}
                  >
                    {role.permissionCount ?? 0} permissions
                  </button>
                </td>

                <td>
                  <div className="role-table__actions">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      icon={Edit}
                      onClick={() => onEdit?.(role)}
                      aria-label={`Edit ${role.name}`}
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      icon={Trash2}
                      onClick={() => onDelete?.(role)}
                      disabled={role.system}
                      aria-label={`Delete ${role.name}`}
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      icon={MoreVertical}
                      aria-label={`More actions for ${role.name}`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoleTable;

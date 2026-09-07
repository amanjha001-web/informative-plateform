import { useState } from "react";
import { Check, Save, Shield } from "lucide-react";

import Button from "../common/Button";

const PERMISSION_GROUPS = [
  {
    key: "dashboard",
    label: "Dashboard",
    permissions: [
      {
        key: "dashboard:view",
        label: "View Dashboard",
      },
    ],
  },
  {
    key: "articles",
    label: "Articles",
    permissions: [
      {
        key: "articles:view",
        label: "View Articles",
      },
      {
        key: "articles:create",
        label: "Create Articles",
      },
      {
        key: "articles:edit",
        label: "Edit Articles",
      },
      {
        key: "articles:delete",
        label: "Delete Articles",
      },
      {
        key: "articles:publish",
        label: "Publish Articles",
      },
    ],
  },
  {
    key: "categories",
    label: "Categories",
    permissions: [
      {
        key: "categories:view",
        label: "View Categories",
      },
      {
        key: "categories:create",
        label: "Create Categories",
      },
      {
        key: "categories:edit",
        label: "Edit Categories",
      },
      {
        key: "categories:delete",
        label: "Delete Categories",
      },
    ],
  },
  {
    key: "users",
    label: "Users",
    permissions: [
      {
        key: "users:view",
        label: "View Users",
      },
      {
        key: "users:create",
        label: "Create Users",
      },
      {
        key: "users:edit",
        label: "Edit Users",
      },
      {
        key: "users:delete",
        label: "Delete Users",
      },
      {
        key: "users:status:update",
        label: "Update User Status",
      },
    ],
  },
  {
    key: "enquiries",
    label: "Enquiries",
    permissions: [
      {
        key: "enquiries:view",
        label: "View Enquiries",
      },
      {
        key: "enquiries:edit",
        label: "Edit Enquiries",
      },
      {
        key: "enquiries:delete",
        label: "Delete Enquiries",
      },
    ],
  },
  {
    key: "faq",
    label: "FAQ",
    permissions: [
      {
        key: "faq:view",
        label: "View FAQ",
      },
      {
        key: "faq:create",
        label: "Create FAQ",
      },
      {
        key: "faq:edit",
        label: "Edit FAQ",
      },
      {
        key: "faq:delete",
        label: "Delete FAQ",
      },
    ],
  },
  {
    key: "media",
    label: "Media",
    permissions: [
      {
        key: "media:view",
        label: "View Media",
      },
      {
        key: "media:upload",
        label: "Upload Media",
      },
      {
        key: "media:delete",
        label: "Delete Media",
      },
    ],
  },
  {
    key: "pages",
    label: "Pages",
    permissions: [
      {
        key: "pages:view",
        label: "View Pages",
      },
      {
        key: "pages:create",
        label: "Create Pages",
      },
      {
        key: "pages:edit",
        label: "Edit Pages",
      },
      {
        key: "pages:delete",
        label: "Delete Pages",
      },
      {
        key: "pages:publish",
        label: "Publish Pages",
      },
    ],
  },
  {
    key: "seo",
    label: "SEO",
    permissions: [
      {
        key: "seo:view",
        label: "View SEO",
      },
      {
        key: "seo:edit",
        label: "Edit SEO",
      },
      {
        key: "seo:redirect:manage",
        label: "Manage Redirects",
      },
    ],
  },
  {
    key: "roles",
    label: "Roles & Permissions",
    permissions: [
      {
        key: "roles:view",
        label: "View Roles",
      },
      {
        key: "roles:create",
        label: "Create Roles",
      },
      {
        key: "roles:edit",
        label: "Edit Roles",
      },
      {
        key: "roles:delete",
        label: "Delete Roles",
      },
      {
        key: "roles:permission:manage",
        label: "Manage Permissions",
      },
    ],
  },
  {
    key: "settings",
    label: "Settings",
    permissions: [
      {
        key: "settings:view",
        label: "View Settings",
      },
      {
        key: "settings:edit",
        label: "Edit Settings",
      },
    ],
  },
  {
    key: "activity_logs",
    label: "Activity Logs",
    permissions: [
      {
        key: "activity_logs:view",
        label: "View Activity Logs",
      },
    ],
  },
  {
    key: "profile",
    label: "Profile",
    permissions: [
      {
        key: "profile:view",
        label: "View Profile",
      },
      {
        key: "profile:edit",
        label: "Edit Profile",
      },
    ],
  },
];

const PermissionMatrix = ({
  role = null,
  permissions = [],
  onSave,
  loading = false,
  readOnly = false,
}) => {
  const [selectedPermissions, setSelectedPermissions] = useState(
    () => new Set(permissions),
  );

  const togglePermission = (permissionKey) => {
    if (readOnly) {
      return;
    }

    setSelectedPermissions((current) => {
      const next = new Set(current);

      if (next.has(permissionKey)) {
        next.delete(permissionKey);
      } else {
        next.add(permissionKey);
      }

      return next;
    });
  };

  const toggleGroup = (group) => {
    if (readOnly) {
      return;
    }

    setSelectedPermissions((current) => {
      const next = new Set(current);

      const allSelected = group.permissions.every((permission) =>
        next.has(permission.key),
      );

      group.permissions.forEach((permission) => {
        if (allSelected) {
          next.delete(permission.key);
        } else {
          next.add(permission.key);
        }
      });

      return next;
    });
  };

  const handleSave = () => {
    onSave?.(Array.from(selectedPermissions));
  };

  const selectedCount = selectedPermissions.size;

  return (
    <div className="permission-matrix">
      <div className="permission-matrix__header">
        <div className="permission-matrix__heading">
          <div className="permission-matrix__icon">
            <Shield size={20} aria-hidden="true" />
          </div>

          <div>
            <h2 className="permission-matrix__title">
              {role?.name ? `${role.name} Permissions` : "Permissions"}
            </h2>

            <p className="permission-matrix__description">
              Select the permissions available to this role.
            </p>
          </div>
        </div>

        <div className="permission-matrix__summary">
          {selectedCount} selected
        </div>
      </div>

      <div className="permission-matrix__table-wrapper">
        <table className="permission-matrix__table">
          <thead>
            <tr>
              <th>Module</th>
              <th>Permission</th>
              <th className="permission-matrix__check-column">Access</th>
            </tr>
          </thead>

          <tbody>
            {PERMISSION_GROUPS.map((group) => {
              const selectedInGroup = group.permissions.filter((permission) =>
                selectedPermissions.has(permission.key),
              ).length;

              const allSelected = selectedInGroup === group.permissions.length;

              const someSelected = selectedInGroup > 0 && !allSelected;

              return group.permissions.map((permission, index) => (
                <tr key={permission.key}>
                  {index === 0 ? (
                    <td
                      rowSpan={group.permissions.length}
                      className="permission-matrix__module"
                    >
                      <div>
                        <strong>{group.label}</strong>

                        {!readOnly && (
                          <button
                            type="button"
                            className="permission-matrix__select-all"
                            onClick={() => toggleGroup(group)}
                          >
                            {allSelected
                              ? "Clear all"
                              : someSelected
                                ? "Select all"
                                : "Select all"}
                          </button>
                        )}
                      </div>
                    </td>
                  ) : null}

                  <td>
                    <span className="permission-matrix__permission">
                      {permission.label}
                    </span>

                    <code>{permission.key}</code>
                  </td>

                  <td className="permission-matrix__check-column">
                    <button
                      type="button"
                      className={`permission-matrix__checkbox ${
                        selectedPermissions.has(permission.key)
                          ? "permission-matrix__checkbox--checked"
                          : ""
                      }`}
                      onClick={() => togglePermission(permission.key)}
                      disabled={readOnly}
                      aria-label={`${selectedPermissions.has(permission.key) ? "Remove" : "Add"} ${permission.label} permission`}
                      aria-pressed={selectedPermissions.has(permission.key)}
                    >
                      {selectedPermissions.has(permission.key) && (
                        <Check size={15} strokeWidth={3} aria-hidden="true" />
                      )}
                    </button>
                  </td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>

      {!readOnly && (
        <div className="permission-matrix__footer">
          <Button
            type="button"
            icon={Save}
            loading={loading}
            onClick={handleSave}
          >
            Save Permissions
          </Button>
        </div>
      )}
    </div>
  );
};

export default PermissionMatrix;

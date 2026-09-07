import { useState } from "react";
import { Plus, Shield, Users } from "lucide-react";

import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import Drawer from "../components/common/Drawer";
import ConfirmDialog from "../components/common/ConfirmDialog";

import RoleForm from "../components/roles/RoleForm";
import RoleTable from "../components/roles/RoleTable";
import PermissionMatrix from "../components/roles/PermissionMatrix";

const INITIAL_ROLES = [
  {
    id: 1,
    name: "Super Admin",
    description: "Full access to all admin features and permissions.",
    userCount: 1,
    permissionCount: 50,
    system: true,
    permissions: [
      "dashboard:view",
      "articles:view",
      "articles:create",
      "articles:edit",
      "articles:delete",
      "articles:publish",
      "categories:view",
      "categories:create",
      "categories:edit",
      "categories:delete",
      "users:view",
      "users:create",
      "users:edit",
      "users:delete",
      "users:status:update",
      "enquiries:view",
      "enquiries:edit",
      "enquiries:delete",
      "faq:view",
      "faq:create",
      "faq:edit",
      "faq:delete",
      "media:view",
      "media:upload",
      "media:delete",
      "pages:view",
      "pages:create",
      "pages:edit",
      "pages:delete",
      "pages:publish",
      "seo:view",
      "seo:edit",
      "seo:redirect:manage",
      "roles:view",
      "roles:create",
      "roles:edit",
      "roles:delete",
      "roles:permission:manage",
      "settings:view",
      "settings:edit",
      "activity_logs:view",
      "profile:view",
      "profile:edit",
    ],
  },
  {
    id: 2,
    name: "Admin",
    description: "Administrative access to content and users.",
    userCount: 2,
    permissionCount: 35,
    system: true,
    permissions: [
      "dashboard:view",
      "articles:view",
      "articles:create",
      "articles:edit",
      "articles:delete",
      "articles:publish",
      "categories:view",
      "categories:create",
      "categories:edit",
      "categories:delete",
      "users:view",
      "users:create",
      "users:edit",
      "users:status:update",
      "enquiries:view",
      "enquiries:edit",
      "faq:view",
      "faq:create",
      "faq:edit",
      "media:view",
      "media:upload",
      "pages:view",
      "pages:create",
      "pages:edit",
      "pages:publish",
      "seo:view",
      "seo:edit",
      "settings:view",
      "profile:view",
      "profile:edit",
    ],
  },
  {
    id: 3,
    name: "Editor",
    description: "Manages articles, pages and other content.",
    userCount: 4,
    permissionCount: 18,
    system: true,
    permissions: [
      "dashboard:view",
      "articles:view",
      "articles:create",
      "articles:edit",
      "articles:publish",
      "categories:view",
      "categories:create",
      "categories:edit",
      "faq:view",
      "faq:create",
      "faq:edit",
      "media:view",
      "media:upload",
      "pages:view",
      "pages:create",
      "pages:edit",
      "pages:publish",
      "profile:view",
      "profile:edit",
    ],
  },
  {
    id: 4,
    name: "Support",
    description: "Handles enquiries and customer support.",
    userCount: 3,
    permissionCount: 8,
    system: true,
    permissions: [
      "dashboard:view",
      "enquiries:view",
      "enquiries:edit",
      "enquiries:delete",
      "faq:view",
      "media:view",
      "profile:view",
      "profile:edit",
    ],
  },
];

const Roles = () => {
  const [roles, setRoles] = useState(INITIAL_ROLES);

  const [createOpen, setCreateOpen] = useState(false);

  const [editRole, setEditRole] = useState(null);

  const [permissionRole, setPermissionRole] = useState(null);

  const [deleteRole, setDeleteRole] = useState(null);

  const handleCreate = (data) => {
    const newRole = {
      id: Date.now(),
      ...data,
      userCount: 0,
      permissionCount: 0,
      permissions: [],
      system: false,
    };

    setRoles((current) => [...current, newRole]);

    setCreateOpen(false);
  };

  const handleUpdate = (data) => {
    if (!editRole) {
      return;
    }

    setRoles((current) =>
      current.map((role) =>
        role.id === editRole.id
          ? {
              ...role,
              ...data,
            }
          : role,
      ),
    );

    setEditRole(null);
  };

  const handleDelete = () => {
    if (!deleteRole) {
      return;
    }

    setRoles((current) => current.filter((role) => role.id !== deleteRole.id));

    setDeleteRole(null);
  };

  const handleSavePermissions = (permissions) => {
    if (!permissionRole) {
      return;
    }

    setRoles((current) =>
      current.map((role) =>
        role.id === permissionRole.id
          ? {
              ...role,
              permissions,
              permissionCount: permissions.length,
            }
          : role,
      ),
    );

    setPermissionRole(null);
  };

  return (
    <div className="roles-page">
      <div className="roles-page__header">
        <div>
          <h1 className="roles-page__title">Roles & Permissions</h1>

          <p className="roles-page__description">
            Manage admin roles and control access to platform features.
          </p>
        </div>

        <Button type="button" icon={Plus} onClick={() => setCreateOpen(true)}>
          Create Role
        </Button>
      </div>

      <div className="roles-page__stats">
        <div className="roles-page__stat">
          <div className="roles-page__stat-icon">
            <Shield size={20} aria-hidden="true" />
          </div>

          <div>
            <span className="roles-page__stat-label">Total Roles</span>

            <strong className="roles-page__stat-value">{roles.length}</strong>
          </div>
        </div>

        <div className="roles-page__stat">
          <div className="roles-page__stat-icon">
            <Users size={20} aria-hidden="true" />
          </div>

          <div>
            <span className="roles-page__stat-label">Assigned Users</span>

            <strong className="roles-page__stat-value">
              {roles.reduce((total, role) => total + (role.userCount || 0), 0)}
            </strong>
          </div>
        </div>
      </div>

      <RoleTable
        roles={roles}
        onEdit={setEditRole}
        onDelete={setDeleteRole}
        onManagePermissions={setPermissionRole}
      />

      {/* Create Role */}

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create Role"
      >
        <RoleForm
          onSubmit={handleCreate}
          onCancel={() => setCreateOpen(false)}
          submitLabel="Create Role"
        />
      </Modal>

      {/* Edit Role */}

      <Modal
        open={Boolean(editRole)}
        onClose={() => setEditRole(null)}
        title="Edit Role"
      >
        {editRole && (
          <RoleForm
            initialValues={editRole}
            onSubmit={handleUpdate}
            onCancel={() => setEditRole(null)}
            submitLabel="Update Role"
          />
        )}
      </Modal>

      {/* Permissions */}

      <Drawer
        open={Boolean(permissionRole)}
        onClose={() => setPermissionRole(null)}
        title="Manage Permissions"
        size="large"
      >
        {permissionRole && (
          <PermissionMatrix
            role={permissionRole}
            permissions={permissionRole.permissions}
            onSave={handleSavePermissions}
          />
        )}
      </Drawer>

      {/* Delete */}

      <ConfirmDialog
        open={Boolean(deleteRole)}
        title="Delete Role"
        description={
          deleteRole
            ? `Are you sure you want to delete the "${deleteRole.name}" role? This action cannot be undone.`
            : ""
        }
        confirmText="Delete Role"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteRole(null)}
      />
    </div>
  );
};

export default Roles;

import { useMemo, useState } from "react";

import UserDetails from "../components/users/UserDetails";
import UserForm from "../components/users/UserForm";
import UserTable from "../components/users/UserTable";

import Modal from "../components/common/Modal";
import Drawer from "../components/common/Drawer";
import ConfirmDialog from "../components/common/ConfirmDialog";
import Pagination from "../components/common/Pagination";
import SearchInput from "../components/common/SearchInput";

import { users as userData } from "../data/users";

const ITEMS_PER_PAGE = 10;

const Users = () => {
  const [users, setUsers] = useState(userData);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return users;
    }

    return users.filter((user) => {
      const name = (user.fullName || user.name || "").toLowerCase();

      const username = (user.username || "").toLowerCase();

      const email = (user.email || "").toLowerCase();

      return (
        name.includes(query) ||
        username.includes(query) ||
        email.includes(query)
      );
    });
  }, [users, search]);

  const totalPages = Math.max(
    Math.ceil(filteredUsers.length / ITEMS_PER_PAGE),
    1,
  );

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setDetailsOpen(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedUser(null);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = async (formData) => {
    setLoading(true);

    try {
      if (editingUser) {
        const editingId = editingUser.id || editingUser._id;

        setUsers((current) =>
          current.map((user) => {
            const userId = user.id || user._id;

            return userId === editingId
              ? {
                  ...user,
                  ...formData,
                }
              : user;
          }),
        );
      } else {
        const newUser = {
          id: `user-${Date.now()}`,
          ...formData,
          createdAt: new Date().toISOString(),
          lastLogin: "",
        };

        setUsers((current) => [newUser, ...current]);
      }

      handleCloseForm();
    } catch (error) {
      console.error("Failed to save user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRequest = (user) => {
    setDeleteUser(user);
  };

  const handleDeleteConfirm = () => {
    if (!deleteUser) {
      return;
    }

    const deleteId = deleteUser.id || deleteUser._id;

    setUsers((current) =>
      current.filter((user) => (user.id || user._id) !== deleteId),
    );

    setDeleteUser(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="users-page">
      <div className="users-page__header">
        <div>
          <h1 className="users-page__title">Users</h1>

          <p className="users-page__description">
            Manage platform users, roles and account status.
          </p>
        </div>
      </div>

      <section className="users-page__content">
        <div className="users-page__toolbar">
          <SearchInput
            value={search}
            onChange={handleSearchChange}
            placeholder="Search users..."
          />

          <div className="users-page__count">
            {filteredUsers.length}{" "}
            {filteredUsers.length === 1 ? "user" : "users"} found
          </div>
        </div>

        <UserTable
          users={paginatedUsers}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDeleteRequest}
        />

        {filteredUsers.length > 0 && (
          <div className="users-page__pagination">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </section>

      <Drawer
        open={detailsOpen}
        onClose={handleCloseDetails}
        title="User Details"
      >
        {selectedUser && <UserDetails user={selectedUser} />}
      </Drawer>

      <Modal
        open={formOpen}
        onClose={handleCloseForm}
        title={editingUser ? "Edit User" : "Add User"}
      >
        <UserForm
          initialValues={editingUser || {}}
          onSubmit={handleSubmit}
          loading={loading}
          submitLabel={editingUser ? "Update User" : "Create User"}
        />
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteUser)}
        title="Delete User"
        description={
          deleteUser
            ? `Are you sure you want to delete "${deleteUser.fullName || deleteUser.name || "this user"}"? This action cannot be undone.`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteUser(null)}
      />
    </div>
  );
};

export default Users;

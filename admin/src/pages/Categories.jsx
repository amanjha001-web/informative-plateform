import { useState } from "react";
import { Plus } from "lucide-react";

import CategoryForm from "../components/categories/CategoryForm";
import CategoryTable from "../components/categories/CategoryTable";
import Modal from "../components/common/Modal";
import ConfirmDialog from "../components/common/ConfirmDialog";

import { categories as categoryData } from "../data/categories";

const Categories = () => {
  const [categories, setCategories] = useState(categoryData);

  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [deleteCategory, setDeleteCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    setEditingCategory(null);
    setFormOpen(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingCategory(null);
  };

  const handleSubmit = async (formData) => {
    setLoading(true);

    try {
      if (editingCategory) {
        setCategories((current) =>
          current.map((category) =>
            (category.id || category._id) ===
            (editingCategory.id || editingCategory._id)
              ? {
                  ...category,
                  ...formData,
                }
              : category,
          ),
        );
      } else {
        const newCategory = {
          id: `category-${Date.now()}`,
          ...formData,
          status: "active",
          articleCount: 0,
        };

        setCategories((current) => [newCategory, ...current]);
      }

      handleCloseForm();
    } catch (error) {
      console.error("Failed to save category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRequest = (category) => {
    setDeleteCategory(category);
  };

  const handleDeleteConfirm = () => {
    if (!deleteCategory) {
      return;
    }

    const deleteId = deleteCategory.id || deleteCategory._id;

    setCategories((current) =>
      current.filter((category) => (category.id || category._id) !== deleteId),
    );

    setDeleteCategory(null);
  };

  return (
    <div className="categories-page">
      <div className="categories-page__header">
        <div>
          <h1 className="categories-page__title">Categories</h1>

          <p className="categories-page__description">
            Manage article categories and organize your platform content.
          </p>
        </div>

        <button
          type="button"
          className="categories-page__add-button"
          onClick={handleAdd}
        >
          <Plus size={18} />
          <span>Add Category</span>
        </button>
      </div>

      <section className="categories-page__content">
        <div className="categories-page__table-header">
          <div>
            <h2 className="categories-page__section-title">All Categories</h2>

            <p className="categories-page__count">
              {categories.length}{" "}
              {categories.length === 1 ? "category" : "categories"} found
            </p>
          </div>
        </div>

        <CategoryTable
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDeleteRequest}
        />
      </section>

      <Modal
        open={formOpen}
        onClose={handleCloseForm}
        title={editingCategory ? "Edit Category" : "Add Category"}
      >
        <CategoryForm
          initialValues={editingCategory || {}}
          onSubmit={handleSubmit}
          loading={loading}
          submitLabel={editingCategory ? "Update Category" : "Create Category"}
        />
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteCategory)}
        title="Delete Category"
        description={
          deleteCategory
            ? `Are you sure you want to delete "${deleteCategory.name}"? This action cannot be undone.`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteCategory(null)}
      />
    </div>
  );
};

export default Categories;

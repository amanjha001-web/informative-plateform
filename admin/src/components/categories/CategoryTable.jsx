import { Edit, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";


import CategoryStatus from "./CategoryStatus";
import EmptyState from "../common/EmptyState";

const CategoryTable = ({ categories = [], onDelete, onEdit }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const handleMenuToggle = (id) => {
    setOpenMenu((current) => (current === id ? null : id));
  };

  const handleDelete = (category) => {
    setOpenMenu(null);
    onDelete?.(category);
  };

  const handleEdit = (category) => {
    setOpenMenu(null);
    onEdit?.(category);
  };

  if (categories.length === 0) {
    return (
      <div className="category-table-empty">
        <EmptyState
          title="No categories found"
          description="There are no categories available to display."
        />
      </div>
    );
  }

  return (
    <div className="category-table-wrapper">
      <table className="category-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Slug</th>
            <th>Description</th>
            <th>Articles</th>
            <th>Status</th>
            <th className="category-table__actions-header">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => {
            const categoryId = category.id || category._id;

            return (
              <tr key={categoryId}>
                <td>
                  <div className="category-table__name-wrapper">
                    <div className="category-table__icon">
                      {category.name?.charAt(0).toUpperCase() || "C"}
                    </div>

                    <div className="category-table__name-content">
                      <span className="category-table__name">
                        {category.name || "Unnamed Category"}
                      </span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="category-table__slug">
                    {category.slug ? `/${category.slug}` : "—"}
                  </span>
                </td>

                <td>
                  <span className="category-table__description">
                    {category.description || "—"}
                  </span>
                </td>

                <td>
                  <span className="category-table__count">
                    {category.articleCount ?? 0}
                  </span>
                </td>

                <td>
                  <CategoryStatus status={category.status} />
                </td>

                <td>
                  <div className="category-table__actions">
                    <button
                      type="button"
                      className="category-table__action"
                      title="Edit category"
                      onClick={() => handleEdit(category)}
                    >
                      <Edit size={17} />
                    </button>

                    <div className="category-table__menu">
                      <button
                        type="button"
                        className="category-table__action"
                        title="More actions"
                        aria-expanded={openMenu === categoryId}
                        onClick={() => handleMenuToggle(categoryId)}
                      >
                        <MoreVertical size={17} />
                      </button>

                      {openMenu === categoryId && (
                        <div className="category-table__dropdown">
                          <button
                            type="button"
                            className="category-table__dropdown-item"
                            onClick={() => handleEdit(category)}
                          >
                            <Edit size={16} />
                            <span>Edit</span>
                          </button>

                          <button
                            type="button"
                            className="category-table__dropdown-item category-table__dropdown-item--danger"
                            onClick={() => handleDelete(category)}
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

export default CategoryTable;

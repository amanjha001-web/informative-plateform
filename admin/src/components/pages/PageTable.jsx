import { Edit, Eye, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";

import Badge from "../common/Badge";
import EmptyState from "../common/EmptyState";

const PageTable = ({ pages = [], onEdit, onView, onDelete }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const getStatusConfig = (status = "") => {
    switch (status.toLowerCase()) {
      case "published":
        return {
          label: "Published",
          variant: "success",
        };

      case "draft":
        return {
          label: "Draft",
          variant: "warning",
        };

      case "archived":
        return {
          label: "Archived",
          variant: "default",
        };

      default:
        return {
          label: status || "Unknown",
          variant: "default",
        };
    }
  };

  const handleAction = (action, page) => {
    setOpenMenu(null);
    action?.(page);
  };

  if (pages.length === 0) {
    return (
      <div className="page-table-empty">
        <EmptyState
          title="No pages found"
          description="There are no pages available to display."
        />
      </div>
    );
  }

  return (
    <div className="page-table-wrapper">
      <table className="page-table">
        <thead>
          <tr>
            <th>Page</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Updated</th>
            <th className="page-table__actions-header">Actions</th>
          </tr>
        </thead>

        <tbody>
          {pages.map((page) => {
            const pageId = page.id || page._id;
            const statusConfig = getStatusConfig(page.status);

            return (
              <tr key={pageId}>
                <td>
                  <div className="page-table__title">
                    <strong>{page.title || "Untitled Page"}</strong>

                    {page.excerpt && (
                      <span title={page.excerpt}>{page.excerpt}</span>
                    )}
                  </div>
                </td>

                <td>
                  <span className="page-table__slug">/{page.slug || "—"}</span>
                </td>

                <td>
                  <Badge variant={statusConfig.variant} size="sm" dot>
                    {statusConfig.label}
                  </Badge>
                </td>

                <td>
                  <span className="page-table__date">
                    {page.updatedAt || "—"}
                  </span>
                </td>

                <td>
                  <div className="page-table__actions">
                    <button
                      type="button"
                      className="page-table__action"
                      title="View page"
                      onClick={() => handleAction(onView, page)}
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      type="button"
                      className="page-table__action"
                      title="Edit page"
                      onClick={() => handleAction(onEdit, page)}
                    >
                      <Edit size={16} />
                    </button>

                    <div className="page-table__menu">
                      <button
                        type="button"
                        className="page-table__action"
                        title="More actions"
                        aria-expanded={openMenu === pageId}
                        onClick={() =>
                          setOpenMenu(openMenu === pageId ? null : pageId)
                        }
                      >
                        <MoreVertical size={16} />
                      </button>

                      {openMenu === pageId && (
                        <div className="page-table__dropdown">
                          <button
                            type="button"
                            className="page-table__dropdown-item"
                            onClick={() => handleAction(onView, page)}
                          >
                            <Eye size={15} />
                            <span>View</span>
                          </button>

                          <button
                            type="button"
                            className="page-table__dropdown-item"
                            onClick={() => handleAction(onEdit, page)}
                          >
                            <Edit size={15} />
                            <span>Edit</span>
                          </button>

                          <button
                            type="button"
                            className="page-table__dropdown-item page-table__dropdown-item--danger"
                            onClick={() => handleAction(onDelete, page)}
                          >
                            <Trash2 size={15} />
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

export default PageTable;

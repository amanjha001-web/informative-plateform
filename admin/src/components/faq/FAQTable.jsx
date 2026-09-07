import { Edit, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";

import Badge from "../common/Badge";
import EmptyState from "../common/EmptyState";

const FAQTable = ({ faqs = [], onEdit, onDelete }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const handleMenuToggle = (id) => {
    setOpenMenu((current) => (current === id ? null : id));
  };

  const handleEdit = (faq) => {
    setOpenMenu(null);
    onEdit?.(faq);
  };

  const handleDelete = (faq) => {
    setOpenMenu(null);
    onDelete?.(faq);
  };

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return {
          label: "Active",
          variant: "success",
        };

      case "inactive":
        return {
          label: "Inactive",
          variant: "default",
        };

      default:
        return {
          label: status || "Unknown",
          variant: "default",
        };
    }
  };

  if (faqs.length === 0) {
    return (
      <div className="faq-table-empty">
        <EmptyState
          title="No FAQs found"
          description="There are no frequently asked questions available to display."
        />
      </div>
    );
  }

  return (
    <div className="faq-table-wrapper">
      <table className="faq-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Category</th>
            <th>Answer</th>
            <th>Status</th>
            <th>Updated</th>
            <th className="faq-table__actions-header">Actions</th>
          </tr>
        </thead>

        <tbody>
          {faqs.map((faq) => {
            const faqId = faq.id || faq._id;
            const statusConfig = getStatusConfig(faq.status);

            return (
              <tr key={faqId}>
                <td>
                  <div className="faq-table__question-wrapper">
                    <div className="faq-table__icon">?</div>

                    <span className="faq-table__question">
                      {faq.question || "Untitled Question"}
                    </span>
                  </div>
                </td>

                <td>
                  <Badge variant="default" size="sm">
                    {faq.category || "General"}
                  </Badge>
                </td>

                <td>
                  <span className="faq-table__answer">
                    {faq.answer || "No answer available."}
                  </span>
                </td>

                <td>
                  <Badge variant={statusConfig.variant} size="sm" dot>
                    {statusConfig.label}
                  </Badge>
                </td>

                <td>
                  <span className="faq-table__date">
                    {faq.updatedAt || faq.createdAt || "—"}
                  </span>
                </td>

                <td>
                  <div className="faq-table__actions">
                    <button
                      type="button"
                      className="faq-table__action"
                      title="Edit FAQ"
                      onClick={() => handleEdit(faq)}
                    >
                      <Edit size={17} />
                    </button>

                    <div className="faq-table__menu">
                      <button
                        type="button"
                        className="faq-table__action"
                        title="More actions"
                        aria-expanded={openMenu === faqId}
                        onClick={() => handleMenuToggle(faqId)}
                      >
                        <MoreVertical size={17} />
                      </button>

                      {openMenu === faqId && (
                        <div className="faq-table__dropdown">
                          <button
                            type="button"
                            className="faq-table__dropdown-item"
                            onClick={() => handleEdit(faq)}
                          >
                            <Edit size={16} />
                            <span>Edit</span>
                          </button>

                          <button
                            type="button"
                            className="faq-table__dropdown-item faq-table__dropdown-item--danger"
                            onClick={() => handleDelete(faq)}
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

export default FAQTable;

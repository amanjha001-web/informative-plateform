import { Eye, Mail, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";

import Badge from "../common/Badge";
import EmptyState from "../common/EmptyState";

const EnquiryTable = ({ enquiries = [], onView, onDelete, onStatusChange }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const handleMenuToggle = (id) => {
    setOpenMenu((current) => (current === id ? null : id));
  };

  const handleView = (enquiry) => {
    setOpenMenu(null);
    onView?.(enquiry);
  };

  const handleDelete = (enquiry) => {
    setOpenMenu(null);
    onDelete?.(enquiry);
  };

  const handleStatusChange = (enquiry, status) => {
    setOpenMenu(null);
    onStatusChange?.(enquiry, status);
  };

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return {
          label: "Pending",
          variant: "warning",
        };

      case "replied":
        return {
          label: "Replied",
          variant: "success",
        };

      case "resolved":
        return {
          label: "Resolved",
          variant: "info",
        };

      case "closed":
        return {
          label: "Closed",
          variant: "default",
        };

      default:
        return {
          label: status || "Unknown",
          variant: "default",
        };
    }
  };

  if (enquiries.length === 0) {
    return (
      <div className="enquiry-table-empty">
        <EmptyState
          title="No enquiries found"
          description="There are no enquiries matching your current filters."
        />
      </div>
    );
  }

  return (
    <div className="enquiry-table-wrapper">
      <table className="enquiry-table">
        <thead>
          <tr>
            <th>Contact</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Status</th>
            <th>Received</th>
            <th className="enquiry-table__actions-header">Actions</th>
          </tr>
        </thead>

        <tbody>
          {enquiries.map((enquiry) => {
            const enquiryId = enquiry.id || enquiry._id;

            const name = enquiry.name || "Unknown User";

            const statusConfig = getStatusConfig(enquiry.status);

            return (
              <tr key={enquiryId}>
                <td>
                  <div className="enquiry-table__contact">
                    <div className="enquiry-table__avatar">
                      {name.charAt(0).toUpperCase()}
                    </div>

                    <div className="enquiry-table__contact-info">
                      <span className="enquiry-table__name">{name}</span>

                      <span className="enquiry-table__email">
                        {enquiry.email || "—"}
                      </span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="enquiry-table__subject">
                    {enquiry.subject || "No subject"}
                  </span>
                </td>

                <td>
                  <span className="enquiry-table__message">
                    {enquiry.message || "No message available."}
                  </span>
                </td>

                <td>
                  <Badge variant={statusConfig.variant} size="sm" dot>
                    {statusConfig.label}
                  </Badge>
                </td>

                <td>
                  <span className="enquiry-table__date">
                    {enquiry.createdAt || "—"}
                  </span>
                </td>

                <td>
                  <div className="enquiry-table__actions">
                    <button
                      type="button"
                      className="enquiry-table__action"
                      title="View enquiry"
                      onClick={() => handleView(enquiry)}
                    >
                      <Eye size={17} />
                    </button>

                    <a
                      href={enquiry.email ? `mailto:${enquiry.email}` : "#"}
                      className={`enquiry-table__action ${
                        !enquiry.email ? "enquiry-table__action--disabled" : ""
                      }`}
                      title="Send email"
                      onClick={(event) => {
                        if (!enquiry.email) {
                          event.preventDefault();
                        }
                      }}
                    >
                      <Mail size={17} />
                    </a>

                    <div className="enquiry-table__menu">
                      <button
                        type="button"
                        className="enquiry-table__action"
                        title="More actions"
                        aria-expanded={openMenu === enquiryId}
                        onClick={() => handleMenuToggle(enquiryId)}
                      >
                        <MoreVertical size={17} />
                      </button>

                      {openMenu === enquiryId && (
                        <div className="enquiry-table__dropdown">
                          <button
                            type="button"
                            className="enquiry-table__dropdown-item"
                            onClick={() => handleView(enquiry)}
                          >
                            <Eye size={16} />
                            <span>View</span>
                          </button>

                          <button
                            type="button"
                            className="enquiry-table__dropdown-item"
                            onClick={() =>
                              handleStatusChange(enquiry, "replied")
                            }
                          >
                            <Mail size={16} />
                            <span>Mark Replied</span>
                          </button>

                          <button
                            type="button"
                            className="enquiry-table__dropdown-item"
                            onClick={() =>
                              handleStatusChange(enquiry, "resolved")
                            }
                          >
                            <Eye size={16} />
                            <span>Mark Resolved</span>
                          </button>

                          <button
                            type="button"
                            className="enquiry-table__dropdown-item enquiry-table__dropdown-item--danger"
                            onClick={() => handleDelete(enquiry)}
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

export default EnquiryTable;

import { ArrowRight, Mail, Phone,  } from "lucide-react";
import { Link } from "react-router-dom";

import Badge from "../common/Badge";
import EmptyState from "../common/EmptyState";

const RecentEnquiries = ({
  enquiries = [],
  title = "Recent Enquiries",
  description = "Latest enquiries received from users",
}) => {
  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "new":
        return "info";

      case "pending":
        return "warning";

      case "resolved":
        return "success";

      case "closed":
        return "default";

      default:
        return "default";
    }
  };

  return (
    <section className="dashboard-list-card">
      <div className="dashboard-list-card__header">
        <div>
          <h3 className="dashboard-list-card__title">{title}</h3>

          <p className="dashboard-list-card__description">{description}</p>
        </div>

        <Link to="/admin/enquiries" className="dashboard-list-card__view-all">
          View all
          <ArrowRight size={15} />
        </Link>
      </div>

      <div className="dashboard-enquiries-list">
        {enquiries.length === 0 ? (
          <EmptyState
            icon={Mail}
            title="No enquiries found"
            description="There are no recent enquiries to display."
          />
        ) : (
          enquiries.map((enquiry) => (
            <article
              key={enquiry.id || enquiry._id}
              className="dashboard-enquiry-item"
            >
              <div className="dashboard-enquiry-item__avatar">
                {enquiry.name ? enquiry.name.charAt(0).toUpperCase() : "U"}
              </div>

              <div className="dashboard-enquiry-item__content">
                <h4 className="dashboard-enquiry-item__name">
                  {enquiry.name || "Unknown User"}
                </h4>

                <div className="dashboard-enquiry-item__details">
                  {enquiry.email && (
                    <span>
                      <Mail size={12} />
                      {enquiry.email}
                    </span>
                  )}

                  {enquiry.phone && (
                    <span>
                      <Phone size={12} />
                      {enquiry.phone}
                    </span>
                  )}
                </div>

                {enquiry.subject && (
                  <p className="dashboard-enquiry-item__subject">
                    {enquiry.subject}
                  </p>
                )}

                {enquiry.date && (
                  <span className="dashboard-enquiry-item__date">
                    {enquiry.date}
                  </span>
                )}
              </div>

              <div className="dashboard-enquiry-item__status">
                <Badge variant={getStatusVariant(enquiry.status)} size="sm" dot>
                  {enquiry.status || "New"}
                </Badge>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default RecentEnquiries;

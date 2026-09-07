import { Calendar, Mail, MessageSquare, Phone, User } from "lucide-react";

import Badge from "../common/Badge";

const EnquiryDetails = ({ enquiry = {} }) => {
  const {
    name = "Unknown User",
    email = "No email available",
    phone = "",
    subject = "No subject",
    message = "No message available.",
    status = "pending",
    createdAt = "",
  } = enquiry;

  const normalizedStatus = status.toLowerCase();

  const statusConfig = {
    pending: {
      label: "Pending",
      variant: "warning",
    },
    replied: {
      label: "Replied",
      variant: "success",
    },
    resolved: {
      label: "Resolved",
      variant: "info",
    },
    closed: {
      label: "Closed",
      variant: "default",
    },
  };

  const config = statusConfig[normalizedStatus] || {
    label: status || "Unknown",
    variant: "default",
  };

  return (
    <div className="enquiry-details">
      <div className="enquiry-details__header">
        <div className="enquiry-details__icon">
          <MessageSquare size={20} />
        </div>

        <div className="enquiry-details__heading">
          <h3 className="enquiry-details__subject">{subject}</h3>

          <div className="enquiry-details__status">
            <Badge variant={config.variant} size="sm" dot>
              {config.label}
            </Badge>
          </div>
        </div>
      </div>

      <div className="enquiry-details__divider" />

      <div className="enquiry-details__info">
        <div className="enquiry-details__info-item">
          <div className="enquiry-details__info-icon">
            <User size={17} />
          </div>

          <div>
            <span className="enquiry-details__info-label">Name</span>

            <strong className="enquiry-details__info-value">{name}</strong>
          </div>
        </div>

        <div className="enquiry-details__info-item">
          <div className="enquiry-details__info-icon">
            <Mail size={17} />
          </div>

          <div>
            <span className="enquiry-details__info-label">Email</span>

            <strong className="enquiry-details__info-value">{email}</strong>
          </div>
        </div>

        {phone && (
          <div className="enquiry-details__info-item">
            <div className="enquiry-details__info-icon">
              <Phone size={17} />
            </div>

            <div>
              <span className="enquiry-details__info-label">Phone</span>

              <strong className="enquiry-details__info-value">{phone}</strong>
            </div>
          </div>
        )}

        <div className="enquiry-details__info-item">
          <div className="enquiry-details__info-icon">
            <Calendar size={17} />
          </div>

          <div>
            <span className="enquiry-details__info-label">Received</span>

            <strong className="enquiry-details__info-value">
              {createdAt || "—"}
            </strong>
          </div>
        </div>
      </div>

      <div className="enquiry-details__message-section">
        <span className="enquiry-details__message-label">Message</span>

        <div className="enquiry-details__message">{message}</div>
      </div>
    </div>
  );
};

export default EnquiryDetails;

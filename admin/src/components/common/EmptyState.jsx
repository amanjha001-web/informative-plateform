import { Inbox } from "lucide-react";

const EmptyState = ({
  title = "No data found",
  description = "",
  icon: Icon = Inbox,
  action = null,
}) => {
  return (
    <div className="ui-empty-state">
      <div className="ui-empty-state__icon">
        <Icon size={28} />
      </div>

      <h3 className="ui-empty-state__title">{title}</h3>

      {description && (
        <p className="ui-empty-state__description">{description}</p>
      )}

      {action && <div className="ui-empty-state__action">{action}</div>}
    </div>
  );
};

export default EmptyState;

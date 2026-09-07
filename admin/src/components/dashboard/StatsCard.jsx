import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

const StatsCard = ({
  title,
  value,
  change = null,
  changeType = "neutral",
  icon: Icon,
  description = "",
}) => {
  const getChangeIcon = () => {
    if (changeType === "increase") {
      return <ArrowUpRight size={15} />;
    }

    if (changeType === "decrease") {
      return <ArrowDownRight size={15} />;
    }

    return <Minus size={15} />;
  };

  return (
    <div className="dashboard-stat-card">
      <div className="dashboard-stat-card__top">
        <div className="dashboard-stat-card__icon">
          {Icon && <Icon size={21} />}
        </div>

        {change !== null && (
          <div
            className={`dashboard-stat-card__change dashboard-stat-card__change--${changeType}`}
          >
            {getChangeIcon()}
            <span>{change}</span>
          </div>
        )}
      </div>

      <div className="dashboard-stat-card__content">
        <p className="dashboard-stat-card__title">{title}</p>

        <h3 className="dashboard-stat-card__value">{value}</h3>

        {description && (
          <p className="dashboard-stat-card__description">{description}</p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;

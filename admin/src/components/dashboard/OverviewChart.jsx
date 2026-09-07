import { BarChart3 } from "lucide-react";

const OverviewChart = ({
  title = "Content Overview",
  description = "Content activity overview",
  data = [],
}) => {
  const maxValue = Math.max(...data.map((item) => item.value || 0), 1);

  return (
    <section className="dashboard-chart-card">
      <div className="dashboard-chart-card__header">
        <div>
          <h3 className="dashboard-chart-card__title">{title}</h3>

          <p className="dashboard-chart-card__description">{description}</p>
        </div>

        <div className="dashboard-chart-card__icon">
          <BarChart3 size={20} />
        </div>
      </div>

      <div className="dashboard-overview-chart">
        {data.length === 0 ? (
          <div className="dashboard-chart-card__empty">
            No overview data available
          </div>
        ) : (
          <div className="dashboard-overview-chart__bars">
            {data.map((item) => {
              const height = Math.max(((item.value || 0) / maxValue) * 100, 4);

              return (
                <div
                  key={item.id || item.label}
                  className="dashboard-overview-chart__item"
                >
                  <div className="dashboard-overview-chart__value">
                    {item.value}
                  </div>

                  <div className="dashboard-overview-chart__bar-wrapper">
                    <div
                      className="dashboard-overview-chart__bar"
                      style={{
                        height: `${height}%`,
                      }}
                      title={`${item.label}: ${item.value}`}
                    />
                  </div>

                  <span className="dashboard-overview-chart__label">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default OverviewChart;

import { Activity } from "lucide-react";

const TrafficChart = ({
  title = "Traffic Overview",
  description = "Visitors and page views",
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
          <Activity size={20} />
        </div>
      </div>

      <div className="dashboard-traffic-chart">
        {data.length === 0 ? (
          <div className="dashboard-chart-card__empty">
            No traffic data available
          </div>
        ) : (
          <>
            <div className="dashboard-traffic-chart__grid">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>

            <div className="dashboard-traffic-chart__bars">
              {data.map((item) => {
                const height = Math.max(
                  ((item.value || 0) / maxValue) * 100,
                  3,
                );

                return (
                  <div
                    key={item.id || item.label}
                    className="dashboard-traffic-chart__item"
                  >
                    <div className="dashboard-traffic-chart__bar-area">
                      <div
                        className="dashboard-traffic-chart__bar"
                        style={{
                          height: `${height}%`,
                        }}
                        title={`${item.label}: ${item.value}`}
                      />
                    </div>

                    <span className="dashboard-traffic-chart__label">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TrafficChart;

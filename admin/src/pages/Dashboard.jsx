import { FileText, Folder, MessageSquare, Users } from "lucide-react";

import StatsCard from "../components/dashboard/StatsCard";
import OverviewChart from "../components/dashboard/OverviewChart";
import TrafficChart from "../components/dashboard/TrafficChart";
import RecentArticles from "../components/dashboard/RecentArticles";
import RecentEnquiries from "../components/dashboard/RecentEnquiries";
import ActivityFeed from "../components/dashboard/ActivityFeed";

import {
  dashboardStats,
  overviewData,
  trafficData,
  recentArticles,
  recentEnquiries,
  activities,
} from "../data/dashboard";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Articles",
      value: dashboardStats.totalArticles,
      change: dashboardStats.articlesChange,
      changeType: "increase",
      icon: FileText,
      description: "Published and draft articles",
    },
    {
      title: "Total Users",
      value: dashboardStats.totalUsers,
      change: dashboardStats.usersChange,
      changeType: "increase",
      icon: Users,
      description: "Registered platform users",
    },
    {
      title: "Categories",
      value: dashboardStats.totalCategories,
      change: dashboardStats.categoriesChange,
      changeType: "neutral",
      icon: Folder,
      description: "Active content categories",
    },
    {
      title: "Enquiries",
      value: dashboardStats.totalEnquiries,
      change: dashboardStats.enquiriesChange,
      changeType: "increase",
      icon: MessageSquare,
      description: "Total enquiries received",
    },
  ];

  return (
    <div className="dashboard-page">
      {/* Page Header */}
      <div className="dashboard-page__header">
        <div>
          <h1 className="dashboard-page__title">Dashboard</h1>

          <p className="dashboard-page__description">
            Overview of your platform activity and performance.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <section className="dashboard-stats-grid">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={stat.icon}
            description={stat.description}
          />
        ))}
      </section>

      {/* Charts */}
      <section className="dashboard-charts-grid">
        <OverviewChart data={overviewData} />

        <TrafficChart data={trafficData} />
      </section>

      {/* Recent Data */}
      <section className="dashboard-lists-grid">
        <RecentArticles articles={recentArticles} />

        <RecentEnquiries enquiries={recentEnquiries} />
      </section>

      {/* Activity */}
      <section className="dashboard-activity-grid">
        <ActivityFeed activities={activities} />
      </section>
    </div>
  );
};

export default Dashboard;

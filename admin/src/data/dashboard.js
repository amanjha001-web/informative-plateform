export const dashboardStats = Object.freeze({
  totalArticles: 128,
  totalUsers: 2456,
  totalCategories: 18,
  totalEnquiries: 342,

  articlesChange: "+12.5%",
  usersChange: "+8.2%",
  categoriesChange: "0%",
  enquiriesChange: "+15.4%",
});

export const overviewData = Object.freeze([
  {
    id: "articles",
    label: "Articles",
    value: 128,
  },
  {
    id: "pages",
    label: "Pages",
    value: 24,
  },
  {
    id: "faq",
    label: "FAQ",
    value: 56,
  },
  {
    id: "categories",
    label: "Categories",
    value: 18,
  },
  {
    id: "users",
    label: "Users",
    value: 2456,
  },
  {
    id: "enquiries",
    label: "Enquiries",
    value: 342,
  },
]);

export const trafficData = Object.freeze([
  {
    id: "mon",
    label: "Mon",
    value: 420,
  },
  {
    id: "tue",
    label: "Tue",
    value: 580,
  },
  {
    id: "wed",
    label: "Wed",
    value: 490,
  },
  {
    id: "thu",
    label: "Thu",
    value: 720,
  },
  {
    id: "fri",
    label: "Fri",
    value: 650,
  },
  {
    id: "sat",
    label: "Sat",
    value: 810,
  },
  {
    id: "sun",
    label: "Sun",
    value: 760,
  },
]);

export const recentArticles = Object.freeze([
  {
    id: "article-1",
    title: "Complete Guide to Modern Web Development",
    category: "Technology",
    author: "Admin",
    date: "Today",
    status: "published",
  },
  {
    id: "article-2",
    title: "Understanding Artificial Intelligence",
    category: "Technology",
    author: "Admin",
    date: "Yesterday",
    status: "draft",
  },
  {
    id: "article-3",
    title: "Top Programming Languages in 2026",
    category: "Programming",
    author: "Editor",
    date: "2 days ago",
    status: "published",
  },
  {
    id: "article-4",
    title: "Introduction to Cloud Computing",
    category: "Cloud",
    author: "Admin",
    date: "3 days ago",
    status: "published",
  },
]);

export const recentEnquiries = Object.freeze([
  {
    id: "enquiry-1",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 98765 43210",
    subject: "Need information about your services",
    status: "new",
    date: "Today, 10:30 AM",
  },
  {
    id: "enquiry-2",
    name: "Priya Singh",
    email: "priya@example.com",
    subject: "Article suggestion",
    status: "pending",
    date: "Yesterday",
  },
  {
    id: "enquiry-3",
    name: "Amit Kumar",
    email: "amit@example.com",
    phone: "+91 91234 56789",
    subject: "General enquiry",
    status: "resolved",
    date: "2 days ago",
  },
  {
    id: "enquiry-4",
    name: "Neha Verma",
    email: "neha@example.com",
    subject: "Partnership enquiry",
    status: "new",
    date: "3 days ago",
  },
]);

export const activities = Object.freeze([
  {
    id: "activity-1",
    type: "article_created",
    message: "New article created: Complete Guide to React",
    user: "Admin",
    date: "10 minutes ago",
  },
  {
    id: "activity-2",
    type: "article_updated",
    message: "Article updated: Modern JavaScript Guide",
    user: "Editor",
    date: "30 minutes ago",
  },
  {
    id: "activity-3",
    type: "user_created",
    message: "New user registered",
    user: "Admin",
    date: "1 hour ago",
  },
  {
    id: "activity-4",
    type: "login",
    message: "Admin logged into the dashboard",
    user: "Admin",
    date: "2 hours ago",
  },
  {
    id: "activity-5",
    type: "deleted",
    message: "Article moved to trash",
    user: "Admin",
    date: "3 hours ago",
  },
]);

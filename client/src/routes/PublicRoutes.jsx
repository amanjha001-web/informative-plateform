import PublicLayout from "../layouts/PublicLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Articles from "../pages/Articles";
import ArticleDetails from "../pages/ArticleDetails";
import Categories from "../pages/Categories";
import CategoryDetails from "../pages/CategoryDetails";
import Search from "../pages/Search";
import FAQ from "../pages/FAQ";
import Contact from "../pages/Contact";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Terms from "../pages/Terms";
import NotFound from "../pages/NotFound";

const PublicRoutes = {
  element: <PublicLayout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },

    {
      path: "/about",
      element: <About />,
    },

    {
      path: "/articles",
      element: <Articles />,
    },

    {
      path: "/articles/:slug",
      element: <ArticleDetails />,
    },

    {
      path: "/categories",
      element: <Categories />,
    },

    {
      path: "/categories/:slug",
      element: <CategoryDetails />,
    },

    {
      path: "/search",
      element: <Search />,
    },

    {
      path: "/faq",
      element: <FAQ />,
    },

    {
      path: "/contact",
      element: <Contact />,
    },

    {
      path: "/privacy-policy",
      element: <PrivacyPolicy />,
    },

    {
      path: "/terms",
      element: <Terms />,
    },

    {
      path: "*",
      element: <NotFound />,
    },
  ],
};

export default PublicRoutes;

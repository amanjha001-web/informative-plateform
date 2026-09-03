import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/layout/ScrollToTop";

const PublicLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[rgb(var(--background))] text-[rgb(var(--foreground))]">
      <ScrollToTop />

      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;

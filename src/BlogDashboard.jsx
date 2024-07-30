import { useState } from "react";
import UpdateBlog from "./BlogCatagoryComponents/UpdateBlog";
import UpdateUserDetails from "./BlogCatagoryComponents/UpdateUserDetails";
import ChangeUserPassword from "./BlogCatagoryComponents/ChangeUserPassword";
import BlogEditor from "./BlogEditor";
import YourBlogs from "./BlogCatagoryComponents/YourBlogs";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("YourBlogs");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "YourBlogs":
        return <YourBlogs />;
      case "create":
        return <BlogEditor />;
      case "update":
        return <UpdateBlog />;
      case "updateDetails":
        return <UpdateUserDetails />;
      case "changePassword":
        return <ChangeUserPassword />;
      default:
        return <YourBlogs />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <nav className="hidden md:w-64 md:block bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
        <ul className="mt-4">
          {["Your Blogs", "create", "update", "updateDetails", "changePassword"].map((tab) => (
            <li key={tab}>
              <button
                className={`block w-full text-left px-4 py-2 ${
                  activeTab === tab ? "bg-gray-200" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1').trim()}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-md">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile Menu */}
      <nav
        className={`md:hidden bg-white shadow-md absolute top-0 left-0 w-full transition-transform transform ${
          isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
        style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
      >
        <ul className="mt-4">
          {["YourBlogs", "create", "update", "updateDetails", "changePassword"].map((tab) => (
            <li key={tab}>
              <button
                className={`block w-full text-left px-4 py-2 ${
                  activeTab === tab ? "bg-gray-200" : ""
                }`}
                onClick={() => {
                  setActiveTab(tab);
                  setIsMobileMenuOpen(false); // Close menu on item click
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1').trim()}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main className="flex-1 p-8">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;

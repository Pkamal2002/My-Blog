import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import UserContext from "./context/UserContext";
import { useAuth } from "./context/AuthContext";

const Nav = () => {
  const {setUser } = useContext(UserContext);
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(
          "https://prafullblog.site/api/v1/users/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        localStorage.removeItem("token");
        setUser(null); // Update the user context
        logout(); // Update the authentication state
        toast.success("Logged out successfully!");
        navigate("/login");
        window.location.reload(); // Refresh the page
      } else {
        toast.error("You are not logged in");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error(
        error.response?.data?.message || "Failed to log out. Please try again."
      );
    }
  };

  return (
    <nav className="bg-gray-200 shadow-2xl  shadow-slate-900 p-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <img
                  className="h-16 w-16 rounded-full"
                  src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-lg font-medium hover:border-blue-500 hover:text-gray-700"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-lg font-medium hover:border-blue-500 hover:text-gray-700"
              >
                About
              </Link>
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-lg font-medium hover:border-blue-500 hover:text-gray-700"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="ml-4 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-lg font-medium hover:border-blue-500 hover:text-gray-700"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="ml-4 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-lg font-medium hover:border-blue-500 hover:text-gray-700"
              >
                Logout
              </button>
            )}
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    className="inline-flex"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    className="inline-flex"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block pl-3 pr-4 py-2 rounded-lg border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block pl-3 pr-4 py-2 rounded-lg border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            >
              About
            </Link>
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="block pl-3 pr-4 py-2 rounded-lg border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block pl-3 pr-4 py-2 rounded-lg border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="block pl-3 pr-4 py-2 rounded-lg border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;

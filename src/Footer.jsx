import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <Link to="/">
              <img
                className="h-10  w-10 rounded-full"
                src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <nav className="flex space-x-4">
              <Link to="/" className="text-gray-400 hover:text-gray-200">
                Home
              </Link>
              <Link to="/about" className="text-gray-400 hover:text-gray-200">
                About
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-gray-200">
                Contact
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-gray-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-gray-200">
                Terms of Service
              </Link>
            </nav>
          </div>
          <div className="w-full sm:w-auto">
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-gray-200"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35c-.729 0-1.325.596-1.325 1.325v21.351c0 .729.596 1.324 1.325 1.324h11.494v-9.294h-3.125v-3.622h3.125v-2.667c0-3.1 1.891-4.785 4.655-4.785 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.762v2.307h3.587l-.467 3.622h-3.12v9.293h6.116c.729 0 1.325-.596 1.325-1.324v-21.351c0-.729-.596-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-gray-200"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.954 4.569c-.885.39-1.83.654-2.825.775 1.014-.607 1.794-1.569 2.163-2.724-.951.555-2.005.96-3.127 1.184-.897-.956-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.088-.205-7.72-2.165-10.148-5.144-.424.725-.666 1.56-.666 2.456 0 1.693.862 3.188 2.173 4.065-.801-.026-1.555-.245-2.21-.611v.062c0 2.366 1.683 4.342 3.918 4.788-.41.112-.843.172-1.292.172-.315 0-.623-.031-.924-.088.623 1.944 2.432 3.355 4.576 3.396-1.675 1.31-3.786 2.092-6.081 2.092-.395 0-.779-.023-1.16-.068 2.168 1.394 4.744 2.21 7.516 2.21 9.025 0 13.967-7.481 13.967-13.966 0-.21 0-.423-.016-.633.959-.693 1.79-1.56 2.448-2.548l-.047-.02z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-400 hover:text-gray-200"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.23 0h-20.46c-.976 0-1.77.794-1.77 1.77v20.46c0 .976.794 1.77 1.77 1.77h20.459c.977 0 1.771-.794 1.771-1.77v-20.46c0-.976-.794-1.77-1.77-1.77zm-14.923 20.454h-3.539v-11.403h3.539v11.403zm-1.769-12.958c-1.131 0-2.05-.92-2.05-2.051 0-1.132.919-2.052 2.05-2.052s2.051.92 2.051 2.052c0 1.131-.92 2.051-2.051 2.051zm14.692 12.958h-3.537v-5.55c0-1.32-.026-3.016-1.84-3.016-1.842 0-2.123 1.438-2.123 2.926v5.64h-3.537v-11.403h3.396v1.557h.049c.474-.897 1.633-1.838 3.362-1.838 3.594 0 4.257 2.364 4.257 5.438v6.246z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

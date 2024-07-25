const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center">
        <svg
          className="animate-spin h-10 w-10 text-gray-800 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.292A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.646z"
          ></path>
        </svg>
        <p className="text-gray-800 text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;

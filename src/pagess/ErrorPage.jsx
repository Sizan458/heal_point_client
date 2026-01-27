import { useEffect } from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4 transition-all duration-300">
      <h1 className="text-5xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mt-2">
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/" className="mt-4 px-6 py-2 bg-blue-500 text-white text-lg rounded-lg shadow-md hover:bg-blue-600 transition">
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;

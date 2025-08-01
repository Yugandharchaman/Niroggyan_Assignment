import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold text-red-500">404 - Page Not Found</h1>
      <Link
        to="/"
        className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;

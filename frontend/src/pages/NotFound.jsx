import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          We couldn’t find the page you’re looking for. It might have been moved or deleted.
        </p>
        <a
          href="/"
          className=" hover:text-white hover:bg-black p-2 font-[400] rounded-lg bg-primary"
        >
          Go back to homepage
        </a>
      </div>
    </div>
  );
};

export default NotFound;

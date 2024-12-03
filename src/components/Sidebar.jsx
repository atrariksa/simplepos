import React from 'react';

const Sidebar = ({ setActiveView, jwtToken }) => {
  return (
    <div className="w-1/8 bg-gray-800 text-white p-4 h-screen">
      <h1 className="text-2xl mb-6">Admin Dashboard</h1>
      <ul>
        <li>
          <button
            className="block w-full text-left py-2 px-4 mb-2 bg-blue-600 hover:bg-blue-700"
            onClick={() => setActiveView("overview")}
          >
            Overview
          </button>
        </li>
        <li>
          <button
            className="block w-full text-left py-2 px-4 mb-2 bg-blue-600 hover:bg-blue-700"
            onClick={() => setActiveView("users")}
          >
            Users
          </button>
        </li>
        <li>
          <button
            className="block w-full text-left py-2 px-4 mb-2 bg-blue-600 hover:bg-blue-700"
            onClick={() => setActiveView("products")}
          >
            Products
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

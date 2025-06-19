// Aprofile.jsx
import React from "react";

const Aprofile = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-10 p-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
        My Profile
      </h2>
      <div className="space-y-5 text-gray-700 text-lg">
        <div>
          <span className="font-semibold text-gray-800">Name: </span>
          Aayam Regmi
        </div>
        <div>
          <span className="font-semibold text-gray-800">Address: </span>
          Tilotamma-2, Shankarnagar, Rupandehi
        </div>
        <div>
          <span className="font-semibold text-gray-800">Email: </span>
          <a
            href="mailto:aayamregmi81@gmail.com"
            className="text-blue-600 hover:underline"
          >
            aayamregmi81@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Aprofile;

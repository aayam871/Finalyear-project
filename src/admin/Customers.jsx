import React, { useState } from "react";

const hardcodedCustomers = [
  {
    id: 1,
    username: "Ayush Aryal",
    email: "ayush@example.com",
    status: "active",
  },
  {
    id: 2,
    username: "Prajwal Basnet",
    email: "prajwalb@example.com",
    status: "active",
  },
  {
    id: 3,
    username: "Prajwal Bikram GC",
    email: "prajwalbgc@example.com",
    status: "inactive",
  },
  {
    id: 4,
    username: "Madhav Poudel",
    email: "madhav@example.com",
    status: "active",
  },
  {
    id: 5,
    username: "Beepasa Jung Karki Chhetri",
    email: "beepasa@example.com",
    status: "banned",
  },
  {
    id: 6,
    username: "Sandesh Bishwokarma",
    email: "sandesh@example.com",
    status: "inactive",
  },
];

const Customers = () => {
  const [customers] = useState(hardcodedCustomers);

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-yellow-100 text-yellow-800";
      case "banned":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl text-orange-800 font-bold mb-6">
        Customers Status
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {customers.map((c) => (
          <li
            key={c.id}
            className="border p-4 rounded shadow-sm bg-white hover:shadow-md transition"
          >
            <p className="text-lg font-semibold">{c.username}</p>
            <p className="text-sm text-gray-600">{c.email}</p>
            <span
              className={`inline-block mt-2 px-3 py-1 text-xs rounded-full font-medium ${getStatusBadge(
                c.status
              )}`}
            >
              {c.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Customers;

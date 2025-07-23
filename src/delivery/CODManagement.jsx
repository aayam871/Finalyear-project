import React from "react";

const CODManagement = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">COD Money Management</h2>
    <div className="bg-white rounded shadow p-4 mb-4">
      <div className="text-lg font-semibold">
        Total Cash Collected: <span className="text-green-700">₹1200</span>
      </div>
    </div>
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-semibold mb-2">Recent COD Transactions</h3>
      <ul>
        <li className="py-2 border-b">
          Order #12345 - ₹500 - 2024-06-01 14:30
        </li>
        <li className="py-2 border-b">
          Order #12346 - ₹700 - 2024-06-01 13:10
        </li>
      </ul>
    </div>
  </div>
);

export default CODManagement;

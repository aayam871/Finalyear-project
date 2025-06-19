// Aorders.jsx
import React from "react";
import { menuItems } from "./menuData"; // Assuming your menuItems is exported from menuData.js

const Aorders = () => {
  // For demo, मानौं कि सबै menuItems अर्डर भइसकेका छन् र देखाउनु छ।
  // तिमीले यो लाई backend बाट fetch गरेर dynamic बनाउन सक्छौ।

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-4 border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div>
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600">{item.category}</p>
              <p className="mt-1 font-bold text-orange-600">Rs. {item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Aorders;

import React, { useState, useEffect } from "react";
import Agent from "./images/Agent.png";
import { motion } from "framer-motion";
import { useCartStore } from "./cartStore";

const baseImageURL =
  "https://d5f9-103-167-232-191.ngrok-free.app/uploads/images/foodItemImages/";

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    fetch("https://d5f9-103-167-232-191.ngrok-free.app/public/foodItems", {
      headers: { "ngrok-skip-browser-warning": "true" },
    })
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((err) => console.error("Failed to fetch food items", err));
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setResults([]);
      return;
    }

    const filtered = menuItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filtered);
   }, [searchTerm, menuItems]);

   const handleAddToCart = (food) => {
    const userString = localStorage.getItem("user");
    if (!userString) {
      alert("Please login as Customer or Admin to order.");
      return;
     }

     try {
      const user = JSON.parse(userString);
      const roles = user.roles || [];
      const canOrder =
        roles.includes("ROLE_ADMIN") || roles.includes("ROLE_CUSTOMER");

      if (!canOrder) {
        alert("Please login as Customer or Admin to order.");
        return;
      }

      addToCart(food);
    } catch (err) {
      console.error("Error reading user from localStorage", err);
      alert("Please login as Customer or Admin to order.");
    }
  };

   return (
    <section className="relative bg-orange-400 pb-32 pt-28 px-6 md:px-20 overflow-hidden">
      <div className="absolute top-0 left-5/3 w-[700px] h-[500px] bg-orange-300 blur-[140px] rounded-full -translate-x-1/2 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between">
       
        <div className="md:w-1/2 text-left">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-6 tracking-tight"
          >
            Knock Knock. <br />
            <span className="text-orange-900 italic tracking-wide leading-relaxed">
              QuickBites
            </span>{" "}
            at Your Door!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="text-gray-900 text-lg font-medium leading-relaxed font-serif tracking-wide mb-8 max-w-lg"
          >
            Delivered hot and fresh. <br />
            No delays, No compromises.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
            className="flex items-center bg-white rounded-full overflow-hidden max-w-lg shadow-lg mb-6"
          >
            <input
              type="text"
              placeholder="Search for your cravings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-6 py-3 text-gray-800 text-base focus:outline-none bg-transparent"
            />
            <button
              onClick={() => {
                const filtered = menuItems.filter((item) =>
                  item.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setResults(filtered);
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 md:px-8 py-3 font-semibold transition-all"
            >
              Search
            </button>
          </motion.div>

          {searchTerm.trim() !== "" && (
            <div className="bg-white rounded-lg p-4 shadow-md max-w-xl w-full mt-4">
              {results.length > 0 ? (
                <>
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">
                    Search Results:
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center space-x-4 bg-gray-50 p-2 rounded-lg shadow-sm"
                      >
                        <img
                          src={`${baseImageURL}${item.imageUrl}`}
                          alt={item.name}
                          className="w-16 h-16 rounded object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/64";
                          }}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-700">
                            {item.name}
                          </p>
                          <p className="text-sm text-orange-500">
                            Rs {item.price}
                          </p>
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="mt-1 text-sm text-white bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded-full"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-gray-600 text-sm">
                  No items found for “{searchTerm}”
                </p>
              )}
            </div>
          )}
        </div>

       
        <div className="md:w-1/2 mb-10 md:mb-0 flex justify-end">
          <motion.img
            src={Agent}
            alt="Delivery Agent"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
            className="w-72 md:w-[22rem] drop-shadow-[0_8px_20px_rgba(255,102,0,0.3)]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

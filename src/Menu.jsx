import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useCartStore } from "./cartStore"; 
import SearchBar from "./SearchBar";
import CategorySection from "./CategorySection";

const BASE_URL = "https://8e9f-103-167-232-13.ngrok-free.app";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState("all");

  const { addToCart } = useCartStore(); // ⬅addToCart function

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryRes, foodRes] = await Promise.all([
          axios.get(`${BASE_URL}/public/foodCategories`, {
            headers: { "ngrok-skip-browser-warning": "true" },
          }),
          axios.get(`${BASE_URL}/public/foodItems`, {
            headers: { "ngrok-skip-browser-warning": "true" },
          }),
        ]);

        setCategories(Array.isArray(categoryRes.data) ? categoryRes.data : []);
        setFoods(Array.isArray(foodRes.data) ? foodRes.data : []);
      } catch (error) {
        console.error("Failed to fetch menu data:", error.message);
      }
    };

    fetchData();
  }, []);

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const matchesSearch = food.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        activeCategoryId === "all" || food.category?.id === activeCategoryId;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, foods, activeCategoryId]);

  const handleCategoryClick = (id) => setActiveCategoryId(id);

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
    <div className="bg-orange-50 min-h-screen py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-extrabold font-serif text-orange-800 drop-shadow-lg">
            Explore Our Delicious Menu
          </h1>
          <p className="text-lg text-gray-800 mt-4 max-w-2xl mx-auto">
            Browse our variety of mouth-watering dishes. Use the search bar or
            category buttons to discover your favorites!
          </p>
        </header>

        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex flex-wrap justify-center gap-3 mt-10 mb-12">
          <CategoryButton
            label="All"
            isActive={activeCategoryId === "all"}
            onClick={() => handleCategoryClick("all")}
          />
          {categories.map((cat) => (
            <CategoryButton
              key={cat.id}
              label={cat.name}
              isActive={activeCategoryId === cat.id}
              onClick={() => handleCategoryClick(cat.id)}
            />
          ))}
        </div>

        <CategorySection
          category={
            activeCategoryId === "all"
              ? { name: "All Categories", id: "all", imageUrl: "" }
              : categories.find((cat) => cat.id === activeCategoryId)
          }
          items={filteredFoods}
          onAddToCart={handleAddToCart} 
        />
      </div>
    </div>
  );
};

const CategoryButton = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2 rounded-full border transition-all duration-200 ease-in-out 
      ${
        isActive
          ? "bg-orange-600 text-white border-orange-600 shadow-md"
          : "bg-white text-orange-600 border-orange-600 hover:bg-orange-100 hover:shadow-sm"
      }`}
  >
    {label}
  </button>
);

export default Menu;

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useCartStore } from "./cartStore";
import { useMenuStore } from "./menuStore";
import toast from "react-hot-toast";
import SearchBar from "./SearchBar";
import CategorySection from "./CategorySection";

const BASE_URL = "https://5aeb0071168a.ngrok-free.app";
const MAX_VISIBLE_CATEGORIES = 8;

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState("all");
  const [moreOpen, setMoreOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { setCartFromBackend } = useCartStore();
  const { cachedCategories, cachedFoods, setCachedData } = useMenuStore();

  const [categories, setCategories] = useState(cachedCategories || []);
  const [foods, setFoods] = useState(cachedFoods || []);

  useEffect(() => {
    const fetchData = async () => {
      if (cachedCategories.length > 0 && cachedFoods.length > 0) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setIsError(false);

      try {
        const [categoryRes, foodRes] = await Promise.all([
          axios.get(`${BASE_URL}/public/foodCategories`, {
            headers: { "ngrok-skip-browser-warning": "true" },
          }),
          axios.get(`${BASE_URL}/public/foodItems`, {
            headers: { "ngrok-skip-browser-warning": "true" },
          }),
        ]);

        const categoriesData = Array.isArray(categoryRes.data)
          ? categoryRes.data
          : [];
        const foodsData = Array.isArray(foodRes.data) ? foodRes.data : [];

        setCategories(categoriesData);
        setFoods(foodsData);
        setCachedData(categoriesData, foodsData);
      } catch (error) {
        console.error("Fetch error:", error.message);
        setIsError(true);
        toast.error("Failed to fetch menu data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [cachedCategories, cachedFoods, setCachedData]);

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const matchesSearch = food.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        activeCategoryId === "all" ||
        (food.category && food.category.id === activeCategoryId);
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, foods, activeCategoryId]);

  const handleAddToCart = async (food) => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      const user = JSON.parse(userData);
      const token = user.accessToken;
      if (!token) {
        toast.error("Please login again.");
        return;
      }

      if (!food.selectedVariantId) {
        toast.error("Please select a variant.");
        return;
      }

      // POST request to add item to backend cart
      const response = await axios.post(
        `${BASE_URL}/api/v1/cart/add`,
        {
          foodItemId: food.id,
          foodVariantId: food.selectedVariantId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success(`${food.name} added to cart!`);

        // Fetch updated cart from backend
        const cartRes = await axios.get(`${BASE_URL}/api/v1/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (Array.isArray(cartRes.data.items)) {
          setCartFromBackend(cartRes.data.items); // update Zustand store immediately
        }
      } else {
        toast.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Error adding to cart");
    }
  };

  const visibleCategories = categories.slice(0, MAX_VISIBLE_CATEGORIES);
  const moreCategories = categories.slice(MAX_VISIBLE_CATEGORIES);

  return (
    <div className="bg-orange-50 min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ... header, categories UI etc. remain unchanged ... */}

        {/* Search bar */}
        {!isLoading && !isError && (
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse rounded-lg border border-orange-200 p-4 bg-white shadow"
              >
                <div className="h-40 bg-orange-100 rounded mb-4" />
                <div className="h-4 bg-orange-100 rounded w-3/4 mb-2" />
                <div className="h-4 bg-orange-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center text-red-600 mt-20 text-xl font-semibold">
            ⚠️ No preview available.
            <br />
            Please try again later.
          </div>
        ) : filteredFoods.length === 0 && searchTerm !== "" ? (
          <div className="flex flex-col items-center mt-20 text-orange-700 font-semibold text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mb-4 text-orange-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 17.25l-4.5-4.5m0 0l4.5-4.5m-4.5 4.5h13.5"
              />
            </svg>
            <p>
              No items found matching "<strong>{searchTerm}</strong>".
            </p>
            <p>Try different keywords or clear your search.</p>
            <button
              className="mt-4 underline text-orange-600 hover:text-orange-800"
              onClick={() => setSearchTerm("")}
            >
              Clear Search
            </button>
          </div>
        ) : (
          <CategorySection
            category={
              activeCategoryId === "all"
                ? { name: "All Categories", id: "all", imageUrl: "" }
                : categories.find((cat) => cat.id === activeCategoryId)
            }
            items={filteredFoods}
            onAddToCart={handleAddToCart}
          />
        )}
      </div>
    </div>
  );
};

export default Menu;

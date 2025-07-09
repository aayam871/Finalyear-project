import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useCartStore } from "./cartStore";
import { useMenuStore } from "./menuStore";
import toast from "react-hot-toast";
import SearchBar from "./SearchBar";
import CategorySection from "./CategorySection";

const BASE_URL = "https://8e9f-103-167-232-13.ngrok-free.app";
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
    const userData = JSON.parse(localStorage.getItem("user"));
    const token = userData?.accessToken;

    if (!token) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/cart/add`,
        {
          foodItemId: food.id,
          quantity: 1,
          variantId: food.variantId || null,
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

        // Now sync cart with backend
        const cartRes = await axios.get(`${BASE_URL}/api/v1/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (Array.isArray(cartRes.data)) {
          setCartFromBackend(cartRes.data);
        }
      } else {
        toast.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error.message);
      toast.error("Error adding to cart");
    }
  };

  const visibleCategories = categories.slice(0, MAX_VISIBLE_CATEGORIES);
  const moreCategories = categories.slice(MAX_VISIBLE_CATEGORIES);

  return (
    <div className="bg-orange-50 min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-extrabold font-serif text-orange-800 drop-shadow-lg">
            Explore Our Delicious Menu
          </h1>
          <p className="text-lg text-gray-800 mt-4 max-w-2xl mx-auto">
            Browse through categories and find your favorite dishes.
          </p>
        </header>

        {isLoading ? (
          <div className="flex gap-3 flex-wrap mb-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="h-10 w-24 bg-orange-100 animate-pulse rounded"
              />
            ))}
          </div>
        ) : isError ? null : (
          <div className="flex items-center gap-6 mb-6 flex-wrap">
            <button
              onClick={() => {
                setActiveCategoryId("all");
                setMoreOpen(false);
              }}
              className={`px-8 py-4 rounded-md border border-orange-600 font-bold text-lg transition-colors duration-200 ${
                activeCategoryId === "all"
                  ? "bg-orange-600 text-white"
                  : "bg-white text-orange-600 hover:bg-orange-300"
              }`}
            >
              All
            </button>

            {visibleCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategoryId(cat.id);
                  setMoreOpen(false);
                }}
                className={`px-4 py-3 rounded-md border border-orange-600 font-semibold text-sm transition-colors duration-200 ${
                  activeCategoryId === cat.id
                    ? "bg-orange-600 text-white"
                    : "bg-white text-orange-600 hover:bg-orange-100"
                }`}
              >
                {cat.name}
              </button>
            ))}

            {moreCategories.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className={`px-4 py-3 rounded-md border border-orange-600 font-semibold text-sm flex items-center gap-1 transition-colors duration-200 ${
                    moreOpen
                      ? "bg-orange-600 text-white"
                      : "bg-white text-orange-600 hover:bg-orange-100"
                  }`}
                >
                  More
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      moreOpen ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {moreOpen && (
                  <div className="absolute right-0 mt-2 bg-white border border-orange-300 rounded-md shadow-lg z-10 min-w-[150px]">
                    {moreCategories.map((cat, idx) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setActiveCategoryId(cat.id);
                          setMoreOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 transition-colors duration-200 text-orange-600 ${
                          activeCategoryId === cat.id
                            ? "bg-orange-200 font-semibold"
                            : "hover:bg-orange-100"
                        }`}
                        style={{
                          borderBottom:
                            idx !== moreCategories.length - 1
                              ? "1px solid #FDBA74"
                              : "none",
                        }}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {!isLoading && !isError && (
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}

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

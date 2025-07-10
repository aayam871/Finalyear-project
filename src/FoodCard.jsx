import { useState, useEffect } from "react";
import { addToCartHandler } from "./addToCartHandler";
import { useCartStore } from "./cartStore";
import toast from "react-hot-toast";

const BASE_URL = "https://5aeb0071168a.ngrok-free.app";

const FoodCard = ({ food }) => {
  const [justAdded, setJustAdded] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState(
    food.foodVariants?.[0]?.id || null
  );
  const { setCartFromBackend, cart } = useCartStore();

  useEffect(() => {
    setSelectedVariantId(food.foodVariants?.[0]?.id || null);
  }, [food]);

  const alreadyInCart = cart.some(
    (item) =>
      (item.foodItemId === food.id || item.id === food.id) &&
      (item.foodVariantId === selectedVariantId ||
        item.variantId === selectedVariantId)
  );

  const handleClick = async () => {
    if (alreadyInCart) {
      toast("Item already in cart", {
        icon: "⚠️",
        style: {
          background: "#fff7ed",
          border: "1px solid #f97316",
          color: "#d97706",
        },
      });
      return;
    }
    await addToCartHandler({
      food,
      selectedVariantId,
      setJustAdded,
      setButtonDisabled,
      setCartFromBackend,
    });
  };

  const selectedVariant = food.foodVariants?.find(
    (v) => v.id === selectedVariantId
  );

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col h-full">
      <img
        src={`${BASE_URL}/uploads/images/foodItemImages/${food.imageUrl}`}
        alt={food.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
        }}
        className="h-44 w-full object-cover"
      />

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 truncate">
            {food.name}
          </h3>
          <p className="text-sm text-gray-500 mb-2 line-clamp-2">
            {food.description}
          </p>

          {food.foodVariants?.length > 1 && (
            <select
              value={selectedVariantId}
              onChange={(e) => setSelectedVariantId(Number(e.target.value))}
              className="w-full mb-3 p-2 border border-orange-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
            >
              {food.foodVariants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.name} – Rs. {variant.price}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex justify-between items-center mt-auto">
          <span className="text-orange-600 font-bold text-base sm:text-lg">
            Rs.{" "}
            {selectedVariant?.price ?? food.foodVariants?.[0]?.price ?? "N/A"}
          </span>
          <button
            onClick={handleClick}
            disabled={justAdded || alreadyInCart || buttonDisabled}
            className={`${
              justAdded || alreadyInCart
                ? "bg-green-500"
                : "bg-orange-500 hover:bg-orange-600"
            } text-white text-sm px-4 py-1.5 rounded-full transition duration-300 ${
              justAdded || alreadyInCart || buttonDisabled
                ? "opacity-70 cursor-not-allowed"
                : ""
            }`}
          >
            {justAdded || alreadyInCart ? "✔ Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;

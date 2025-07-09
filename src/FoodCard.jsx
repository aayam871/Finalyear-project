import { useState } from "react";

const FoodCard = ({ food, onAddToCart }) => {
  const [justAdded, setJustAdded] = useState(false);

  const handleClick = () => {
    onAddToCart(food);
    setJustAdded(true);

    // Reset after 2 seconds
    setTimeout(() => {
      setJustAdded(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col h-full">
      <img
        src={`https://8e9f-103-167-232-13.ngrok-free.app/uploads/images/foodItemImages/${food.imageUrl}`}
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
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">
            {food.description}
          </p>
        </div>

        <div className="flex justify-between items-center mt-auto">
          <span className="text-orange-600 font-bold text-base sm:text-lg">
            Rs. {food.price}
          </span>
          <button
            onClick={handleClick}
            className={`${
              justAdded ? "bg-green-500" : "bg-orange-500 hover:bg-orange-600"
            } text-white text-sm px-4 py-1.5 rounded-full transition duration-300`}
          >
            {justAdded ? "✔ Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;

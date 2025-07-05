const FoodCard = ({ food, onAddToCart }) => {
   return (
     <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden flex flex-col">
       <img
        src={`https://d5f9-103-167-232-191.ngrok-free.app/uploads/images/foodItemImages/${food.imageUrl}`}
        alt={food.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
         }}
         className="h-44 w-full object-cover"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">{food.name}</h3>
          <p className="text-sm text-gray-500 mb-3 line-clamp-3">
            {food.description}
          </p>
        </div>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-orange-600 font-semibold text-lg">
            Rs. {food.price}
          </span>
          <button
            onClick={() => onAddToCart(food)}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-1 rounded-full transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;

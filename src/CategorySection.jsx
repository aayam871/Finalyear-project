import FoodCard from "./FoodCard";

const CategorySection = ({ category, items, onAddToCart }) => (
  <div className="mb-12">
    <div className="flex items-center gap-4 mb-4">
      {category?.imageUrl && (
        <img
          src={`https://d5f9-103-167-232-191.ngrok-free.app/uploads/images/foodCategoryImages/${category.imageUrl}`}
          alt={category.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      )}
      <h2 className="text-2xl font-semibold text-orange-800">
        {category?.name}
      </h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.map((food) => (
        <FoodCard key={food.id} food={food} onAddToCart={onAddToCart} />
      ))}
    </div>
  </div>
);

export default CategorySection;

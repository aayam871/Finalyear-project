import { useState } from "react";
import margherita from "../../images/Mpizza.jpeg";
import pepperoni from "../../images/Ppizza.jpeg";
import chickenBurger from "../../images/Cburger.jpeg";
import veggieBurger from "../../images/Vburger.jpg";
import vegMomo from "../../images/Vmomo.jpeg";
import chickenChowmein from "../../images/Cchowmin.jpg";
import tomatoSoup from "../../images/Tsoup.jpg";
import sweetCornSoup from "../../images/Ssoup.jpg";
import cocaCola from "../../images/Coke.jpg";
import pepsi from "../../images/Pepsi.jpeg";
import frenchFries from "../../images/Ffries.jpeg";
import chickenWings from "../../images/Cwings.jpeg";

const categories = ["Pizza", "Burger", "Chinese", "Soup", "Drinks"];
const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 299,
    image: margherita,
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 349,
    image: pepperoni,
  },
  {
    id: 3,
    name: "Chicken Burger",
    category: "Burger",
    price: 249,
    image: chickenBurger,
  },
  {
    id: 4,
    name: "Veggie Burger",
    category: "Burger",
    price: 229,
    image: veggieBurger,
  },
  {
    id: 5,
    name: "Veg Momo",
    category: "Chinese",
    price: 199,
    image: vegMomo,
  },
  {
    id: 6,
    name: "Chicken Chowmein",
    category: "Chinese",
    price: 249,
    image: chickenChowmein,
  },
  {
    id: 7,
    name: "Tomato Soup",
    category: "Soup",
    price: 179,
    image: tomatoSoup,
  },
  {
    id: 8,
    name: "Sweet Corn Soup",
    category: "Soup",
    price: 199,
    image: sweetCornSoup,
  },
  {
    id: 9,
    name: "Coca Cola",
    category: "Drinks",
    price: 99,
    image: cocaCola,
  },
  {
    id: 10,
    name: "Pepsi",
    category: "Drinks",
    price: 99,
    image: pepsi,
  },
  {
    id: 11,
    name: "French Fries",
    category: "Chinese",
    price: 149,
    image: frenchFries,
  },
  {
    id: 12,
    name: "Spicy Chicken Wings",
    category: "Chinese",
    price: 299,
    image: chickenWings,
  },
];

const AddAddOnForm = () => {
  const [category, setCategory] = useState("");
  const [menuItem, setMenuItem] = useState("");
  const [addOnName, setAddOnName] = useState("");
  const [price, setPrice] = useState("");
  const [active, setActive] = useState(true);

  const filteredMenuItems = menuItems.filter(
    (item) => category === "" || item.category === category
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Added addon "${addOnName}" for menu item "${menuItem}" with price ${price}`
    );
    // API or state update here
  };

  return (
    <form className="bg-white p-6 rounded shadow mb-8" onSubmit={handleSubmit}>
      <h3 className="text-orange-500 text-xl mb-4 font-semibold">Add AddOn</h3>

      <select
        className="w-full border border-gray-300 rounded p-2 mb-3"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category (optional)</option>
        {categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>

      <select
        className="w-full border border-gray-300 rounded p-2 mb-3"
        value={menuItem}
        onChange={(e) => setMenuItem(e.target.value)}
        required
      >
        <option value="">Select Menu Item</option>
        {filteredMenuItems.map((item) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="AddOn Name (e.g., Extra Cheese)"
        className="w-full border border-gray-300 rounded p-2 mb-3"
        value={addOnName}
        onChange={(e) => setAddOnName(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Price (e.g., 50)"
        className="w-full border border-gray-300 rounded p-2 mb-3"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <label className="inline-flex items-center mb-4 cursor-pointer">
        <input
          type="checkbox"
          checked={active}
          onChange={() => setActive(!active)}
          className="form-checkbox h-5 w-5 text-orange-500"
        />
        <span className="ml-2 text-gray-700">Active</span>
      </label>

      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
      >
        Add AddOn
      </button>
    </form>
  );
};

export default AddAddOnForm;

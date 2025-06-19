import { useState } from "react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { menuItems } from "../../menuData";
// adjust path

const ManageItemsList = () => {
  const [items, setItems] = useState(menuItems);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setItems(items.filter((item) => item.id !== id));
      alert("Deleted successfully.");
    }
  };

  const handleEdit = (item) => {
    alert(`Edit ${item.name} - implement your edit logic.`);
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-8">
      <h3 className="text-orange-500 text-xl mb-4 font-semibold">
        Manage Menu Items
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-orange-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-orange-50 transition"
              >
                <td className="px-4 py-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">Rs. {item.price}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-orange-600 hover:text-orange-800"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItemsList;

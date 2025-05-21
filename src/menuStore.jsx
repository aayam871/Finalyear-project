// menuStore.jsx
import { create } from "zustand";
import { menuItems } from "./menuData";

export const useMenuStore = create((set) => ({
  items: menuItems,
  selectedCategory: "All",
  searchQuery: "",

  setCategory: (category) => set({ selectedCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query.toLowerCase() }),
}));


export const getFilteredItems = () => {
  const { selectedCategory, searchQuery } = useMenuStore.getState();
  return menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });
};

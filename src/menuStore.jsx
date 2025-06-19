import { create } from "zustand";
import { menuItems } from "./menuData";

export const useMenuStore = create((set) => ({
  items: menuItems,
  selectedCategory: "All",
  searchTerm: "",

  setCategory: (category) => set({ selectedCategory: category }),
  setSearchTerm: (term) => set({ searchTerm: term.toLowerCase() }),

  // 🔐 Login state
  isLoggedIn: false,
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
}));

// Optional utility (not used in component)
export const getFilteredItems = () => {
  const { selectedCategory, searchTerm } = useMenuStore.getState();
  const lowerSearchTerm = searchTerm.toLowerCase();
  return menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(lowerSearchTerm);
    return matchesCategory && matchesSearch;
  });
};

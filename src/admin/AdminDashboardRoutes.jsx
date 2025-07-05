import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboardLayout from "./AdminDashboardLayout";

import Admin from "../Admin"; // ← Hero, Features, etc.
import AddFood from "./AddFood";
import FoodList from "./FoodList";
import AddCategory from "./AddCategory";
import CategoryList from "./CategoryList";
import Customers from "./Customers";
import DeliveryAgents from "./DeliveryAgents";
import ManageVariants from "./ManageVariants"; // ← import ManageVariants component

const AdminDashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />

      <Route element={<AdminDashboardLayout />}>
        <Route path="add-food" element={<AddFood />} />
        <Route path="foods" element={<FoodList />} />
        <Route path="add-category" element={<AddCategory />} />
        <Route path="categories" element={<CategoryList />} />
        <Route path="customers" element={<Customers />} />
        <Route path="delivery-agents" element={<DeliveryAgents />} />
        <Route path="manage-variants" element={<ManageVariants />} />{" "}
      </Route>
    </Routes>
  );
};

export default AdminDashboardRoutes;

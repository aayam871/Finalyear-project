import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboardLayout from "./AdminDashboardLayout";
import DashboardHome from "./Dashboard/DashboardHome";
import AgentPanel from "./Agents/AgentPanel";
import UserList from "./Users/UserList";
import CategoryList from "./Menu/CategoryList";
import AddCategory from "./Menu/AddCategory";
import FoodList from "./Menu/FoodList";
import AddFood from "./Menu/AddFood";
import ManageVariants from "./Menu/ManageVariants";
import OrderList from "./Orders/OrderList";
import AssignAgent from "./Orders/AssignAgent";
import MenuReview from "./Review/MenuReview";
import AgentEarnings from "../admin/Earnings/AgentEarnings";
import AgentSalaries from "../admin/Salaries/AgentSalaries";
import NotificationBell from "../admin/Notifications/NotificationBell";
import AdminProfileModel from "./AdminProfileModel";
import ApprovedDeliveryAgents from "./Agents/ApprovedDeliveryAgents";
const AdminDashboardRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminDashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="delivery-agents" element={<AgentPanel />} />
        <Route path="approved-agents" element={<ApprovedDeliveryAgents />} />
        <Route path="users" element={<UserList />} />
        <Route path="categories" element={<CategoryList />} />
        <Route path="add-category" element={<AddCategory />} />
        <Route path="foods" element={<FoodList />} />
        <Route path="add-food" element={<AddFood />} />
        <Route path="manage-variants" element={<ManageVariants />} />
        <Route path="orders" element={<OrderList />} />
        <Route path="assign-agent" element={<AssignAgent />} />
        <Route path="review" element={<MenuReview />} />
        <Route path="earnings" element={<AgentEarnings />} />
        <Route path="salaries" element={<AgentSalaries />} />
        <Route path="notifications" element={<NotificationBell />} />
        <Route path="profile" element={<AdminProfileModel />} />
      </Route>
    </Routes>
  );
};

export default AdminDashboardRoutes;

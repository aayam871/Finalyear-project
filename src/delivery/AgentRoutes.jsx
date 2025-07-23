import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import AssignedOrders from "./AssignedOrders";
import OrderHistory from "./OrderHistory";
import CODManagement from "./CODManagement";
import MapNavigation from "./MapNavigation";
import DeliveryCharges from "./DeliveryCharges";

const AgentRoutes = () => (
  <Routes>
    <Route index element={<Navigate to="dashboard" replace />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="assigned-orders" element={<AssignedOrders />} />
    <Route path="order-history" element={<OrderHistory />} />
    <Route path="cod-management" element={<CODManagement />} />
    <Route path="map-navigation" element={<MapNavigation />} />
    <Route path="delivery-charges" element={<DeliveryCharges />} />
  </Routes>
);

export default AgentRoutes;


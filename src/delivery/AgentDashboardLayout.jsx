import React, { useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import webSocketService from "./websocketService";

const AgentDashboardLayout = () => {
  useEffect(() => {
    webSocketService.connect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.id) {
        const agentTopic = `/topic/agent-${user.id}`;
        webSocketService.subscribe(agentTopic, (message) => {
          const notification = JSON.parse(message.body);
          alert('New delivery assigned: Order #' + notification.orderId);
        });
      }

      // Subscribe to staff notifications for no agent available and order cancel
      const staffTopicNoAgent = "/topic/staff-no-agent";
      const staffTopicOrderCancel = "/topic/staff-order-cancel";

      webSocketService.subscribe(staffTopicNoAgent, (message) => {
        const notification = JSON.parse(message.body);
        alert('No delivery agent available: Order #' + notification.orderId);
      });

      webSocketService.subscribe(staffTopicOrderCancel, (message) => {
        const notification = JSON.parse(message.body);
        alert('Order cancelled: Order #' + notification.orderId);
      });
    });

    return () => {
      webSocketService.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="ml-64 flex-1 overflow-y-auto h-screen bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};


export default AgentDashboardLayout;

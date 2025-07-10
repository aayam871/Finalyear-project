import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bell } from "lucide-react";

const NotificationIcon = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    let prevCount = 0;

    const fetchPending = async () => {
      try {
        const res = await axios.get(
          "https://5aeb0071168a.ngrok-free.app/api/v1/admin/pending-agents"
        );

        
        const pendingAgents = (res.data ?? []).filter(
          (agent) => agent.otpverified === true && agent.adminApproved === false
        );

        const newCount = pendingAgents.length;

        if (newCount > prevCount) {
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 5000);
        }

        prevCount = newCount;
        setPendingCount(newCount);
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    fetchPending(); 
    const interval = setInterval(fetchPending, 10000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative cursor-pointer">
      <Bell className="w-6 h-6 text-gray-800" />
      {pendingCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
          {pendingCount}
        </span>
      )}
      {showNotification && (
        <span className="absolute top-6 text-sm text-red-600 animate-pulse">
          New agent request!
        </span>
      )}
    </div>
  );
};

export default NotificationIcon;

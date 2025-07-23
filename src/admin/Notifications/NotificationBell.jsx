import React, { useEffect, useState } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { axiosWithRefresh } from "../../axiosWithRefresh";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      // Replace with your real endpoint if available
      const res = await axiosWithRefresh({ method: "get", url: "/api/v1/admin/notifications" });
      setNotifications(res.data.notifications || []);
    } catch {
      setNotifications([]);
    }
  };

  const handleNotificationClick = (notif) => {
    setOpen(false);
    if (notif.type === "agent-review" && notif.agentId) {
      navigate(`/admin/delivery-agents?agentId=${notif.agentId}`);
    }
    // Add more notification types as needed
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative focus:outline-none"
        aria-label="Notifications"
      >
        <BellIcon className="h-7 w-7 text-gray-600" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>
      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-2">
            {notifications.length === 0 ? (
              <div className="px-4 py-2 text-gray-500">No notifications</div>
            ) : (
              notifications.map((notif) => (
                <button
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800"
                >
                  {notif.message}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;

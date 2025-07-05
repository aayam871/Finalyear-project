import React, { useEffect, useState } from "react";

const Aprofile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      setUser(null);
    }
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded shadow-md text-center max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-4 text-red-600">
            User Not Found
          </h2>
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
        <h1 className="text-3xl font-bold mb-6 text-orange-700 border-b border-gray-200 pb-4">
          Admin Profile
        </h1>

        <div className="space-y-6">
          <ProfileItem label="Username" value={user.username || "N/A"} />
          <ProfileItem label="Email Address" value={user.email || "N/A"} />
         
          <ProfileItem label="Password" value={"********"} />
          
          <button
            onClick={() => alert("Redirect to Change Password Page")}
            className="mt-2 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfileItem = ({ label, value }) => (
  <div>
    <h3 className="text-sm text-black font-semibold uppercase">{label}</h3>
    <p className="text-lg text-black mt-1">{value}</p>
  </div>
);

export default Aprofile;

import React, { useEffect, useState } from "react";
import axios from "axios";

const PROFILE_API =
  "https://8e9f-103-167-232-13.ngrok-free.app/api/v1/edit-profile";
const PASSWORD_API =
  "https://8e9f-103-167-232-13.ngrok-free.app/api/v1/change-password";
const IMAGE_UPLOAD_API =
  "https://8e9f-103-167-232-13.ngrok-free.app/api/v1/upload-profile-image";

const Cprofile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setFormData({
        username: storedUser.username || "",
        email: storedUser.email || "",
        phone: storedUser.phone || "",
        address: storedUser.address || "",
      });
      if (storedUser.imageUrl) {
        setImagePreview(storedUser.imageUrl);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await axios.put(PROFILE_API, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });

      const updatedUser = {
        ...JSON.parse(localStorage.getItem("user")),
        ...formData,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setMessage("✅ Profile updated successfully.");
    } catch {
      setMessage("❌ Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = passwordData;

    if (newPassword !== confirmPassword) {
      setMessage("❌ New passwords do not match.");
      return;
    }

    try {
      await axios.put(
        PASSWORD_API,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      setMessage("✅ Password changed successfully.");
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch {
      setMessage("❌ Failed to change password.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return setMessage("❌ Please select an image first.");
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      await axios.post(IMAGE_UPLOAD_API, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("✅ Profile image uploaded.");
    } catch {
      setMessage("❌ Failed to upload image.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-8">
        <h1 className="text-3xl font-bold text-orange-700 mb-6 border-b pb-2">
          Customer Profile
        </h1>

       
        <div className="flex items-center space-x-4 mb-6">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile Preview"
              className="w-16 h-16 rounded-full object-cover border"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              ?
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm"
          />
          <button
            onClick={handleImageUpload}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1 rounded"
          >
            Upload
          </button>
        </div>

        
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <Input
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <Input
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>

       
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-orange-700 mb-4 border-b pb-2">
            Change Password
          </h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input
              label="Old Password"
              name="oldPassword"
              type="password"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
            />
            <Input
              label="New Password"
              name="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
            >
              Change Password
            </button>
          </form>
        </div>

        {message && (
          <p className="mt-4 text-sm text-center font-medium text-red-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-semibold text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
    />
  </div>
);

export default Cprofile;

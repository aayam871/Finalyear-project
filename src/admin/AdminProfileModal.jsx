import React, { useEffect, useState } from "react";
import axios from "axios";

const PROFILE_FETCH_API = "/api/v1/user/get-profile-detail";
const PROFILE_UPDATE_API = "/api/v1/user/update-profile";
const PASSWORD_INITIATE_API = "/api/v1/user/profile/initiate-password-change";
const PASSWORD_CONFIRM_API = "/api/v1/user/profile/confirm-password-change";
const EMAIL_INITIATE_API = "/api/v1/user/profile/initiate-email-change";
const EMAIL_CONFIRM_API = "/api/v1/user/profile/confirm-email-change";

const AdminProfileModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({ username: "", email: "", phone: "", address: "" });
  const [passwordData, setPasswordData] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [emailChangeData, setEmailChangeData] = useState({ newEmail: "", otp: "" });
  const [emailChangeStep, setEmailChangeStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.accessToken;

  useEffect(() => {
    if (open) fetchUserProfile();
    // eslint-disable-next-line
  }, [open]);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(PROFILE_FETCH_API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData(res.data.data);
    } catch {
      setMessage("❌ Failed to load profile.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailChangeInput = (e) => {
    const { name, value } = e.target;
    setEmailChangeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await axios.put(PROFILE_UPDATE_API, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      await axios.post(PASSWORD_INITIATE_API, { currentPassword: oldPassword }, { headers: { Authorization: `Bearer ${token}` } });
      await axios.post(PASSWORD_CONFIRM_API, { newPassword }, { headers: { Authorization: `Bearer ${token}` } });
      setMessage("✅ Password changed successfully.");
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch {
      setMessage("❌ Failed to change password.");
    }
  };

  const handleInitiateEmailChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await axios.post(EMAIL_INITIATE_API, { newEmail: emailChangeData.newEmail }, { headers: { Authorization: `Bearer ${token}` } });
      setMessage("OTP sent to new email. Please check your inbox.");
      setEmailChangeStep(2);
    } catch {
      setMessage("❌ Failed to initiate email change.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmEmailChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await axios.post(EMAIL_CONFIRM_API, { newEmail: emailChangeData.newEmail, otp: emailChangeData.otp }, { headers: { Authorization: `Bearer ${token}` } });
      setMessage("✅ Email changed successfully.");
      setEmailChangeData({ newEmail: "", otp: "" });
      setEmailChangeStep(1);
      fetchUserProfile();
    } catch {
      setMessage("❌ Failed to confirm email change.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-8 relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={onClose}>&times;</button>
        <h1 className="text-2xl font-bold text-orange-700 mb-6 border-b pb-2">Admin Profile</h1>
        {/* Profile Update Form */}
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <Input label="Username" name="username" value={formData.username} onChange={handleInputChange} />
          <Input label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
          <Input label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} />
          <Input label="Address" name="address" value={formData.address} onChange={handleInputChange} />
          <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
        {/* Password Change */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-orange-700 mb-4 border-b pb-2">Change Password</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input label="Old Password" name="oldPassword" type="password" value={passwordData.oldPassword} onChange={handlePasswordChange} />
            <Input label="New Password" name="newPassword" type="password" value={passwordData.newPassword} onChange={handlePasswordChange} />
            <Input label="Confirm Password" name="confirmPassword" type="password" value={passwordData.confirmPassword} onChange={handlePasswordChange} />
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">Change Password</button>
          </form>
        </div>
        {/* Email Change */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-orange-700 mb-4 border-b pb-2">Change Email</h2>
          {emailChangeStep === 1 ? (
            <form onSubmit={handleInitiateEmailChange} className="space-y-4">
              <Input label="New Email" name="newEmail" type="email" value={emailChangeData.newEmail} onChange={handleEmailChangeInput} />
              <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded" disabled={loading}>
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleConfirmEmailChange} className="space-y-4">
              <Input label="New Email" name="newEmail" type="email" value={emailChangeData.newEmail} onChange={handleEmailChangeInput} disabled />
              <Input label="OTP" name="otp" value={emailChangeData.otp} onChange={handleEmailChangeInput} />
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded" disabled={loading}>
                {loading ? "Verifying..." : "Verify & Change Email"}
              </button>
            </form>
          )}
        </div>
        {/* Message */}
        {message && <p className="mt-4 text-sm text-center font-medium text-red-600">{message}</p>}
      </div>
    </div>
  );
};

const Input = ({ label, name, value, onChange, type = "text", disabled }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
    <input type={type} id={name} name={name} value={value} onChange={onChange} required={!disabled} disabled={disabled} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none" />
  </div>
);

export default AdminProfileModal;

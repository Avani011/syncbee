"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      console.log("Account Deleted");
    }
  };

  return (
    <div className="flex justify-center items-center h-full relative">
      <div className="w-full p-6 gap-20 rounded-2xl flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold mb-4 text-purple-900">Settings</h2>

        <div className="flex flex-row justify-center gap-10 w-full">
          {/* Notifications Toggle */}
          <div className="flex flex-col justify-center rounded-lg bg-green-500 hover:bg-transparent items-center w-1/4 shadow-md gap-4 p-5 transition">
            <span className="text-lg text-white hover:text-purple-900 font-bold">
              Turn Notifications
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <div className="w-11 h-6 bg-purple-200 rounded-full peer peer-checked:bg-white-500 after:absolute after:top-0.5 after:left-1 after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-5"></div>
            </label>
          </div>

          {/* Change Password Button */}
          <button
            onClick={() => setShowPasswordForm(true)}
            className="w-1/4 text-white bg-purple-500 text-lg font-bold py-2 rounded-lg shadow-md hover:bg-transparent hover:text-purple-900 transition"
          >
            Change Password
          </button>

          {/* Delete Account Button */}
          <button
            onClick={handleDeleteAccount}
            className="w-1/4 text-white bg-red-500 text-lg font-bold py-2 rounded-lg shadow-md hover:bg-transparent hover:text-purple-900 transition"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordForm && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md"
          onClick={() => setShowPasswordForm(false)}
        >
          <div
            className="bg-white p-6 rounded-xl shadow-lg w-96 relative"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Change Password
            </h3>
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
              Update Password
            </button>
            <button
              onClick={() => setShowPasswordForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function BuyerSettingsPage() {
  // Profile Settings
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [phone, setPhone] = useState("+94 712 345 678");
  const [bio, setBio] = useState("Tech enthusiast and occasional shopper");

  // Address Settings
  const [addresses, setAddresses] = useState([
    { id: 1, label: "Home", address: "123 Main St, Colombo 03", default: true },
    { id: 2, label: "Work", address: "456 Office Rd, Colombo 07", default: false },
  ]);

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [newMessages, setNewMessages] = useState(true);
  const [promotions, setPromotions] = useState(false);

  // Privacy Settings
  const [profilePublic, setProfilePublic] = useState(true);
  const [showPurchaseHistory, setShowPurchaseHistory] = useState(false);
  const [allowMessages, setAllowMessages] = useState(true);

  // Password Change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully");
  };

  const handleAddAddress = () => {
    toast.info("Add address dialog would open here");
  };

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    toast.success("Address removed");
  };

  const handleSetDefaultAddress = (id: number) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      default: addr.id === id
    })));
    toast.success("Default address updated");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved");
  };

  const handleSavePrivacy = () => {
    toast.success("Privacy settings updated");
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    toast.success("Password changed successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      toast.error("Account deletion process started");
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-border-light/50 dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <div className="px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-3xl font-extrabold text-text-main-light dark:text-text-main-dark tracking-tight">
              Account Settings
            </h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
              Manage your account preferences and settings
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 lg:px-8 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Profile Information */}
          <section className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-border-light/50 dark:border-border-dark p-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary text-2xl">person</span>
              <h2 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
                Profile Information
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-6">
                <div className="size-20 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold">
                  JD
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-4 py-2 rounded-lg transition-all text-sm">
                    <span className="material-symbols-outlined text-lg">upload</span>
                    Upload Photo
                  </button>
                  <button className="flex items-center gap-2 bg-surface-light dark:bg-surface-dark border border-border-light/50 dark:border-border-dark hover:border-red-500 hover:text-red-500 text-text-main-light dark:text-text-main-dark font-semibold px-4 py-2 rounded-lg transition-all text-sm">
                    <span className="material-symbols-outlined text-lg">delete</span>
                    Remove
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border-light/50 dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border-light/50 dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border-light/50 dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark mb-2">
                  Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-border-light/50 dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveProfile}
                  className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-lg transition-all"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </section>

          {/* Shipping Addresses */}
          <section className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-border-light/50 dark:border-border-dark p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
                <h2 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
                  Shipping Addresses
                </h2>
              </div>
              <button
                onClick={handleAddAddress}
                className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-4 py-2 rounded-lg transition-all text-sm"
              >
                <span className="material-symbols-outlined text-lg">add</span>
                Add Address
              </button>
            </div>

            <div className="space-y-3">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-border-light/50 dark:border-border-dark bg-background-light dark:bg-background-dark"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-text-main-light dark:text-text-main-dark">
                        {addr.label}
                      </span>
                      {addr.default && (
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      {addr.address}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {!addr.default && (
                      <button
                        onClick={() => handleSetDefaultAddress(addr.id)}
                        className="text-primary hover:text-primary-hover"
                        title="Set as default"
                      >
                        <span className="material-symbols-outlined">check_circle</span>
                      </button>
                    )}
                    <button
                      onClick={() => toast.info("Edit address dialog would open")}
                      className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    {!addr.default && (
                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="text-text-secondary-light dark:text-text-secondary-dark hover:text-red-500"
                        title="Delete"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Notification Preferences */}
          <section className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-border-light/50 dark:border-border-dark p-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary text-2xl">notifications</span>
              <h2 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
                Notification Preferences
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-text-main-light dark:text-text-main-dark">
                    Email Notifications
                  </p>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    Receive notifications via email
                  </p>
                </div>
                <label className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-full h-full bg-gray-300 dark:bg-gray-600 peer-checked:bg-primary rounded-full peer-focus:ring-2 peer-focus:ring-primary transition-colors"></div>
                  <div className="absolute left-1 top-1 bg-white size-4 rounded-full transition-transform peer-checked:translate-x-6"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-text-main-light dark:text-text-main-dark">
                    Order Updates
                  </p>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    Get notified about order status changes
                  </p>
                </div>
                <label className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={orderUpdates}
                    onChange={(e) => setOrderUpdates(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-full h-full bg-gray-300 dark:bg-gray-600 peer-checked:bg-primary rounded-full peer-focus:ring-2 peer-focus:ring-primary transition-colors"></div>
                  <div className="absolute left-1 top-1 bg-white size-4 rounded-full transition-transform peer-checked:translate-x-6"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-text-main-light dark:text-text-main-dark">
                    Price Alerts
                  </p>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    Notify when favorites drop in price
                  </p>
                </div>
                <label className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={priceAlerts}
                    onChange={(e) => setPriceAlerts(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-full h-full bg-gray-300 dark:bg-gray-600 peer-checked:bg-primary rounded-full peer-focus:ring-2 peer-focus:ring-primary transition-colors"></div>
                  <div className="absolute left-1 top-1 bg-white size-4 rounded-full transition-transform peer-checked:translate-x-6"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-text-main-light dark:text-text-main-dark">
                    New Messages
                  </p>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    Get notified of new chat messages
                  </p>
                </div>
                <label className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={newMessages}
                    onChange={(e) => setNewMessages(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-full h-full bg-gray-300 dark:bg-gray-600 peer-checked:bg-primary rounded-full peer-focus:ring-2 peer-focus:ring-primary transition-colors"></div>
                  <div className="absolute left-1 top-1 bg-white size-4 rounded-full transition-transform peer-checked:translate-x-6"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-text-main-light dark:text-text-main-dark">
                    Promotions & Deals
                  </p>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    Receive promotional offers and deals
                  </p>
                </div>
                <label className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={promotions}
                    onChange={(e) => setPromotions(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-full h-full bg-gray-300 dark:bg-gray-600 peer-checked:bg-primary rounded-full peer-focus:ring-2 peer-focus:ring-primary transition-colors"></div>
                  <div className="absolute left-1 top-1 bg-white size-4 rounded-full transition-transform peer-checked:translate-x-6"></div>
                </label>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSaveNotifications}
                  className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-lg transition-all"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </section>

          {/* Privacy Settings */}
          <section className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-border-light/50 dark:border-border-dark p-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary text-2xl">privacy_tip</span>
              <h2 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
                Privacy Settings
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-text-main-light dark:text-text-main-dark">
                    Public Profile
                  </p>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    Make your profile visible to other users
                  </p>
                </div>
                <label className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={profilePublic}
                    onChange={(e) => setProfilePublic(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-full h-full bg-gray-300 dark:bg-gray-600 peer-checked:bg-primary rounded-full peer-focus:ring-2 peer-focus:ring-primary transition-colors"></div>
                  <div className="absolute left-1 top-1 bg-white size-4 rounded-full transition-transform peer-checked:translate-x-6"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-text-main-light dark:text-text-main-dark">
                    Show Purchase History
                  </p>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    Display your purchase history publicly
                  </p>
                </div>
                <label className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={showPurchaseHistory}
                    onChange={(e) => setShowPurchaseHistory(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-full h-full bg-gray-300 dark:bg-gray-600 peer-checked:bg-primary rounded-full peer-focus:ring-2 peer-focus:ring-primary transition-colors"></div>
                  <div className="absolute left-1 top-1 bg-white size-4 rounded-full transition-transform peer-checked:translate-x-6"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-text-main-light dark:text-text-main-dark">
                    Allow Messages
                  </p>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    Let sellers send you messages
                  </p>
                </div>
                <label className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={allowMessages}
                    onChange={(e) => setAllowMessages(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-full h-full bg-gray-300 dark:bg-gray-600 peer-checked:bg-primary rounded-full peer-focus:ring-2 peer-focus:ring-primary transition-colors"></div>
                  <div className="absolute left-1 top-1 bg-white size-4 rounded-full transition-transform peer-checked:translate-x-6"></div>
                </label>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSavePrivacy}
                  className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-lg transition-all"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </section>

          {/* Change Password */}
          <section className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-border-light/50 dark:border-border-dark p-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary text-2xl">lock</span>
              <h2 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
                Change Password
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border-light/50 dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border-light/50 dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border-light/50 dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleChangePassword}
                  className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-lg transition-all"
                >
                  Update Password
                </button>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="bg-red-500/5 rounded-2xl border-2 border-red-500/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-red-500 text-2xl">warning</span>
              <h2 className="text-xl font-bold text-red-500">
                Danger Zone
              </h2>
            </div>
            
            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>

            <button
              onClick={handleDeleteAccount}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg transition-all"
            >
              <span className="material-symbols-outlined">delete_forever</span>
              Delete Account
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

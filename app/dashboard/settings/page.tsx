"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "account" | "notifications" | "security" | "privacy">("profile");

  // Profile Settings
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("+94 77 123 4567");
  const [bio, setBio] = useState("Passionate seller of quality products");
  const [location, setLocation] = useState("Colombo, Sri Lanka");

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState({
    orders: true,
    messages: true,
    reviews: false,
    promotions: true,
  });

  const [pushNotifications, setPushNotifications] = useState({
    orders: true,
    messages: true,
    reviews: true,
    promotions: false,
  });

  // Privacy Settings
  const [privacySettings, setPrivacySettings] = useState({
    showEmail: false,
    showPhone: true,
    showLocation: true,
    allowMessages: true,
  });

  const saveProfileSettings = () => {
    toast.success("Profile settings saved successfully!");
  };

  const saveAccountSettings = () => {
    toast.success("Account settings saved successfully!");
  };

  const saveNotificationSettings = () => {
    toast.success("Notification preferences updated!");
  };

  const saveSecuritySettings = () => {
    toast.success("Security settings updated!");
  };

  const savePrivacySettings = () => {
    toast.success("Privacy settings saved!");
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: "person" },
    { id: "account", label: "Account", icon: "manage_accounts" },
    { id: "notifications", label: "Notifications", icon: "notifications" },
    { id: "security", label: "Security", icon: "lock" },
    { id: "privacy", label: "Privacy", icon: "shield" },
  ] as const;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-border-light/50 dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <div className="px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-extrabold text-text-main-light dark:text-text-main-dark tracking-tight">
            Settings
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
            Manage your account and preferences
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-3 shadow-card border border-border-light/50 dark:border-border-dark sticky top-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold mb-2 ${
                    activeTab === tab.id
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : "text-text-secondary-light dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-background-dark"
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">{tab.icon}</span>
                  <span className="text-sm">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-card border border-border-light/50 dark:border-border-dark">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">
                    Profile Information
                  </h2>
                  <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">
                    person
                  </span>
                </div>

                {/* Profile Picture */}
                <div className="mb-8">
                  <label className="block text-sm font-bold text-text-main-light dark:text-text-main-dark mb-3">
                    Profile Picture
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="size-20 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      JD
                    </div>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold shadow-lg shadow-primary/30 transition-all text-sm">
                        Upload New
                      </button>
                      <button className="px-4 py-2 rounded-lg border border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-background-dark font-bold transition-all text-sm">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-text-main-light dark:text-text-main-dark mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-text-main-light dark:text-text-main-dark mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-text-main-light dark:text-text-main-dark mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-text-main-light dark:text-text-main-dark mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-text-main-light dark:text-text-main-dark mb-2">
                      Bio
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border-light dark:border-border-dark">
                  <button className="px-6 py-3 rounded-xl border border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-background-dark font-bold transition-all">
                    Cancel
                  </button>
                  <button
                    onClick={saveProfileSettings}
                    className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold shadow-lg shadow-primary/30 transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Account Settings */}
            {activeTab === "account" && (
              <div className="space-y-6">
                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-card border border-border-light/50 dark:border-border-dark">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">
                      Account Settings
                    </h2>
                    <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">
                      manage_accounts
                    </span>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-text-main-light dark:text-text-main-dark mb-2">
                        Account Type
                      </label>
                      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                        <span className="material-symbols-outlined text-primary text-2xl">verified</span>
                        <div className="flex-1">
                          <p className="font-bold text-text-main-light dark:text-text-main-dark">Premium Seller</p>
                          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Active until Dec 31, 2026</p>
                        </div>
                        <button className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-lg shadow-primary/30 transition-all">
                          Upgrade
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-text-main-light dark:text-text-main-dark mb-2">
                        Language
                      </label>
                      <select className="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none cursor-pointer">
                        <option>English</option>
                        <option>Sinhala</option>
                        <option>Tamil</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-text-main-light dark:text-text-main-dark mb-2">
                        Currency
                      </label>
                      <select className="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none cursor-pointer">
                        <option>LKR - Sri Lankan Rupee</option>
                        <option>USD - US Dollar</option>
                        <option>EUR - Euro</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-text-main-light dark:text-text-main-dark mb-2">
                        Time Zone
                      </label>
                      <select className="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none cursor-pointer">
                        <option>GMT+5:30 Colombo</option>
                        <option>GMT+0 London</option>
                        <option>GMT-5 New York</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border-light dark:border-border-dark">
                    <button className="px-6 py-3 rounded-xl border border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-background-dark font-bold transition-all">
                      Cancel
                    </button>
                    <button
                      onClick={saveAccountSettings}
                      className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold shadow-lg shadow-primary/30 transition-all"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-red-500 text-2xl">warning</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-red-500 mb-2">Danger Zone</h3>
                      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <button className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold text-sm shadow-lg shadow-red-500/30 transition-all">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-card border border-border-light/50 dark:border-border-dark">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">
                    Notification Preferences
                  </h2>
                  <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">
                    notifications
                  </span>
                </div>

                <div className="space-y-6">
                  {/* Email Notifications */}
                  <div>
                    <h3 className="font-bold text-text-main-light dark:text-text-main-dark mb-4">Email Notifications</h3>
                    <div className="space-y-3">
                      {Object.entries(emailNotifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark rounded-xl">
                          <div>
                            <p className="font-bold text-text-main-light dark:text-text-main-dark capitalize">{key}</p>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                              Receive email updates for {key.toLowerCase()}
                            </p>
                          </div>
                          <button
                            onClick={() => setEmailNotifications({ ...emailNotifications, [key]: !value })}
                            className={`relative w-14 h-7 rounded-full transition-all ${
                              value ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                            }`}
                          >
                            <div
                              className={`absolute top-1 left-1 size-5 bg-white rounded-full shadow-md transition-all ${
                                value ? "translate-x-7" : ""
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Push Notifications */}
                  <div>
                    <h3 className="font-bold text-text-main-light dark:text-text-main-dark mb-4">Push Notifications</h3>
                    <div className="space-y-3">
                      {Object.entries(pushNotifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark rounded-xl">
                          <div>
                            <p className="font-bold text-text-main-light dark:text-text-main-dark capitalize">{key}</p>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                              Receive push notifications for {key.toLowerCase()}
                            </p>
                          </div>
                          <button
                            onClick={() => setPushNotifications({ ...pushNotifications, [key]: !value })}
                            className={`relative w-14 h-7 rounded-full transition-all ${
                              value ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                            }`}
                          >
                            <div
                              className={`absolute top-1 left-1 size-5 bg-white rounded-full shadow-md transition-all ${
                                value ? "translate-x-7" : ""
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border-light dark:border-border-dark">
                  <button
                    onClick={saveNotificationSettings}
                    className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold shadow-lg shadow-primary/30 transition-all"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-card border border-border-light/50 dark:border-border-dark">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">
                      Security Settings
                    </h2>
                    <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">
                      lock
                    </span>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-text-main-light dark:text-text-main-dark mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-text-main-light dark:text-text-main-dark mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-text-main-light dark:text-text-main-dark mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border-light dark:border-border-dark">
                    <button
                      onClick={saveSecuritySettings}
                      className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold shadow-lg shadow-primary/30 transition-all"
                    >
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-card border border-border-light/50 dark:border-border-dark">
                  <h3 className="font-bold text-text-main-light dark:text-text-main-dark mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark rounded-xl">
                    <div>
                      <p className="font-bold text-text-main-light dark:text-text-main-dark">Enable 2FA</p>
                      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-lg shadow-primary/30 transition-all">
                      Enable
                    </button>
                  </div>
                </div>

                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-card border border-border-light/50 dark:border-border-dark">
                  <h3 className="font-bold text-text-main-light dark:text-text-main-dark mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-2xl">computer</span>
                        <div>
                          <p className="font-bold text-text-main-light dark:text-text-main-dark">Windows PC</p>
                          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Colombo, Sri Lanka • Active now</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold">Current</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark text-2xl">phone_iphone</span>
                        <div>
                          <p className="font-bold text-text-main-light dark:text-text-main-dark">iPhone 13</p>
                          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Colombo, Sri Lanka • 2 days ago</p>
                        </div>
                      </div>
                      <button className="px-3 py-1.5 rounded-lg text-red-500 hover:bg-red-500/10 text-sm font-bold transition-all">
                        Revoke
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === "privacy" && (
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-card border border-border-light/50 dark:border-border-dark">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">
                    Privacy Settings
                  </h2>
                  <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">
                    shield
                  </span>
                </div>

                <div className="space-y-4">
                  {Object.entries(privacySettings).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark rounded-xl">
                      <div>
                        <p className="font-bold text-text-main-light dark:text-text-main-dark capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </p>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                          {key === "showEmail" && "Display your email address on your profile"}
                          {key === "showPhone" && "Display your phone number on your profile"}
                          {key === "showLocation" && "Display your location on your profile"}
                          {key === "allowMessages" && "Allow other users to send you messages"}
                        </p>
                      </div>
                      <button
                        onClick={() => setPrivacySettings({ ...privacySettings, [key]: !value })}
                        className={`relative w-14 h-7 rounded-full transition-all ${
                          value ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      >
                        <div
                          className={`absolute top-1 left-1 size-5 bg-white rounded-full shadow-md transition-all ${
                            value ? "translate-x-7" : ""
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border-light dark:border-border-dark">
                  <button
                    onClick={savePrivacySettings}
                    className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold shadow-lg shadow-primary/30 transition-all"
                  >
                    Save Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

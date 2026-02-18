"use client";

import { useState } from "react";

export default function AdminDashboardPage() {
  const [stats] = useState([
    { id: "users", label: "Total Users", value: "1,234", change: "+48", icon: "group", color: "primary" },
    { id: "listings", label: "Active Listings", value: "856", change: "+92", icon: "inventory_2", color: "blue-500" },
    { id: "orders", label: "Total Orders", value: "3,421", change: "+156", icon: "shopping_bag", color: "green-500" },
    { id: "revenue", label: "Total Revenue", value: "LKR 2.4M", change: "+23%", icon: "payments", color: "purple-500" },
  ]);

  const recentActivity = [
    { id: 1, type: "user", message: "New user registration: john.doe@example.com", time: "2 min ago", icon: "person_add", color: "blue-500" },
    { id: 2, type: "listing", message: "New listing: iPhone 14 Pro Max", time: "5 min ago", icon: "add_circle", color: "green-500" },
    { id: 3, type: "order", message: "Order #ORD-3421 completed", time: "12 min ago", icon: "check_circle", color: "purple-500" },
    { id: 4, type: "report", message: "Listing reported by user", time: "18 min ago", icon: "flag", color: "red-500" },
    { id: 5, type: "review", message: "New 5-star review posted", time: "25 min ago", icon: "star", color: "yellow-500" },
  ];

  const pendingActions = [
    { id: 1, title: "Review reported listings", count: 5, icon: "flag", color: "red-500" },
    { id: 2, title: "Verify new sellers", count: 12, icon: "verified_user", color: "blue-500" },
    { id: 3, title: "Approve pending listings", count: 8, icon: "pending", color: "yellow-500" },
    { id: 4, title: "Resolve user disputes", count: 3, icon: "gavel", color: "purple-500" },
  ];

  const topSellers = [
    { id: 1, name: "TechStore Premium", listings: 45, sales: 234, revenue: "LKR 450K" },
    { id: 2, name: "Fashion Hub", listings: 38, sales: 189, revenue: "LKR 380K" },
    { id: 3, name: "Electronics World", listings: 32, sales: 156, revenue: "LKR 320K" },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-border-light/50 dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <div className="px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-text-main-light dark:text-text-main-dark tracking-tight">
                Admin Dashboard
              </h1>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
                Monitor and manage your marketplace platform
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-surface-light dark:bg-surface-dark border border-border-light/50 dark:border-border-dark hover:border-primary text-text-main-light dark:text-text-main-dark font-semibold px-4 py-2 rounded-lg transition-all">
                <span className="material-symbols-outlined text-lg">download</span>
                Export
              </button>
              <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold px-6 py-3 rounded-full shadow-lg shadow-primary/30 transition-all hover:scale-[1.02]">
                <span className="material-symbols-outlined">analytics</span>
                View Reports
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-card border border-border-light/50 dark:border-border-dark hover:shadow-hover transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`flex items-center justify-center size-12 rounded-xl bg-${stat.color}/10 text-${stat.color}`}>
                  <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
                </div>
                <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-border-light/50 dark:border-border-dark">
            <div className="p-6 border-b border-border-light/50 dark:border-border-dark">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">
                  Recent Activity
                </h2>
                <a href="/admin/activity" className="text-sm font-bold text-primary hover:text-primary-hover">
                  View All
                </a>
              </div>
            </div>
            <div className="divide-y divide-border-light/50 dark:divide-border-dark">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="p-6 hover:bg-background-light dark:hover:bg-background-dark transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center size-10 rounded-full bg-${activity.color}/10 text-${activity.color}`}>
                      <span className="material-symbols-outlined text-xl">{activity.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-text-main-light dark:text-text-main-dark">
                        {activity.message}
                      </p>
                      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Actions */}
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-border-light/50 dark:border-border-dark">
            <div className="p-6 border-b border-border-light/50 dark:border-border-dark">
              <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">
                Pending Actions
              </h2>
            </div>
            <div className="divide-y divide-border-light/50 dark:divide-border-dark">
              {pendingActions.map((action) => (
                <div
                  key={action.id}
                  className="p-6 hover:bg-background-light dark:hover:bg-background-dark transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center size-10 rounded-full bg-${action.color}/10 text-${action.color}`}>
                      <span className="material-symbols-outlined text-xl">{action.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-text-main-light dark:text-text-main-dark">
                        {action.title}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold bg-${action.color}/10 text-${action.color}`}>
                      {action.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Sellers */}
        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-border-light/50 dark:border-border-dark">
          <div className="p-6 border-b border-border-light/50 dark:border-border-dark">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">
                Top Sellers This Month
              </h2>
              <a href="/admin/sellers" className="text-sm font-bold text-primary hover:text-primary-hover">
                View All
              </a>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-light/50 dark:border-border-dark">
                  <th className="text-left p-6 text-sm font-bold text-text-secondary-light dark:text-text-secondary-dark">Rank</th>
                  <th className="text-left p-6 text-sm font-bold text-text-secondary-light dark:text-text-secondary-dark">Seller</th>
                  <th className="text-left p-6 text-sm font-bold text-text-secondary-light dark:text-text-secondary-dark">Listings</th>
                  <th className="text-left p-6 text-sm font-bold text-text-secondary-light dark:text-text-secondary-dark">Sales</th>
                  <th className="text-left p-6 text-sm font-bold text-text-secondary-light dark:text-text-secondary-dark">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topSellers.map((seller, index) => (
                  <tr
                    key={seller.id}
                    className="border-b border-border-light/50 dark:border-border-dark hover:bg-background-light dark:hover:bg-background-dark transition-colors"
                  >
                    <td className="p-6">
                      <div className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary font-bold">
                        {index + 1}
                      </div>
                    </td>
                    <td className="p-6">
                      <p className="font-semibold text-text-main-light dark:text-text-main-dark">
                        {seller.name}
                      </p>
                    </td>
                    <td className="p-6">
                      <p className="text-text-secondary-light dark:text-text-secondary-dark">
                        {seller.listings}
                      </p>
                    </td>
                    <td className="p-6">
                      <p className="text-text-secondary-light dark:text-text-secondary-dark">
                        {seller.sales}
                      </p>
                    </td>
                    <td className="p-6">
                      <p className="font-bold text-primary">
                        {seller.revenue}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

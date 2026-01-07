"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [stats] = useState([
    { id: "listings", label: "Active Listings", value: "12", change: "+2", icon: "inventory_2", color: "primary" },
    { id: "views", label: "Total Views", value: "1,234", change: "+156", icon: "visibility", color: "blue-500" },
    { id: "messages", label: "New Messages", value: "8", change: "+3", icon: "chat_bubble", color: "green-500" },
    { id: "revenue", label: "This Month", value: "LKR 45,600", change: "+12%", icon: "payments", color: "purple-500" },
  ]);

  const recentListings = [
    { id: 1, title: "iPhone 13 Pro Max 128GB", price: "LKR 125,000", views: 234, status: "active", image: "📱" },
    { id: 2, title: "Sony Camera A7III", price: "LKR 245,000", views: 156, status: "active", image: "📷" },
    { id: 3, title: "MacBook Pro 14\"", price: "LKR 350,000", views: 89, status: "pending", image: "💻" },
    { id: 4, title: "Nike Air Jordan", price: "LKR 18,500", views: 412, status: "active", image: "👟" },
  ];

  const recentMessages = [
    { id: 1, from: "Sarah Wilson", message: "Is this still available?", time: "5 min ago", unread: true },
    { id: 2, from: "Mike Johnson", message: "Can we negotiate the price?", time: "1 hour ago", unread: true },
    { id: 3, from: "Emma Davis", message: "Thanks for the quick response!", time: "2 hours ago", unread: false },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-border-light/50 dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <div className="px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-text-main-light dark:text-text-main-dark tracking-tight">
                Dashboard
              </h1>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
                Welcome back! Here&apos;s what&apos;s happening with your listings.
              </p>
            </div>
            <button className="hidden sm:flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold px-6 py-3 rounded-full shadow-lg shadow-primary/30 transition-all hover:scale-[1.02]">
              <span className="material-symbols-outlined">add_circle</span>
              New Listing
            </button>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Listings */}
          <div className="lg:col-span-2 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-border-light/50 dark:border-border-dark">
            <div className="p-6 border-b border-border-light/50 dark:border-border-dark">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">
                  Recent Listings
                </h2>
                <a href="/dashboard/listings" className="text-sm font-bold text-primary hover:text-primary-hover">
                  View All
                </a>
              </div>
            </div>
            <div className="divide-y divide-border-light/50 dark:divide-border-dark">
              {recentListings.map((listing) => (
                <div
                  key={listing.id}
                  className="p-6 hover:bg-background-light dark:hover:bg-background-dark transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center size-16 rounded-xl bg-background-light dark:bg-background-dark text-4xl">
                      {listing.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-text-main-light dark:text-text-main-dark truncate mb-1">
                        {listing.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-bold text-primary">{listing.price}</span>
                        <span className="text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">visibility</span>
                          {listing.views}
                        </span>
                      </div>
                    </div>
                    <div className="hidden sm:block">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          listing.status === "active"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-yellow-500/10 text-yellow-500"
                        }`}
                      >
                        {listing.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Messages */}
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-border-light/50 dark:border-border-dark">
            <div className="p-6 border-b border-border-light/50 dark:border-border-dark">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark flex items-center gap-2">
                  Messages
                  <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    3
                  </span>
                </h2>
                <a href="/dashboard/messages" className="text-sm font-bold text-primary hover:text-primary-hover">
                  View All
                </a>
              </div>
            </div>
            <div className="divide-y divide-border-light/50 dark:divide-border-dark">
              {recentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-6 hover:bg-background-light dark:hover:bg-background-dark transition-colors cursor-pointer ${
                    message.unread ? "bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center size-10 rounded-full bg-primary text-white font-bold text-sm">
                      {message.from.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-sm text-text-main-light dark:text-text-main-dark truncate">
                          {message.from}
                        </h4>
                        {message.unread && (
                          <span className="size-2 rounded-full bg-primary flex-shrink-0"></span>
                        )}
                      </div>
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate mb-1">
                        {message.message}
                      </p>
                      <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                        {message.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-card border border-border-light/50 dark:border-border-dark">
          <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button className="flex flex-col items-center gap-3 p-4 rounded-xl bg-background-light dark:bg-background-dark hover:bg-primary/10 dark:hover:bg-primary/20 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-all group">
              <div className="flex items-center justify-center size-12 rounded-xl bg-surface-light dark:bg-surface-dark group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-2xl">add_circle</span>
              </div>
              <span className="text-sm font-bold">New Listing</span>
            </button>
            <button className="flex flex-col items-center gap-3 p-4 rounded-xl bg-background-light dark:bg-background-dark hover:bg-primary/10 dark:hover:bg-primary/20 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-all group">
              <div className="flex items-center justify-center size-12 rounded-xl bg-surface-light dark:bg-surface-dark group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-2xl">edit</span>
              </div>
              <span className="text-sm font-bold">Edit Listing</span>
            </button>
            <button className="flex flex-col items-center gap-3 p-4 rounded-xl bg-background-light dark:bg-background-dark hover:bg-primary/10 dark:hover:bg-primary/20 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-all group">
              <div className="flex items-center justify-center size-12 rounded-xl bg-surface-light dark:bg-surface-dark group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-2xl">analytics</span>
              </div>
              <span className="text-sm font-bold">View Analytics</span>
            </button>
            <button className="flex flex-col items-center gap-3 p-4 rounded-xl bg-background-light dark:bg-background-dark hover:bg-primary/10 dark:hover:bg-primary/20 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-all group">
              <div className="flex items-center justify-center size-12 rounded-xl bg-surface-light dark:bg-surface-dark group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-2xl">settings</span>
              </div>
              <span className="text-sm font-bold">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

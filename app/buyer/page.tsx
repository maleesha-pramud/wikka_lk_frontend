"use client";

import { useState } from "react";

export default function BuyerDashboardPage() {
  const [stats] = useState([
    { id: "orders", label: "Total Orders", value: "24", change: "+3", icon: "shopping_bag", color: "primary" },
    { id: "favorites", label: "Favorites", value: "18", change: "+5", icon: "favorite", color: "red-500" },
    { id: "reviews", label: "Reviews Written", value: "12", change: "+2", icon: "rate_review", color: "blue-500" },
    { id: "spent", label: "Total Spent", value: "LKR 289,500", change: "+18%", icon: "payments", color: "green-500" },
  ]);

  const recentOrders = [
    { id: 1, title: "iPhone 13 Pro Max 128GB", price: "LKR 125,000", status: "delivered", date: "2024-03-15", seller: "TechStore", image: "📱" },
    { id: 2, title: "Sony Camera A7III", price: "LKR 245,000", status: "shipped", date: "2024-03-14", seller: "PhotoHub", image: "📷" },
    { id: 3, title: "Nike Air Jordan", price: "LKR 18,500", status: "processing", date: "2024-03-13", seller: "Sneaker World", image: "👟" },
    { id: 4, title: "PS5 DualSense Controller", price: "LKR 12,500", status: "pending", date: "2024-03-12", seller: "GamerZone", image: "🎮" },
  ];

  const recentFavorites = [
    { id: 1, title: "MacBook Pro 14\" M1 Pro", price: "LKR 350,000", seller: "Apple Store", image: "💻", views: 89 },
    { id: 2, title: "Samsung Galaxy S23 Ultra", price: "LKR 195,000", seller: "Mobile City", image: "📱", views: 156 },
    { id: 3, title: "Vintage Leather Jacket", price: "LKR 45,000", seller: "Fashion Boutique", image: "🧥", views: 234 },
  ];

  const statusColors = {
    delivered: "bg-green-500/10 text-green-500",
    shipped: "bg-blue-500/10 text-blue-500",
    processing: "bg-yellow-500/10 text-yellow-500",
    pending: "bg-orange-500/10 text-orange-500",
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-border-light/50 dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <div className="px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-text-main-light dark:text-text-main-dark tracking-tight">
                My Dashboard
              </h1>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
                Track your orders, favorites, and shopping activity.
              </p>
            </div>
            <button className="hidden sm:flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold px-6 py-3 rounded-full shadow-lg shadow-primary/30 transition-all hover:scale-[1.02]">
              <span className="material-symbols-outlined">search</span>
              Browse Products
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
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-border-light/50 dark:border-border-dark">
            <div className="p-6 border-b border-border-light/50 dark:border-border-dark">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">
                  Recent Orders
                </h2>
                <a href="/buyer/orders" className="text-sm font-bold text-primary hover:text-primary-hover">
                  View All
                </a>
              </div>
            </div>
            <div className="divide-y divide-border-light/50 dark:divide-border-dark">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-6 hover:bg-background-light dark:hover:bg-background-dark transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center size-16 rounded-xl bg-background-light dark:bg-background-dark text-4xl">
                      {order.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-text-main-light dark:text-text-main-dark truncate mb-1">
                        {order.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">store</span>
                          {order.seller}
                        </span>
                        <span>•</span>
                        <span>{order.date}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-text-main-light dark:text-text-main-dark mb-2">
                        {order.price}
                      </p>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold capitalize ${statusColors[order.status as keyof typeof statusColors]}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Favorites */}
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-border-light/50 dark:border-border-dark">
            <div className="p-6 border-b border-border-light/50 dark:border-border-dark">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">
                  Recent Favorites
                </h2>
                <a href="/buyer/favorites" className="text-sm font-bold text-primary hover:text-primary-hover">
                  View All
                </a>
              </div>
            </div>
            <div className="divide-y divide-border-light/50 dark:divide-border-dark">
              {recentFavorites.map((item) => (
                <div
                  key={item.id}
                  className="p-6 hover:bg-background-light dark:hover:bg-background-dark transition-colors"
                >
                  <div className="flex gap-3">
                    <div className="flex items-center justify-center size-12 rounded-xl bg-background-light dark:bg-background-dark text-2xl">
                      {item.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-text-main-light dark:text-text-main-dark truncate mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-2">
                        {item.seller}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-primary">
                          {item.price}
                        </p>
                        <span className="flex items-center gap-1 text-xs text-text-secondary-light dark:text-text-secondary-dark">
                          <span className="material-symbols-outlined text-sm">visibility</span>
                          {item.views}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
          <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <a
              href="/search"
              className="flex flex-col items-center gap-2 p-4 bg-surface-light dark:bg-surface-dark rounded-xl hover:shadow-md transition-all"
            >
              <span className="material-symbols-outlined text-3xl text-primary">search</span>
              <span className="text-sm font-semibold text-text-main-light dark:text-text-main-dark">Browse</span>
            </a>
            <a
              href="/buyer/orders"
              className="flex flex-col items-center gap-2 p-4 bg-surface-light dark:bg-surface-dark rounded-xl hover:shadow-md transition-all"
            >
              <span className="material-symbols-outlined text-3xl text-primary">shopping_bag</span>
              <span className="text-sm font-semibold text-text-main-light dark:text-text-main-dark">Orders</span>
            </a>
            <a
              href="/buyer/favorites"
              className="flex flex-col items-center gap-2 p-4 bg-surface-light dark:bg-surface-dark rounded-xl hover:shadow-md transition-all"
            >
              <span className="material-symbols-outlined text-3xl text-primary">favorite</span>
              <span className="text-sm font-semibold text-text-main-light dark:text-text-main-dark">Favorites</span>
            </a>
            <a
              href="/buyer/reviews"
              className="flex flex-col items-center gap-2 p-4 bg-surface-light dark:bg-surface-dark rounded-xl hover:shadow-md transition-all"
            >
              <span className="material-symbols-outlined text-3xl text-primary">rate_review</span>
              <span className="text-sm font-semibold text-text-main-light dark:text-text-main-dark">Reviews</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

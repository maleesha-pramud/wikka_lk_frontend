"use client";

import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

interface FavoriteItem {
  id: string;
  title: string;
  price: number;
  condition: string;
  location: string;
  seller: string;
  image: string;
  views: number;
  addedDate: string;
  available: boolean;
  category: string;
}

export default function BuyerFavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([
    {
      id: "FAV-001",
      title: "MacBook Pro 14\" M1 Pro 512GB",
      price: 350000,
      condition: "Like New",
      location: "Colombo 03",
      seller: "Apple Store",
      image: "💻",
      views: 89,
      addedDate: "2024-03-15",
      available: true,
      category: "Electronics"
    },
    {
      id: "FAV-002",
      title: "Samsung Galaxy S23 Ultra",
      price: 195000,
      condition: "New",
      location: "Kandy",
      seller: "Mobile City",
      image: "📱",
      views: 156,
      addedDate: "2024-03-14",
      available: true,
      category: "Electronics"
    },
    {
      id: "FAV-003",
      title: "Vintage Leather Jacket",
      price: 45000,
      condition: "Good",
      location: "Galle",
      seller: "Fashion Boutique",
      image: "🧥",
      views: 234,
      addedDate: "2024-03-13",
      available: true,
      category: "Fashion"
    },
    {
      id: "FAV-004",
      title: "Sony WH-1000XM5 Headphones",
      price: 65000,
      condition: "Like New",
      location: "Colombo 07",
      seller: "Audio Tech",
      image: "🎧",
      views: 178,
      addedDate: "2024-03-12",
      available: true,
      category: "Electronics"
    },
    {
      id: "FAV-005",
      title: "Trek Mountain Bike",
      price: 85000,
      condition: "Good",
      location: "Negombo",
      seller: "Bike World",
      image: "🚴",
      views: 145,
      addedDate: "2024-03-11",
      available: false,
      category: "Sports"
    },
    {
      id: "FAV-006",
      title: "Canon EOS R6 Camera",
      price: 425000,
      condition: "Like New",
      location: "Colombo 05",
      seller: "PhotoPro",
      image: "📷",
      views: 267,
      addedDate: "2024-03-10",
      available: true,
      category: "Electronics"
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const filteredFavorites = favorites
    .filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.seller.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === "" || item.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
      } else if (sortBy === "price-low") {
        return a.price - b.price;
      } else if (sortBy === "price-high") {
        return b.price - a.price;
      }
      return 0;
    });

  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter(item => item.id !== id));
    toast.success("Removed from favorites");
  };

  const handleAddToCart = (item: FavoriteItem) => {
    if (item.available) {
      toast.success(`Added "${item.title}" to cart`);
    } else {
      toast.error("This item is no longer available");
    }
  };

  const handleViewProduct = (id: string) => {
    toast.info(`Opening product details for ${id}`);
  };

  const handleContactSeller = (seller: string) => {
    toast.info(`Opening chat with ${seller}`);
  };

  const categories = Array.from(new Set(favorites.map(item => item.category)));

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-border-light/50 dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <div className="px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-text-main-light dark:text-text-main-dark tracking-tight">
                My Favorites
              </h1>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
                {favorites.length} {favorites.length === 1 ? "item" : "items"} saved
              </p>
            </div>
            
            <button
              onClick={() => toast.info("Sharing favorites...")}
              className="flex items-center gap-2 bg-surface-light dark:bg-surface-dark border border-border-light/50 dark:border-border-dark hover:border-primary text-text-main-light dark:text-text-main-dark font-semibold px-6 py-3 rounded-full transition-all"
            >
              <span className="material-symbols-outlined">share</span>
              Share List
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 lg:px-8 py-8">
        {/* Filters and Sort */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark">
              search
            </span>
            <input
              type="text"
              placeholder="Search favorites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-light/50 dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-main-light dark:text-text-main-dark focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 rounded-xl border border-border-light/50 dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-main-light dark:text-text-main-dark focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 rounded-xl border border-border-light/50 dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-main-light dark:text-text-main-dark focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Favorites Grid */}
        {filteredFavorites.length === 0 ? (
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-border-light/50 dark:border-border-dark p-12 text-center">
            <span className="material-symbols-outlined text-6xl text-text-secondary-light dark:text-text-secondary-dark mb-4">
              favorite_border
            </span>
            <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-2">
              No favorites yet
            </h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
              {searchQuery || filterCategory ? "Try adjusting your filters" : "Start browsing and save items you like"}
            </p>
            <Link href="/" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold px-6 py-3 rounded-full transition-all">
              <span className="material-symbols-outlined">search</span>
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map((item) => (
              <div
                key={item.id}
                className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-border-light/50 dark:border-border-dark overflow-hidden hover:shadow-hover transition-all group"
              >
                {/* Image Section */}
                <div className="relative bg-background-light dark:bg-background-dark h-48 flex items-center justify-center">
                  <span className="text-6xl">{item.image}</span>
                  
                  {/* Availability Badge */}
                  {!item.available && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Sold Out
                    </div>
                  )}
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveFavorite(item.id)}
                    className="absolute top-3 right-3 size-10 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                  >
                    <span className="material-symbols-outlined text-xl">close</span>
                  </button>

                  {/* Quick Actions */}
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button
                      onClick={() => handleViewProduct(item.id)}
                      className="flex-1 bg-white dark:bg-gray-800 hover:bg-primary hover:text-white text-text-main-light dark:text-text-main-dark font-semibold px-3 py-2 rounded-lg transition-all text-sm"
                    >
                      View
                    </button>
                    {item.available && (
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 bg-primary hover:bg-primary-hover text-white font-semibold px-3 py-2 rounded-lg transition-all text-sm"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="font-bold text-text-main-light dark:text-text-main-dark mb-1 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-2xl font-extrabold text-primary">
                      LKR {item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center gap-2 text-text-secondary-light dark:text-text-secondary-dark">
                      <span className="material-symbols-outlined text-base">verified</span>
                      <span>{item.condition}</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary-light dark:text-text-secondary-dark">
                      <span className="material-symbols-outlined text-base">location_on</span>
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary-light dark:text-text-secondary-dark">
                      <span className="material-symbols-outlined text-base">store</span>
                      <span>{item.seller}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border-light/50 dark:border-border-dark">
                    <div className="flex items-center gap-4 text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">visibility</span>
                        {item.views}
                      </span>
                      <span>Added {item.addedDate}</span>
                    </div>
                    <button
                      onClick={() => handleContactSeller(item.seller)}
                      className="text-primary hover:text-primary-hover"
                    >
                      <span className="material-symbols-outlined text-xl">chat</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bulk Actions */}
        {filteredFavorites.length > 0 && (
          <div className="mt-8 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-border-light/50 dark:border-border-dark p-6">
            <h3 className="font-bold text-text-main-light dark:text-text-main-dark mb-4">Bulk Actions</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => toast.success("All available items added to cart")}
                className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-4 py-2 rounded-lg transition-all"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                Add All to Cart
              </button>
              <button
                onClick={() => {
                  setFavorites([]);
                  toast.success("All favorites cleared");
                }}
                className="flex items-center gap-2 bg-surface-light dark:bg-surface-dark border border-border-light/50 dark:border-border-dark hover:border-red-500 hover:text-red-500 text-text-main-light dark:text-text-main-dark font-semibold px-4 py-2 rounded-lg transition-all"
              >
                <span className="material-symbols-outlined">delete</span>
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

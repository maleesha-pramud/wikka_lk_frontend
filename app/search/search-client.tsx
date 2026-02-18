"use client";

import { useState } from "react";
import { ProductCard } from "@/components/client/ProductCard";
import staticData from "@/lib/static-data.json";

interface Product {
  id: string;
  title: string;
  price: number;
  condition: string;
  location: string;
  distance: string;
  image: string;
  isFavorite: boolean;
}

const mockProducts: Product[] = staticData.mockProducts;

export function SearchClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("Current Location");
  const [sortBy, setSortBy] = useState("relevance");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState("any");
  const [products] = useState<Product[]>(mockProducts);

  const handleConditionChange = (condition: string) => {
    setSelectedConditions(prev =>
      prev.includes(condition)
        ? prev.filter(c => c !== condition)
        : [...prev, condition]
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleResetFilters = () => {
    setPriceMin("");
    setPriceMax("");
    setSelectedConditions([]);
    setSelectedCategories([]);
    setDateFilter("any");
  };

  const toggleFavorite = (productId: string) => {
    // Handle favorite toggle logic
    console.log("Toggle favorite:", productId);
  };

  return (
    <>
      {/* Search Section */}
      <section className="w-full border-b border-gray-100 bg-white py-8 dark:border-gray-800 dark:bg-[#1f2937]">
        <div className="mx-auto max-w-350 px-6">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-extrabold text-text-main dark:text-white">
                Search Products
              </h1>
              <p className="mt-2 text-text-secondary dark:text-gray-400">
                Find the perfect item from thousands of listings
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="flex w-full flex-col rounded-2xl bg-white p-2 shadow-[0_8px_30px_rgb(0,0,0,0.08)] ring-1 ring-black/5 dark:bg-surface-dark dark:ring-white/10 md:flex-row md:items-center md:rounded-full">
              <div className="flex flex-1 items-center px-4 py-2">
                <span className="material-symbols-outlined text-gray-400">search</span>
                <input
                  className="w-full border-none bg-transparent p-3 text-base text-text-main placeholder-gray-400 focus:ring-0 dark:text-white dark:placeholder-gray-500 font-medium"
                  placeholder="What are you looking for?"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="hidden h-8 w-px bg-gray-200 dark:bg-gray-600 md:block"></div>
              <div className="flex flex-1 items-center px-4 py-2">
                <span className="material-symbols-outlined text-gray-400">location_on</span>
                <input
                  className="w-full border-none bg-transparent p-3 text-base text-text-main placeholder-gray-400 focus:ring-0 dark:text-white dark:placeholder-gray-500 font-medium"
                  placeholder="Current Location"
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                />
              </div>
              <button className="flex h-12 w-full items-center justify-center rounded-xl md:rounded-full bg-primary px-8 font-bold text-white transition-colors hover:bg-primary-hover shadow-lg shadow-primary/20 md:w-auto md:min-w-35">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto flex w-full max-w-350 flex-1 gap-10 px-6 py-8">
        {/* Filters Sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-28 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-text-main dark:text-white">Filters</h3>
              <button
                onClick={handleResetFilters}
                className="text-sm font-semibold text-primary hover:text-primary-hover hover:underline"
              >
                Reset all
              </button>
            </div>
            
            <div className="flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-surface-dark">
              {/* Categories */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-bold text-text-main dark:text-gray-200">Categories</label>
                <div className="space-y-2">
                  {['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Vehicles', 'Gaming'].map((category) => (
                    <label key={category} className="flex items-center gap-3 text-sm text-text-secondary hover:text-text-main dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer">
                      <input
                        className="size-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-background-dark"
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                      />
                      <span className="font-medium">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-100 dark:bg-gray-700"></div>

              {/* Price Range */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-bold text-text-main dark:text-gray-200">Price Range</label>
                <div className="flex items-center gap-3">
                  <div className="relative w-full">
                    <input
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-7 pr-3 py-2.5 text-sm font-medium focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-background-dark dark:text-white"
                      placeholder="Min"
                      type="number"
                      value={priceMin}
                      onChange={(e) => setPriceMin(e.target.value)}
                    />
                  </div>
                  <span className="text-gray-400 font-medium">-</span>
                  <div className="relative w-full">
                    <input
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-7 pr-3 py-2.5 text-sm font-medium focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-background-dark dark:text-white"
                      placeholder="Max"
                      type="number"
                      value={priceMax}
                      onChange={(e) => setPriceMax(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="h-px bg-gray-100 dark:bg-gray-700"></div>

              {/* Condition */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-bold text-text-main dark:text-gray-200">Condition</label>
                <div className="space-y-2">
                  {['New', 'Like New', 'Good', 'Fair'].map((condition) => (
                    <label key={condition} className="flex items-center gap-3 text-sm text-text-secondary hover:text-text-main dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer">
                      <input
                        className="size-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-background-dark"
                        type="checkbox"
                        checked={selectedConditions.includes(condition)}
                        onChange={() => handleConditionChange(condition)}
                      />
                      <span className="font-medium">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-100 dark:bg-gray-700"></div>

              {/* Date Listed */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-bold text-text-main dark:text-gray-200">Date Listed</label>
                <select
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-medium focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-background-dark dark:text-white"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  <option value="any">Any time</option>
                  <option value="24h">Last 24 hours</option>
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                </select>
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex flex-1 flex-col gap-6">
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-text-main dark:text-white">
                {products.length} Results
              </h2>
              <p className="mt-1 text-sm text-text-secondary dark:text-gray-400">
                {searchQuery ? `Results for "${searchQuery}"` : 'All products'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-text-secondary hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-surface-dark lg:hidden">
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                Filters
              </button>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text-secondary dark:text-gray-400">Sort by:</span>
                <select
                  className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-text-main focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-surface-dark dark:text-white"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="distance">Nearest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                condition={product.condition}
                location={product.location}
                distance={product.distance}
                image={product.image}
                alt={product.title}
                isFavorite={product.isFavorite}
                onFavoriteToggle={toggleFavorite}
                onClick={(id) => console.log("Product clicked:", id)}
              />
            ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center pt-8">
            <button className="flex h-12 items-center justify-center gap-2 rounded-full border-2 border-gray-200 bg-white px-8 font-bold text-text-main transition-all hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-gray-700 dark:bg-surface-dark dark:text-white dark:hover:border-primary">
              <span className="material-symbols-outlined text-[20px]">refresh</span>
              Load More Results
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

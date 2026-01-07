"use client";

import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/client/ui/dialog";

interface Listing {
  id: string;
  title: string;
  category: string;
  price: number;
  brand: string;
  model: string;
  condition: string;
  views: number;
  favorites: number;
  status: "active" | "pending" | "sold" | "inactive";
  createdAt: string;
  image: string;
  stock: number;
}

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([
    {
      id: "LST-001",
      title: "iPhone 13 Pro Max 128GB Sierra Blue",
      category: "Mobile",
      price: 125000,
      brand: "Apple",
      model: "iPhone 13 Pro Max",
      condition: "Like New",
      views: 234,
      favorites: 18,
      status: "active",
      createdAt: "2024-03-15",
      image: "📱",
      stock: 2
    },
    {
      id: "LST-002",
      title: "Sony Camera A7III Full Kit",
      category: "Cameras",
      price: 245000,
      brand: "Sony",
      model: "A7III",
      condition: "Good",
      views: 156,
      favorites: 12,
      status: "active",
      createdAt: "2024-03-14",
      image: "📷",
      stock: 1
    },
    {
      id: "LST-003",
      title: "MacBook Pro 14\" M1 Pro 512GB",
      category: "Computers",
      price: 350000,
      brand: "Apple",
      model: "MacBook Pro 14",
      condition: "Like New",
      views: 89,
      favorites: 8,
      status: "pending",
      createdAt: "2024-03-13",
      image: "💻",
      stock: 1
    },
    {
      id: "LST-004",
      title: "Nike Air Jordan 1 Red - Size 42",
      category: "Fashion",
      price: 18500,
      brand: "Nike",
      model: "Air Jordan 1",
      condition: "New",
      views: 412,
      favorites: 34,
      status: "active",
      createdAt: "2024-03-12",
      image: "👟",
      stock: 3
    },
    {
      id: "LST-005",
      title: "PS5 DualSense Controller White",
      category: "Gaming",
      price: 12500,
      brand: "Sony",
      model: "DualSense",
      condition: "Good",
      views: 178,
      favorites: 15,
      status: "sold",
      createdAt: "2024-03-11",
      image: "🎮",
      stock: 0
    },
    {
      id: "LST-006",
      title: "Canon EOS R5 Camera Body Only",
      category: "Cameras",
      price: 480000,
      brand: "Canon",
      model: "EOS R5",
      condition: "Like New",
      views: 67,
      favorites: 9,
      status: "inactive",
      createdAt: "2024-03-10",
      image: "📸",
      stock: 1
    },
  ]);

  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");

  const statusColors = {
    active: "bg-green-500/10 text-green-500",
    pending: "bg-yellow-500/10 text-yellow-500",
    sold: "bg-blue-500/10 text-blue-500",
    inactive: "bg-gray-500/10 text-gray-500",
  };

  const statusIcons = {
    active: "check_circle",
    pending: "schedule",
    sold: "shopping_bag",
    inactive: "visibility_off",
  };

  const categories = ["Mobile", "Cameras", "Computers", "Fashion", "Gaming", "Sports"];

  const filteredListings = listings.filter((listing) => {
    const matchesSearch = 
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !filterStatus || listing.status === filterStatus;
    const matchesCategory = !filterCategory || listing.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const updateListingStatus = (listingId: string, newStatus: Listing["status"]) => {
    setListings(
      listings.map((listing) =>
        listing.id === listingId ? { ...listing, status: newStatus } : listing
      )
    );
    toast.success(`Listing ${listingId} marked as ${newStatus}`);
  };

  const deleteListing = () => {
    if (selectedListing) {
      setListings(listings.filter((listing) => listing.id !== selectedListing.id));
      toast.success("Listing deleted successfully!");
      setShowDeleteDialog(false);
      setSelectedListing(null);
    }
  };

  const viewListingDetails = (listing: Listing) => {
    setSelectedListing(listing);
    setShowDetailsDialog(true);
  };

  const confirmDelete = (listing: Listing) => {
    setSelectedListing(listing);
    setShowDeleteDialog(true);
  };

  const closeDialog = () => {
    setShowDetailsDialog(false);
    setShowDeleteDialog(false);
    setSelectedListing(null);
  };

  const getListingStats = () => {
    return {
      total: listings.length,
      active: listings.filter((l) => l.status === "active").length,
      pending: listings.filter((l) => l.status === "pending").length,
      sold: listings.filter((l) => l.status === "sold").length,
      totalViews: listings.reduce((sum, l) => sum + l.views, 0),
    };
  };

  const stats = getListingStats();

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-border-light/50 dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <div className="px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-text-main-light dark:text-text-main-dark tracking-tight">
                My Listings
              </h1>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
                Manage all your product listings
              </p>
            </div>
            <a
              href="/sell"
              className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold px-6 py-3 rounded-full shadow-lg shadow-primary/30 transition-all hover:scale-[1.02]"
            >
              <span className="material-symbols-outlined">add</span>
              New Listing
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 shadow-card border border-border-light/50 dark:border-border-dark">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-lg">inventory_2</span>
              </div>
              <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
                {stats.total}
              </h3>
            </div>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">
              Total Listings
            </p>
          </div>
          
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 shadow-card border border-border-light/50 dark:border-border-dark">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center justify-center size-8 rounded-lg bg-green-500/10 text-green-500">
                <span className="material-symbols-outlined text-lg">check_circle</span>
              </div>
              <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
                {stats.active}
              </h3>
            </div>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">
              Active
            </p>
          </div>

          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 shadow-card border border-border-light/50 dark:border-border-dark">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center justify-center size-8 rounded-lg bg-yellow-500/10 text-yellow-500">
                <span className="material-symbols-outlined text-lg">schedule</span>
              </div>
              <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
                {stats.pending}
              </h3>
            </div>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">
              Pending
            </p>
          </div>

          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 shadow-card border border-border-light/50 dark:border-border-dark">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center justify-center size-8 rounded-lg bg-blue-500/10 text-blue-500">
                <span className="material-symbols-outlined text-lg">shopping_bag</span>
              </div>
              <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
                {stats.sold}
              </h3>
            </div>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">
              Sold
            </p>
          </div>

          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 shadow-card border border-border-light/50 dark:border-border-dark">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center justify-center size-8 rounded-lg bg-purple-500/10 text-purple-500">
                <span className="material-symbols-outlined text-lg">visibility</span>
              </div>
              <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
                {stats.totalViews}
              </h3>
            </div>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">
              Total Views
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="lg:col-span-2">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">
                search
              </span>
              <input
                type="text"
                placeholder="Search listings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-main-light dark:text-text-main-dark placeholder-text-secondary-light/60 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
              />
            </div>
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-main-light dark:text-text-main-dark px-4 py-3.5 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm appearance-none cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="sold">Sold</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-main-light dark:text-text-main-dark px-4 py-3.5 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm appearance-none cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <div
              key={listing.id}
              className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-border-light/50 dark:border-border-dark hover:shadow-hover transition-all group overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-4/3 bg-background-light dark:bg-background-dark flex items-center justify-center text-6xl">
                {listing.image}
                <div className="absolute top-2 right-2">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 ${statusColors[listing.status]}`}>
                    <span className="material-symbols-outlined text-sm">{statusIcons[listing.status]}</span>
                    {listing.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-text-main-light dark:text-text-main-dark mb-2 line-clamp-2 min-h-[3rem]">
                  {listing.title}
                </h3>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-primary">
                    LKR {listing.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                    Stock: {listing.stock}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">visibility</span>
                    <span>{listing.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">favorite</span>
                    <span>{listing.favorites}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-border-light dark:border-border-dark">
                  <button
                    onClick={() => viewListingDetails(listing)}
                    className="flex-1 px-3 py-2 rounded-lg bg-background-light dark:bg-background-dark hover:bg-primary/10 dark:hover:bg-primary/20 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-all text-sm font-bold"
                  >
                    View
                  </button>
                  <a
                    href={`/sell?edit=${listing.id}`}
                    className="flex-1 px-3 py-2 rounded-lg bg-background-light dark:bg-background-dark hover:bg-primary/10 dark:hover:bg-primary/20 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-all text-sm font-bold text-center"
                  >
                    Edit
                  </a>
                  <button
                    onClick={() => confirmDelete(listing)}
                    className="flex-1 px-3 py-2 rounded-lg bg-background-light dark:bg-background-dark hover:bg-red-500/10 text-text-secondary-light dark:text-text-secondary-dark hover:text-red-500 transition-all text-sm font-bold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Listing Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="bg-surface-light dark:bg-surface-dark border-border-light/50 dark:border-border-dark sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
              Listing Details - {selectedListing?.id}
            </DialogTitle>
            <DialogDescription className="text-text-secondary-light dark:text-text-secondary-dark">
              Complete information about this listing
            </DialogDescription>
          </DialogHeader>
          {selectedListing && (
            <div className="space-y-6">
              <div className="flex items-center justify-center text-8xl py-6 bg-background-light dark:bg-background-dark rounded-xl">
                {selectedListing.image}
              </div>

              <div>
                <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-2">
                  {selectedListing.title}
                </h3>
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${statusColors[selectedListing.status]}`}>
                  {selectedListing.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase">
                    Price
                  </p>
                  <p className="text-lg font-bold text-primary">
                    LKR {selectedListing.price.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase">
                    Stock
                  </p>
                  <p className="text-lg font-bold text-text-main-light dark:text-text-main-dark">
                    {selectedListing.stock} units
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase">
                    Brand
                  </p>
                  <p className="text-sm font-bold text-text-main-light dark:text-text-main-dark">
                    {selectedListing.brand}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase">
                    Model
                  </p>
                  <p className="text-sm font-bold text-text-main-light dark:text-text-main-dark">
                    {selectedListing.model}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase">
                    Category
                  </p>
                  <p className="text-sm font-bold text-text-main-light dark:text-text-main-dark">
                    {selectedListing.category}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase">
                    Condition
                  </p>
                  <p className="text-sm font-bold text-text-main-light dark:text-text-main-dark">
                    {selectedListing.condition}
                  </p>
                </div>
              </div>

              <div className="border-t border-border-light dark:border-border-dark pt-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mb-1">
                      {selectedListing.views}
                    </p>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      Views
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mb-1">
                      {selectedListing.favorites}
                    </p>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      Favorites
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-text-main-light dark:text-text-main-dark mb-1">
                      {new Date(selectedListing.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      Created
                    </p>
                  </div>
                </div>
              </div>

              {selectedListing.status !== "sold" && (
                <div className="border-t border-border-light dark:border-border-dark pt-4">
                  <p className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase mb-3">
                    Quick Actions
                  </p>
                  <div className="flex gap-2">
                    {selectedListing.status === "active" && (
                      <button
                        onClick={() => {
                          updateListingStatus(selectedListing.id, "inactive");
                          closeDialog();
                        }}
                        className="flex-1 px-4 py-2 rounded-lg bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 transition-all text-sm font-bold"
                      >
                        Mark as Inactive
                      </button>
                    )}
                    {selectedListing.status === "inactive" && (
                      <button
                        onClick={() => {
                          updateListingStatus(selectedListing.id, "active");
                          closeDialog();
                        }}
                        className="flex-1 px-4 py-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-all text-sm font-bold"
                      >
                        Mark as Active
                      </button>
                    )}
                    <button
                      onClick={() => {
                        updateListingStatus(selectedListing.id, "sold");
                        closeDialog();
                      }}
                      className="flex-1 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-all text-sm font-bold"
                    >
                      Mark as Sold
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <button
              onClick={closeDialog}
              className="flex-1 px-4 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold shadow-lg shadow-primary/30 transition-all"
            >
              Close
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="bg-surface-light dark:bg-surface-dark border-border-light/50 dark:border-border-dark sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
              Delete Listing
            </DialogTitle>
            <DialogDescription className="text-text-secondary-light dark:text-text-secondary-dark">
              Are you sure you want to delete this listing? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedListing && (
            <div className="py-4">
              <div className="flex items-center gap-3 p-4 bg-background-light dark:bg-background-dark rounded-xl">
                <div className="text-4xl">{selectedListing.image}</div>
                <div className="flex-1">
                  <p className="font-bold text-text-main-light dark:text-text-main-dark">
                    {selectedListing.title}
                  </p>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    {selectedListing.id}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-3">
            <button
              onClick={closeDialog}
              className="flex-1 px-4 py-3 rounded-xl border border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-background-dark font-bold transition-all"
            >
              Cancel
            </button>
            <button
              onClick={deleteListing}
              className="flex-1 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold shadow-lg shadow-red-500/30 transition-all"
            >
              Delete
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

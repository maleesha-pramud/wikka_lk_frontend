"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/client/ui/dialog";

interface Review {
  id: number;
  customerName: string;
  productName: string;
  rating: number;
  comment: string;
  date: string;
  status: "pending" | "approved" | "rejected";
  productId: string;
  customerAvatar?: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      customerName: "Sarah Wilson",
      productName: "iPhone 13 Pro Max 128GB",
      rating: 5,
      comment: "Excellent product! The phone is in perfect condition and works flawlessly. Fast delivery and great communication from the seller.",
      date: "2024-03-15",
      status: "pending",
      productId: "PRD-001"
    },
    {
      id: 2,
      customerName: "Mike Johnson",
      productName: "Sony Camera A7III",
      rating: 4,
      comment: "Good camera, minor scratches on the body but doesn't affect functionality. Overall satisfied with the purchase.",
      date: "2024-03-14",
      status: "approved",
      productId: "PRD-002"
    },
    {
      id: 3,
      customerName: "Emma Davis",
      productName: "MacBook Pro 14\"",
      rating: 5,
      comment: "Amazing laptop! Exactly as described. The seller was very helpful and responsive. Highly recommend!",
      date: "2024-03-13",
      status: "approved",
      productId: "PRD-003"
    },
    {
      id: 4,
      customerName: "John Smith",
      productName: "Nike Air Jordan",
      rating: 3,
      comment: "Product is okay, but there were some issues with the sizing. Seller could have been more clear in the description.",
      date: "2024-03-12",
      status: "pending",
      productId: "PRD-004"
    },
    {
      id: 5,
      customerName: "Lisa Anderson",
      productName: "PS5 Controller",
      rating: 2,
      comment: "Not as described. Controller had issues with buttons sticking. Disappointed with this purchase.",
      date: "2024-03-11",
      status: "rejected",
      productId: "PRD-005"
    },
    {
      id: 6,
      customerName: "David Brown",
      productName: "Canon EOS R5",
      rating: 5,
      comment: "Perfect condition! The camera works beautifully. Great seller, very professional. Will buy again!",
      date: "2024-03-10",
      status: "approved",
      productId: "PRD-006"
    },
  ]);

  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [filterRating, setFilterRating] = useState<string>("");

  const statusColors = {
    pending: "bg-yellow-500/10 text-yellow-500",
    approved: "bg-green-500/10 text-green-500",
    rejected: "bg-red-500/10 text-red-500",
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch = 
      review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !filterStatus || review.status === filterStatus;
    const matchesRating = !filterRating || review.rating === parseInt(filterRating);
    return matchesSearch && matchesStatus && matchesRating;
  });

  const updateReviewStatus = (reviewId: number, newStatus: Review["status"]) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId ? { ...review, status: newStatus } : review
      )
    );
    toast.success(`Review ${newStatus === "approved" ? "approved" : "rejected"} successfully!`);
  };

  const deleteReview = (reviewId: number) => {
    setReviews(reviews.filter((review) => review.id !== reviewId));
    toast.success("Review deleted successfully!");
  };

  const viewReviewDetails = (review: Review) => {
    setSelectedReview(review);
    setShowDetailsDialog(true);
  };

  const closeDialog = () => {
    setShowDetailsDialog(false);
    setSelectedReview(null);
  };

  const getReviewStats = () => {
    const total = reviews.length;
    const pending = reviews.filter((r) => r.status === "pending").length;
    const approved = reviews.filter((r) => r.status === "approved").length;
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / total;
    
    return { total, pending, approved, avgRating: avgRating.toFixed(1) };
  };

  const stats = getReviewStats();

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "sm") => {
    const sizeClasses = {
      sm: "text-base",
      md: "text-xl",
      lg: "text-2xl"
    };
    
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`material-symbols-outlined ${sizeClasses[size]} ${
              star <= rating ? "text-yellow-500 filled-icon" : "text-gray-300 dark:text-gray-600"
            }`}
          >
            star
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-border-light/50 dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <div className="px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-text-main-light dark:text-text-main-dark tracking-tight">
                Reviews Management
              </h1>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
                Manage customer reviews and ratings for your products
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 shadow-card border border-border-light/50 dark:border-border-dark">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-lg">star</span>
              </div>
              <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
                {stats.total}
              </h3>
            </div>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">
              Total Reviews
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
              <div className="flex items-center justify-center size-8 rounded-lg bg-green-500/10 text-green-500">
                <span className="material-symbols-outlined text-lg">check_circle</span>
              </div>
              <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
                {stats.approved}
              </h3>
            </div>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">
              Approved
            </p>
          </div>

          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 shadow-card border border-border-light/50 dark:border-border-dark">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center justify-center size-8 rounded-lg bg-yellow-500/10 text-yellow-500">
                <span className="material-symbols-outlined text-lg filled-icon">star</span>
              </div>
              <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
                {stats.avgRating}
              </h3>
            </div>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">
              Avg Rating
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
                placeholder="Search by customer, product, or review..."
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
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="w-full rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-main-light dark:text-text-main-dark px-4 py-3.5 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm appearance-none cursor-pointer"
            >
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-card border border-border-light/50 dark:border-border-dark hover:shadow-hover transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                {/* Customer Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex items-center justify-center size-12 rounded-full bg-primary/10 text-primary font-bold flex-shrink-0">
                    {review.customerName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-bold text-text-main-light dark:text-text-main-dark">
                          {review.customerName}
                        </h3>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                          {review.productName}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[review.status]}`}>
                        {review.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-3">
                      {renderStars(review.rating)}
                      <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-sm text-text-main-light dark:text-text-main-dark leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col gap-2">
                  {review.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateReviewStatus(review.id, "approved")}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-all text-sm font-bold"
                      >
                        <span className="material-symbols-outlined text-base">check</span>
                        Approve
                      </button>
                      <button
                        onClick={() => updateReviewStatus(review.id, "rejected")}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all text-sm font-bold"
                      >
                        <span className="material-symbols-outlined text-base">close</span>
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => viewReviewDetails(review)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background-light dark:bg-background-dark hover:bg-primary/10 dark:hover:bg-primary/20 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-all text-sm font-bold"
                  >
                    <span className="material-symbols-outlined text-base">visibility</span>
                    View
                  </button>
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background-light dark:bg-background-dark hover:bg-red-500/10 text-text-secondary-light dark:text-text-secondary-dark hover:text-red-500 transition-all text-sm font-bold"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="bg-surface-light dark:bg-surface-dark border-border-light/50 dark:border-border-dark sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
              Review Details
            </DialogTitle>
            <DialogDescription className="text-text-secondary-light dark:text-text-secondary-dark">
              Complete information about this review
            </DialogDescription>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center size-16 rounded-full bg-primary/10 text-primary font-bold text-2xl">
                  {selectedReview.customerName.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-1">
                    {selectedReview.customerName}
                  </h3>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-2">
                    Reviewed on {new Date(selectedReview.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[selectedReview.status]}`}>
                    {selectedReview.status}
                  </span>
                </div>
              </div>

              <div className="border-t border-border-light dark:border-border-dark pt-4">
                <p className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase mb-2">
                  Product
                </p>
                <p className="text-sm font-bold text-text-main-light dark:text-text-main-dark">
                  {selectedReview.productName}
                </p>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
                  Product ID: {selectedReview.productId}
                </p>
              </div>

              <div className="border-t border-border-light dark:border-border-dark pt-4">
                <p className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase mb-3">
                  Rating
                </p>
                <div className="flex items-center gap-3">
                  {renderStars(selectedReview.rating, "lg")}
                  <span className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">
                    {selectedReview.rating}.0
                  </span>
                </div>
              </div>

              <div className="border-t border-border-light dark:border-border-dark pt-4">
                <p className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase mb-3">
                  Review Comment
                </p>
                <div className="bg-background-light dark:bg-background-dark rounded-xl p-4">
                  <p className="text-sm text-text-main-light dark:text-text-main-dark leading-relaxed">
                    {selectedReview.comment}
                  </p>
                </div>
              </div>

              {selectedReview.status === "pending" && (
                <div className="border-t border-border-light dark:border-border-dark pt-4 flex gap-3">
                  <button
                    onClick={() => {
                      updateReviewStatus(selectedReview.id, "approved");
                      closeDialog();
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold transition-all"
                  >
                    <span className="material-symbols-outlined">check</span>
                    Approve Review
                  </button>
                  <button
                    onClick={() => {
                      updateReviewStatus(selectedReview.id, "rejected");
                      closeDialog();
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition-all"
                  >
                    <span className="material-symbols-outlined">close</span>
                    Reject Review
                  </button>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <button
              onClick={closeDialog}
              className="flex-1 px-4 py-3 rounded-xl border border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-background-dark font-bold transition-all"
            >
              Close
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

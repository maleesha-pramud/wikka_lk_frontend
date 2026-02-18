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
  id: string;
  productName: string;
  productId: string;
  sellerName: string;
  rating: number;
  title: string;
  comment: string;
  reviewDate: string;
  helpful: number;
  verified: boolean;
  images?: string[];
}

interface PendingReview {
  id: string;
  orderId: string;
  productName: string;
  sellerName: string;
  purchaseDate: string;
}

export default function BuyerReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "REV-001",
      productName: "iPhone 13 Pro Max 128GB",
      productId: "PROD-001",
      sellerName: "TechStore Premium",
      rating: 5,
      title: "Excellent product and fast shipping!",
      comment: "The iPhone was exactly as described. Came in perfect condition with all original accessories. Seller was very responsive and shipping was super fast. Highly recommend!",
      reviewDate: "2024-03-15",
      helpful: 12,
      verified: true
    },
    {
      id: "REV-002",
      productName: "Sony Camera A7III",
      productId: "PROD-002",
      sellerName: "PhotoHub",
      rating: 4,
      title: "Great camera, minor scratches",
      comment: "Overall very happy with the purchase. Camera works perfectly and all functions are intact. There were a few minor scratches on the body that weren't mentioned in the description, but nothing major.",
      reviewDate: "2024-03-10",
      helpful: 8,
      verified: true
    },
    {
      id: "REV-003",
      productName: "Nike Air Jordan 1",
      productId: "PROD-003",
      sellerName: "Sneaker World",
      rating: 5,
      title: "Perfect condition, authentic!",
      comment: "Shoes are 100% authentic and in pristine condition. Packaging was excellent and delivery was quick. Would definitely buy from this seller again.",
      reviewDate: "2024-03-05",
      helpful: 15,
      verified: true
    },
  ]);

  const [pendingReviews, setPendingReviews] = useState<PendingReview[]>([
    {
      id: "PEND-001",
      orderId: "ORD-006",
      productName: "Samsung Galaxy Watch 5",
      sellerName: "TechGear",
      purchaseDate: "2024-03-18"
    },
    {
      id: "PEND-002",
      orderId: "ORD-007",
      productName: "Vintage Leather Bag",
      sellerName: "Fashion Hub",
      purchaseDate: "2024-03-17"
    },
  ]);

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showWriteDialog, setShowWriteDialog] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [selectedPending, setSelectedPending] = useState<PendingReview | null>(null);
  const [editRating, setEditRating] = useState(0);
  const [editTitle, setEditTitle] = useState("");
  const [editComment, setEditComment] = useState("");

  const [newRating, setNewRating] = useState(0);
  const [newTitle, setNewTitle] = useState("");
  const [newComment, setNewComment] = useState("");

  const handleEditReview = (review: Review) => {
    setSelectedReview(review);
    setEditRating(review.rating);
    setEditTitle(review.title);
    setEditComment(review.comment);
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    if (selectedReview) {
      setReviews(reviews.map(review =>
        review.id === selectedReview.id
          ? { ...review, rating: editRating, title: editTitle, comment: editComment }
          : review
      ));
      toast.success("Review updated successfully");
      setShowEditDialog(false);
    }
  };

  const handleDeleteReview = (id: string) => {
    setReviews(reviews.filter(review => review.id !== id));
    toast.success("Review deleted");
  };

  const handleWriteReview = (pending: PendingReview) => {
    setSelectedPending(pending);
    setNewRating(0);
    setNewTitle("");
    setNewComment("");
    setShowWriteDialog(true);
  };

  const handleSubmitReview = () => {
    if (selectedPending && newRating > 0 && newTitle && newComment) {
      const newReview: Review = {
        id: `REV-${Date.now()}`,
        productName: selectedPending.productName,
        productId: `PROD-${Date.now()}`,
        sellerName: selectedPending.sellerName,
        rating: newRating,
        title: newTitle,
        comment: newComment,
        reviewDate: new Date().toISOString().split('T')[0],
        helpful: 0,
        verified: true
      };
      
      setReviews([newReview, ...reviews]);
      setPendingReviews(pendingReviews.filter(p => p.id !== selectedPending.id));
      toast.success("Review submitted successfully");
      setShowWriteDialog(false);
    } else {
      toast.error("Please fill in all fields and select a rating");
    }
  };

  const renderStars = (rating: number, interactive: boolean = false, onChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onChange && onChange(star)}
            disabled={!interactive}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          >
            <span className={`material-symbols-outlined text-2xl ${
              star <= rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'
            }`}>
              {star <= rating ? 'star' : 'star_border'}
            </span>
          </button>
        ))}
      </div>
    );
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-border-light/50 dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <div className="px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-text-main-light dark:text-text-main-dark tracking-tight">
                My Reviews
              </h1>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
                {reviews.length} reviews written • Avg rating: {avgRating} ⭐
              </p>
            </div>
            
            {pendingReviews.length > 0 && (
              <div className="flex items-center gap-2 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 px-4 py-2 rounded-full">
                <span className="material-symbols-outlined">notification_important</span>
                <span className="font-semibold">{pendingReviews.length} pending reviews</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 lg:px-8 py-8">
        {/* Pending Reviews */}
        {pendingReviews.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-4">
              Pending Reviews
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingReviews.map((pending) => (
                <div
                  key={pending.id}
                  className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-card border border-border-light/50 dark:border-border-dark p-5"
                >
                  <div className="mb-4">
                    <h3 className="font-bold text-text-main-light dark:text-text-main-dark mb-1">
                      {pending.productName}
                    </h3>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      From {pending.sellerName}
                    </p>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
                      Purchased on {pending.purchaseDate}
                    </p>
                  </div>
                  <button
                    onClick={() => handleWriteReview(pending)}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-4 py-2 rounded-lg transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">rate_review</span>
                    Write Review
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submitted Reviews */}
        <div>
          <h2 className="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-4">
            My Submitted Reviews
          </h2>
          
          {reviews.length === 0 ? (
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-border-light/50 dark:border-border-dark p-12 text-center">
              <span className="material-symbols-outlined text-6xl text-text-secondary-light dark:text-text-secondary-dark mb-4">
                rate_review
              </span>
              <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-2">
                No reviews yet
              </h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark">
                Reviews you write will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-border-light/50 dark:border-border-dark p-6 hover:shadow-hover transition-all"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Review Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-1">
                            {review.productName}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-text-secondary-light dark:text-text-secondary-dark mb-2">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-base">store</span>
                              {review.sellerName}
                            </span>
                            {review.verified && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1 text-green-500">
                                  <span className="material-symbols-outlined text-base">verified</span>
                                  Verified Purchase
                                </span>
                              </>
                            )}
                          </div>
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      
                      <h4 className="font-semibold text-text-main-light dark:text-text-main-dark mb-2">
                        {review.title}
                      </h4>
                      <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
                        {review.comment}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        <span>{review.reviewDate}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">thumb_up</span>
                          {review.helpful} found helpful
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col gap-2">
                      <button
                        onClick={() => handleEditReview(review)}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-surface-light dark:bg-surface-dark border border-border-light/50 dark:border-border-dark hover:border-primary text-text-main-light dark:text-text-main-dark font-semibold px-4 py-2 rounded-lg transition-all text-sm"
                      >
                        <span className="material-symbols-outlined text-lg">edit</span>
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this review?")) {
                            handleDeleteReview(review.id);
                          }
                        }}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-surface-light dark:bg-surface-dark border border-border-light/50 dark:border-border-dark hover:border-red-500 hover:text-red-500 text-text-main-light dark:text-text-main-dark font-semibold px-4 py-2 rounded-lg transition-all text-sm"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Review Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Review</DialogTitle>
            <DialogDescription>
              Update your review for {selectedReview?.productName}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark mb-2">
                Rating
              </label>
              {renderStars(editRating, true, setEditRating)}
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark mb-2">
                Review Title
              </label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Summarize your experience"
                className="w-full px-4 py-3 rounded-xl border border-border-light/50 dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-main-light dark:text-text-main-dark focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark mb-2">
                Your Review
              </label>
              <textarea
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                placeholder="Share your thoughts about this product"
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-border-light/50 dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-main-light dark:text-text-main-dark focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
          </div>

          <DialogFooter>
            <button
              onClick={() => setShowEditDialog(false)}
              className="px-6 py-2 rounded-lg border border-border-light/50 dark:border-border-dark hover:bg-background-light dark:hover:bg-background-dark transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-2 rounded-lg transition-all"
            >
              Save Changes
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Write Review Dialog */}
      <Dialog open={showWriteDialog} onOpenChange={setShowWriteDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
            <DialogDescription>
              Share your experience with {selectedPending?.productName}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark mb-2">
                Rating *
              </label>
              {renderStars(newRating, true, setNewRating)}
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark mb-2">
                Review Title *
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Summarize your experience"
                className="w-full px-4 py-3 rounded-xl border border-border-light/50 dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-main-light dark:text-text-main-dark focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark mb-2">
                Your Review *
              </label>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts about this product"
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-border-light/50 dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-main-light dark:text-text-main-dark focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
          </div>

          <DialogFooter>
            <button
              onClick={() => setShowWriteDialog(false)}
              className="px-6 py-2 rounded-lg border border-border-light/50 dark:border-border-dark hover:bg-background-light dark:hover:bg-background-dark transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitReview}
              className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-2 rounded-lg transition-all"
            >
              Submit Review
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

"use client";

import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/client/ui/dialog";

interface Order {
  id: string;
  productName: string;
  sellerName: string;
  quantity: number;
  totalPrice: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  orderDate: string;
  shippingAddress: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export default function BuyerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      productName: "iPhone 13 Pro Max 128GB Sierra Blue",
      sellerName: "TechStore Premium",
      quantity: 1,
      totalPrice: 125000,
      status: "delivered",
      orderDate: "2024-03-15",
      shippingAddress: "123 Main St, Colombo 03",
      trackingNumber: "TRK123456789",
      estimatedDelivery: "2024-03-18"
    },
    {
      id: "ORD-002",
      productName: "Sony Camera A7III Full Kit",
      sellerName: "PhotoHub",
      quantity: 1,
      totalPrice: 245000,
      status: "shipped",
      orderDate: "2024-03-14",
      shippingAddress: "123 Main St, Colombo 03",
      trackingNumber: "TRK987654321",
      estimatedDelivery: "2024-03-19"
    },
    {
      id: "ORD-003",
      productName: "Nike Air Jordan 1 Red - Size 42",
      sellerName: "Sneaker World",
      quantity: 2,
      totalPrice: 37000,
      status: "processing",
      orderDate: "2024-03-13",
      shippingAddress: "123 Main St, Colombo 03",
      estimatedDelivery: "2024-03-20"
    },
    {
      id: "ORD-004",
      productName: "PS5 DualSense Controller White",
      sellerName: "GamerZone",
      quantity: 1,
      totalPrice: 12500,
      status: "pending",
      orderDate: "2024-03-12",
      shippingAddress: "123 Main St, Colombo 03",
      estimatedDelivery: "2024-03-21"
    },
    {
      id: "ORD-005",
      productName: "MacBook Pro 14\" M1 Pro 512GB",
      sellerName: "Apple Store",
      quantity: 1,
      totalPrice: 350000,
      status: "cancelled",
      orderDate: "2024-03-11",
      shippingAddress: "123 Main St, Colombo 03"
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("");

  const statusColors = {
    pending: "bg-yellow-500/10 text-yellow-500",
    processing: "bg-blue-500/10 text-blue-500",
    shipped: "bg-purple-500/10 text-purple-500",
    delivered: "bg-green-500/10 text-green-500",
    cancelled: "bg-red-500/10 text-red-500",
  };

  const statusIcons = {
    pending: "schedule",
    processing: "sync",
    shipped: "local_shipping",
    delivered: "check_circle",
    cancelled: "cancel",
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailsDialog(true);
  };

  const handleCancelOrder = (orderId: string) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: "cancelled" as const } : order
    ));
    toast.success("Order cancelled successfully");
    setShowDetailsDialog(false);
  };

  const handleTrackOrder = (order: Order) => {
    if (order.trackingNumber) {
      toast.info(`Tracking: ${order.trackingNumber}`);
    } else {
      toast.info("Tracking information not available yet");
    }
  };

  const handleReorder = (order: Order) => {
    toast.success(`Added "${order.productName}" to cart`);
  };

  const handleContactSeller = (order: Order) => {
    toast.info(`Opening chat with ${order.sellerName}`);
  };

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    processing: orders.filter(o => o.status === "processing").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-border-light/50 dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <div className="px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-text-main-light dark:text-text-main-dark tracking-tight">
                My Orders
              </h1>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
                Track and manage your purchases
              </p>
            </div>
            
            {/* Stats Summary */}
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">{orderStats.total}</p>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Total</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">{orderStats.delivered}</p>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Delivered</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-500">{orderStats.shipped}</p>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Shipped</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark">
              search
            </span>
            <input
              type="text"
              placeholder="Search orders by product, seller, or order ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-light/50 dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-main-light dark:text-text-main-dark focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 rounded-xl border border-border-light/50 dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-main-light dark:text-text-main-dark focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-border-light/50 dark:border-border-dark p-12 text-center">
            <span className="material-symbols-outlined text-6xl text-text-secondary-light dark:text-text-secondary-dark mb-4">
              shopping_bag
            </span>
            <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-2">
              No orders found
            </h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
              {searchQuery || filterStatus ? "Try adjusting your filters" : "Start shopping to see your orders here"}
            </p>
            <Link href="/" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold px-6 py-3 rounded-full transition-all">
              <span className="material-symbols-outlined">search</span>
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-border-light/50 dark:border-border-dark overflow-hidden hover:shadow-hover transition-all"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-1">
                            {order.productName}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-base">store</span>
                              {order.sellerName}
                            </span>
                            <span>•</span>
                            <span>Order #{order.id}</span>
                          </div>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold capitalize ${statusColors[order.status]}`}>
                          <span className="material-symbols-outlined text-sm">{statusIcons[order.status]}</span>
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-1">Order Date</p>
                          <p className="font-semibold text-text-main-light dark:text-text-main-dark">{order.orderDate}</p>
                        </div>
                        <div>
                          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-1">Quantity</p>
                          <p className="font-semibold text-text-main-light dark:text-text-main-dark">{order.quantity}</p>
                        </div>
                        <div>
                          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-1">Total Price</p>
                          <p className="font-semibold text-primary">LKR {order.totalPrice.toLocaleString()}</p>
                        </div>
                        {order.estimatedDelivery && (
                          <div>
                            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-1">Est. Delivery</p>
                            <p className="font-semibold text-text-main-light dark:text-text-main-dark">{order.estimatedDelivery}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col gap-2">
                      <button
                        onClick={() => handleViewDetails(order)}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-4 py-2 rounded-lg transition-all text-sm"
                      >
                        <span className="material-symbols-outlined text-lg">visibility</span>
                        Details
                      </button>
                      {order.trackingNumber && order.status !== "delivered" && order.status !== "cancelled" && (
                        <button
                          onClick={() => handleTrackOrder(order)}
                          className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-surface-light dark:bg-surface-dark border border-border-light/50 dark:border-border-dark hover:border-primary text-text-main-light dark:text-text-main-dark font-semibold px-4 py-2 rounded-lg transition-all text-sm"
                        >
                          <span className="material-symbols-outlined text-lg">local_shipping</span>
                          Track
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Order #{selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Product Info */}
              <div>
                <h4 className="font-bold text-text-main-light dark:text-text-main-dark mb-3">Product Information</h4>
                <div className="bg-background-light dark:bg-background-dark rounded-xl p-4">
                  <p className="font-semibold text-text-main-light dark:text-text-main-dark mb-2">{selectedOrder.productName}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-text-secondary-light dark:text-text-secondary-dark">Seller</p>
                      <p className="font-semibold text-text-main-light dark:text-text-main-dark">{selectedOrder.sellerName}</p>
                    </div>
                    <div>
                      <p className="text-text-secondary-light dark:text-text-secondary-dark">Quantity</p>
                      <p className="font-semibold text-text-main-light dark:text-text-main-dark">{selectedOrder.quantity}</p>
                    </div>
                    <div>
                      <p className="text-text-secondary-light dark:text-text-secondary-dark">Total Price</p>
                      <p className="font-semibold text-primary">LKR {selectedOrder.totalPrice.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-text-secondary-light dark:text-text-secondary-dark">Status</p>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold capitalize ${statusColors[selectedOrder.status]}`}>
                        {selectedOrder.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div>
                <h4 className="font-bold text-text-main-light dark:text-text-main-dark mb-3">Shipping Information</h4>
                <div className="bg-background-light dark:bg-background-dark rounded-xl p-4 space-y-3">
                  <div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Delivery Address</p>
                    <p className="font-semibold text-text-main-light dark:text-text-main-dark">{selectedOrder.shippingAddress}</p>
                  </div>
                  {selectedOrder.trackingNumber && (
                    <div>
                      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Tracking Number</p>
                      <p className="font-semibold text-text-main-light dark:text-text-main-dark">{selectedOrder.trackingNumber}</p>
                    </div>
                  )}
                  {selectedOrder.estimatedDelivery && (
                    <div>
                      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Estimated Delivery</p>
                      <p className="font-semibold text-text-main-light dark:text-text-main-dark">{selectedOrder.estimatedDelivery}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <button
                  onClick={() => handleContactSeller(selectedOrder)}
                  className="flex items-center justify-center gap-2 bg-surface-light dark:bg-surface-dark border border-border-light/50 dark:border-border-dark hover:border-primary text-text-main-light dark:text-text-main-dark font-semibold px-4 py-2 rounded-lg transition-all"
                >
                  <span className="material-symbols-outlined text-lg">chat</span>
                  Contact Seller
                </button>
                {selectedOrder.status === "delivered" && (
                  <button
                    onClick={() => handleReorder(selectedOrder)}
                    className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-4 py-2 rounded-lg transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">refresh</span>
                    Reorder
                  </button>
                )}
                {(selectedOrder.status === "pending" || selectedOrder.status === "processing") && (
                  <button
                    onClick={() => handleCancelOrder(selectedOrder.id)}
                    className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">cancel</span>
                    Cancel Order
                  </button>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

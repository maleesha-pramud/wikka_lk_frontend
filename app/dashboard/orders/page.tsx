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

interface Order {
  id: string;
  customerName: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  orderDate: string;
  shippingAddress: string;
  contactNumber: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      customerName: "John Doe",
      productName: "iPhone 13 Pro Max 128GB",
      quantity: 1,
      totalPrice: 125000,
      status: "pending",
      orderDate: "2024-03-15",
      shippingAddress: "123 Main St, Colombo 03",
      contactNumber: "+94 712 345 678"
    },
    {
      id: "ORD-002",
      customerName: "Sarah Wilson",
      productName: "Sony Camera A7III",
      quantity: 1,
      totalPrice: 245000,
      status: "processing",
      orderDate: "2024-03-14",
      shippingAddress: "456 Park Ave, Kandy",
      contactNumber: "+94 771 234 567"
    },
    {
      id: "ORD-003",
      customerName: "Mike Johnson",
      productName: "MacBook Pro 14\"",
      quantity: 1,
      totalPrice: 350000,
      status: "shipped",
      orderDate: "2024-03-13",
      shippingAddress: "789 Beach Rd, Galle",
      contactNumber: "+94 766 123 456"
    },
    {
      id: "ORD-004",
      customerName: "Emma Davis",
      productName: "Nike Air Jordan",
      quantity: 2,
      totalPrice: 37000,
      status: "delivered",
      orderDate: "2024-03-12",
      shippingAddress: "321 Hill St, Negombo",
      contactNumber: "+94 755 987 654"
    },
    {
      id: "ORD-005",
      customerName: "David Brown",
      productName: "PS5 Controller",
      quantity: 1,
      totalPrice: 12500,
      status: "cancelled",
      orderDate: "2024-03-11",
      shippingAddress: "654 Lake Rd, Kurunegala",
      contactNumber: "+94 778 456 123"
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
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !filterStatus || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailsDialog(true);
  };

  const closeDialog = () => {
    setShowDetailsDialog(false);
    setSelectedOrder(null);
  };

  const getStatusStats = () => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      processing: orders.filter((o) => o.status === "processing").length,
      shipped: orders.filter((o) => o.status === "shipped").length,
      delivered: orders.filter((o) => o.status === "delivered").length,
    };
  };

  const stats = getStatusStats();

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-border-light/50 dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <div className="px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-text-main-light dark:text-text-main-dark tracking-tight">
                Order Management
              </h1>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
                Track and manage all customer orders
              </p>
            </div>
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
                <span className="material-symbols-outlined text-lg">shopping_bag</span>
              </div>
              <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
                {stats.total}
              </h3>
            </div>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">
              Total Orders
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
                <span className="material-symbols-outlined text-lg">sync</span>
              </div>
              <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
                {stats.processing}
              </h3>
            </div>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">
              Processing
            </p>
          </div>

          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 shadow-card border border-border-light/50 dark:border-border-dark">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center justify-center size-8 rounded-lg bg-purple-500/10 text-purple-500">
                <span className="material-symbols-outlined text-lg">local_shipping</span>
              </div>
              <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
                {stats.shipped}
              </h3>
            </div>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">
              Shipped
            </p>
          </div>

          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 shadow-card border border-border-light/50 dark:border-border-dark">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center justify-center size-8 rounded-lg bg-green-500/10 text-green-500">
                <span className="material-symbols-outlined text-lg">check_circle</span>
              </div>
              <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
                {stats.delivered}
              </h3>
            </div>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">
              Delivered
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="lg:col-span-2">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">
                search
              </span>
              <input
                type="text"
                placeholder="Search by order ID, customer, or product..."
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
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-border-light/50 dark:border-border-dark overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background-light dark:bg-background-dark border-b border-border-light dark:border-border-dark">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light dark:divide-border-dark">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-background-light dark:hover:bg-background-dark transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-bold text-primary">{order.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary font-bold">
                          {order.customerName.charAt(0)}
                        </div>
                        <span className="font-medium text-text-main-light dark:text-text-main-dark">
                          {order.customerName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-sm font-medium text-text-main-light dark:text-text-main-dark truncate">
                          {order.productName}
                        </p>
                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                          Qty: {order.quantity}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-bold text-text-main-light dark:text-text-main-dark">
                        LKR {order.totalPrice.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative group">
                        <button className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 ${statusColors[order.status]}`}>
                          <span className="material-symbols-outlined text-sm">{statusIcons[order.status]}</span>
                          {order.status}
                        </button>
                        {order.status !== "delivered" && order.status !== "cancelled" && (
                          <div className="absolute left-0 top-full mt-2 hidden group-hover:block z-10">
                            <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl shadow-lg p-2 min-w-30">
                              {["pending", "processing", "shipped", "delivered", "cancelled"].map((status) => (
                                <button
                                  key={status}
                                  onClick={() => updateOrderStatus(order.id, status as Order["status"])}
                                  className="w-full px-3 py-2 text-left text-xs font-bold rounded-lg hover:bg-background-light dark:hover:bg-background-dark text-text-main-light dark:text-text-main-dark transition-colors capitalize"
                                >
                                  {status}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => viewOrderDetails(order)}
                        className="p-2 rounded-lg hover:bg-background-light dark:hover:bg-background-dark text-text-secondary-light hover:text-primary transition-colors"
                        title="View details"
                      >
                        <span className="material-symbols-outlined text-xl">visibility</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="bg-surface-light dark:bg-surface-dark border-border-light/50 dark:border-border-dark sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
              Order Details - {selectedOrder?.id}
            </DialogTitle>
            <DialogDescription className="text-text-secondary-light dark:text-text-secondary-dark">
              Complete information about this order
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase">
                    Customer Name
                  </p>
                  <p className="text-sm font-bold text-text-main-light dark:text-text-main-dark">
                    {selectedOrder.customerName}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase">
                    Contact Number
                  </p>
                  <p className="text-sm font-bold text-text-main-light dark:text-text-main-dark">
                    {selectedOrder.contactNumber}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase">
                  Shipping Address
                </p>
                <p className="text-sm font-bold text-text-main-light dark:text-text-main-dark">
                  {selectedOrder.shippingAddress}
                </p>
              </div>

              <div className="border-t border-border-light dark:border-border-dark pt-4">
                <h4 className="text-sm font-bold text-text-main-light dark:text-text-main-dark mb-3">
                  Order Items
                </h4>
                <div className="bg-background-light dark:bg-background-dark rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-text-main-light dark:text-text-main-dark">
                        {selectedOrder.productName}
                      </p>
                      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        Quantity: {selectedOrder.quantity}
                      </p>
                    </div>
                    <p className="font-bold text-primary">
                      LKR {selectedOrder.totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border-light dark:border-border-dark pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-text-main-light dark:text-text-main-dark">
                    Total Amount
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    LKR {selectedOrder.totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
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
    </div>
  );
}

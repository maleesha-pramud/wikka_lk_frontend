"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/client/ui/button";
import { Input } from "@/components/client/ui/input";
import { ShippingAddress, PaymentMethod } from "@/lib/types/cart";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { items, getCartSummary, clearCart } = useCart();
  const router = useRouter();
  const summary = getCartSummary();

  const [step, setStep] = useState<"shipping" | "payment" | "review">("shipping");
  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    country: "Sri Lanka",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: "cash_on_delivery",
  });

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 py-20">
          <span className="material-symbols-outlined text-[120px] text-gray-300 dark:text-gray-600">
            shopping_bag
          </span>
          <h2 className="text-2xl font-bold text-text-main dark:text-white">
            No items to checkout
          </h2>
          <p className="text-center text-text-secondary dark:text-gray-400">
            Your cart is empty. Add some items before checking out.
          </p>
          <Button onClick={() => router.push("/")} className="mt-4">
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("review");
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Here you would typically send the order to your backend
    console.log("Order placed:", {
      items,
      shippingAddress,
      paymentMethod,
      summary,
    });

    toast.success("Order placed successfully!");
    clearCart();
    setIsProcessing(false);
    router.push("/buyer/orders");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-text-main dark:text-white">
        Checkout
      </h1>

      {/* Progress Steps */}
      <div className="mb-8 flex items-center justify-center gap-4">
        <Step
          number={1}
          label="Shipping"
          isActive={step === "shipping"}
          isCompleted={step === "payment" || step === "review"}
        />
        <div className={`h-0.5 w-20 ${step !== "shipping" ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"}`} />
        <Step
          number={2}
          label="Payment"
          isActive={step === "payment"}
          isCompleted={step === "review"}
        />
        <div className={`h-0.5 w-20 ${step === "review" ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"}`} />
        <Step number={3} label="Review" isActive={step === "review"} isCompleted={false} />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Shipping Form */}
          {step === "shipping" && (
            <div className="rounded-2xl bg-white p-6 shadow-soft dark:bg-surface-dark">
              <h2 className="mb-6 text-xl font-bold text-text-main dark:text-white">
                Shipping Address
              </h2>
              <form onSubmit={handleShippingSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-text-main dark:text-white">
                      Full Name *
                    </label>
                    <Input
                      required
                      value={shippingAddress.fullName}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, fullName: e.target.value })
                      }
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-text-main dark:text-white">
                      Phone Number *
                    </label>
                    <Input
                      required
                      type="tel"
                      value={shippingAddress.phone}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, phone: e.target.value })
                      }
                      placeholder="+94 77 123 4567"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-text-main dark:text-white">
                      Address Line 1 *
                    </label>
                    <Input
                      required
                      value={shippingAddress.addressLine1}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })
                      }
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-text-main dark:text-white">
                      Address Line 2
                    </label>
                    <Input
                      value={shippingAddress.addressLine2}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, addressLine2: e.target.value })
                      }
                      placeholder="Apartment, suite, etc."
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-main dark:text-white">
                      City *
                    </label>
                    <Input
                      required
                      value={shippingAddress.city}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, city: e.target.value })
                      }
                      placeholder="Colombo"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-main dark:text-white">
                      Postal Code *
                    </label>
                    <Input
                      required
                      value={shippingAddress.postalCode}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
                      }
                      placeholder="00100"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Continue to Payment
                </Button>
              </form>
            </div>
          )}

          {/* Payment Form */}
          {step === "payment" && (
            <div className="rounded-2xl bg-white p-6 shadow-soft dark:bg-surface-dark">
              <h2 className="mb-6 text-xl font-bold text-text-main dark:text-white">
                Payment Method
              </h2>
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                {/* Payment Type Selection */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 cursor-pointer hover:border-primary dark:border-gray-700">
                    <input
                      type="radio"
                      name="paymentType"
                      value="cash_on_delivery"
                      checked={paymentMethod.type === "cash_on_delivery"}
                      onChange={(e) =>
                        setPaymentMethod({ type: e.target.value as PaymentMethod["type"] })
                      }
                      className="h-4 w-4 text-primary"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-text-main dark:text-white">
                        Cash on Delivery
                      </p>
                      <p className="text-sm text-text-secondary dark:text-gray-400">
                        Pay when you receive your order
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-primary">
                      payments
                    </span>
                  </label>

                  <label className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 cursor-pointer hover:border-primary dark:border-gray-700">
                    <input
                      type="radio"
                      name="paymentType"
                      value="card"
                      checked={paymentMethod.type === "card"}
                      onChange={(e) =>
                        setPaymentMethod({ type: e.target.value as PaymentMethod["type"] })
                      }
                      className="h-4 w-4 text-primary"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-text-main dark:text-white">
                        Credit/Debit Card
                      </p>
                      <p className="text-sm text-text-secondary dark:text-gray-400">
                        Pay securely with your card
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-primary">
                      credit_card
                    </span>
                  </label>

                  <label className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 cursor-pointer hover:border-primary dark:border-gray-700">
                    <input
                      type="radio"
                      name="paymentType"
                      value="bank_transfer"
                      checked={paymentMethod.type === "bank_transfer"}
                      onChange={(e) =>
                        setPaymentMethod({ type: e.target.value as PaymentMethod["type"] })
                      }
                      className="h-4 w-4 text-primary"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-text-main dark:text-white">
                        Bank Transfer
                      </p>
                      <p className="text-sm text-text-secondary dark:text-gray-400">
                        Transfer directly to our bank account
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-primary">
                      account_balance
                    </span>
                  </label>
                </div>

                {/* Card Details Form (only shown when card is selected) */}
                {paymentMethod.type === "card" && (
                  <div className="mt-4 space-y-4 rounded-xl border border-gray-200 p-4 dark:border-gray-700">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-text-main dark:text-white">
                        Card Holder Name *
                      </label>
                      <Input
                        required
                        value={paymentMethod.cardHolderName || ""}
                        onChange={(e) =>
                          setPaymentMethod({ ...paymentMethod, cardHolderName: e.target.value })
                        }
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-text-main dark:text-white">
                        Card Number *
                      </label>
                      <Input
                        required
                        value={paymentMethod.cardNumber || ""}
                        onChange={(e) =>
                          setPaymentMethod({ ...paymentMethod, cardNumber: e.target.value })
                        }
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-text-main dark:text-white">
                          Expiry Date *
                        </label>
                        <Input
                          required
                          value={paymentMethod.expiryDate || ""}
                          onChange={(e) =>
                            setPaymentMethod({ ...paymentMethod, expiryDate: e.target.value })
                          }
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-text-main dark:text-white">
                          CVV *
                        </label>
                        <Input
                          required
                          value={paymentMethod.cvv || ""}
                          onChange={(e) =>
                            setPaymentMethod({ ...paymentMethod, cvv: e.target.value })
                          }
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep("shipping")}
                  >
                    Back
                  </Button>
                  <Button type="submit" className="flex-1" size="lg">
                    Review Order
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Order Review */}
          {step === "review" && (
            <div className="space-y-6">
              {/* Shipping Address Review */}
              <div className="rounded-2xl bg-white p-6 shadow-soft dark:bg-surface-dark">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="mb-4 text-xl font-bold text-text-main dark:text-white">
                      Shipping Address
                    </h2>
                    <div className="space-y-1 text-text-secondary dark:text-gray-400">
                      <p className="font-semibold text-text-main dark:text-white">
                        {shippingAddress.fullName}
                      </p>
                      <p>{shippingAddress.phone}</p>
                      <p>{shippingAddress.addressLine1}</p>
                      {shippingAddress.addressLine2 && <p>{shippingAddress.addressLine2}</p>}
                      <p>
                        {shippingAddress.city}, {shippingAddress.postalCode}
                      </p>
                      <p>{shippingAddress.country}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setStep("shipping")}
                  >
                    Edit
                  </Button>
                </div>
              </div>

              {/* Payment Method Review */}
              <div className="rounded-2xl bg-white p-6 shadow-soft dark:bg-surface-dark">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="mb-4 text-xl font-bold text-text-main dark:text-white">
                      Payment Method
                    </h2>
                    <p className="text-text-secondary dark:text-gray-400">
                      {paymentMethod.type === "cash_on_delivery" && "Cash on Delivery"}
                      {paymentMethod.type === "card" && `Card ending in ${paymentMethod.cardNumber?.slice(-4)}`}
                      {paymentMethod.type === "bank_transfer" && "Bank Transfer"}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setStep("payment")}
                  >
                    Edit
                  </Button>
                </div>
              </div>

              {/* Order Items */}
              <div className="rounded-2xl bg-white p-6 shadow-soft dark:bg-surface-dark">
                <h2 className="mb-4 text-xl font-bold text-text-main dark:text-white">
                  Order Items ({summary.itemCount})
                </h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-text-main dark:text-white line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-text-secondary dark:text-gray-400">
                          Quantity: {item.quantity}
                        </p>
                        <p className="mt-1 font-semibold text-text-main dark:text-white">
                          LKR {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">
                      check_circle
                    </span>
                    Place Order
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 rounded-2xl bg-white p-6 shadow-soft dark:bg-surface-dark">
            <h2 className="mb-4 text-xl font-bold text-text-main dark:text-white">
              Order Summary
            </h2>

            <div className="space-y-3 border-b border-gray-200 pb-4 dark:border-gray-700">
              <div className="flex justify-between text-text-secondary dark:text-gray-400">
                <span>Subtotal ({summary.itemCount} items)</span>
                <span className="font-semibold">
                  LKR {summary.subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-text-secondary dark:text-gray-400">
                <span>Shipping</span>
                <span className="font-semibold">
                  LKR {summary.shipping.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-4 flex justify-between text-lg">
              <span className="font-bold text-text-main dark:text-white">Total</span>
              <span className="font-bold text-primary">
                LKR {summary.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({
  number,
  label,
  isActive,
  isCompleted,
}: {
  number: number;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex size-10 items-center justify-center rounded-full font-bold ${
          isCompleted
            ? "bg-primary text-white"
            : isActive
            ? "bg-primary text-white"
            : "bg-gray-300 text-gray-600 dark:bg-gray-600 dark:text-gray-400"
        }`}
      >
        {isCompleted ? (
          <span className="material-symbols-outlined text-[20px]">check</span>
        ) : (
          number
        )}
      </div>
      <span
        className={`mt-2 text-sm font-medium ${
          isActive || isCompleted
            ? "text-text-main dark:text-white"
            : "text-text-secondary dark:text-gray-400"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

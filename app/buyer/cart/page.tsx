"use client";

import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/client/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getCartSummary } = useCart();
  const router = useRouter();
  const summary = getCartSummary();

  const handleCheckout = () => {
    router.push("/buyer/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 py-20">
          <span className="material-symbols-outlined text-[120px] text-gray-300 dark:text-gray-600">
            shopping_cart
          </span>
          <h2 className="text-2xl font-bold text-text-main dark:text-white">
            Your cart is empty
          </h2>
          <p className="text-center text-text-secondary dark:text-gray-400">
            Looks like you haven&apos;t added anything to your cart yet
          </p>
          <Button onClick={() => router.push("/")} className="mt-4">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-text-main dark:text-white">
        Shopping Cart ({summary.itemCount} {summary.itemCount === 1 ? "item" : "items"})
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-2xl bg-white p-4 shadow-soft dark:bg-surface-dark"
            >
              {/* Product Image */}
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-main dark:text-white line-clamp-2">
                      {item.title}
                    </h3>
                    {item.condition && (
                      <span className="mt-1 inline-block rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-text-secondary dark:bg-gray-700 dark:text-gray-300">
                        {item.condition}
                      </span>
                    )}
                    <div className="mt-1 flex items-center gap-1 text-xs text-text-secondary dark:text-gray-400">
                      <span className="material-symbols-outlined text-[14px]">
                        location_on
                      </span>
                      <span>{item.location}</span>
                    </div>
                    <p className="mt-1 text-xs text-text-secondary dark:text-gray-400">
                      Sold by: {item.sellerName}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-text-main dark:text-white">
                      LKR {(item.price * item.quantity).toLocaleString()}
                    </p>
                    <p className="text-xs text-text-secondary dark:text-gray-400">
                      LKR {item.price.toLocaleString()} each
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon-sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        remove
                      </span>
                    </Button>
                    <span className="w-12 text-center font-semibold text-text-main dark:text-white">
                      {item.quantity}
                    </span>
                    <Button
                      size="icon-sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        add
                      </span>
                    </Button>
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeFromCart(item.productId)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      delete
                    </span>
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 rounded-2xl bg-white p-6 shadow-soft dark:bg-surface-dark">
            <h2 className="mb-4 text-xl font-bold text-text-main dark:text-white">
              Order Summary
            </h2>

            <div className="space-y-3 border-b border-gray-200 pb-4 dark:border-gray-700">
              <div className="flex justify-between text-text-secondary dark:text-gray-400">
                <span>Subtotal</span>
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

            <Button
              className="mt-6 w-full"
              size="lg"
              onClick={handleCheckout}
            >
              <span className="material-symbols-outlined text-[20px]">
                shopping_bag
              </span>
              Proceed to Checkout
            </Button>

            <Button
              variant="outline"
              className="mt-3 w-full"
              onClick={() => router.push("/")}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

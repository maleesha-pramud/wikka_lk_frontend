"use client";

import React, { createContext, useContext, useState, useEffect, useRef, startTransition } from "react";
import { CartItem, CartSummary } from "@/lib/types/cart";
import Cookies from "js-cookie";

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartSummary: () => CartSummary;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_COOKIE_KEY = "wikka_cart";
const SHIPPING_COST = 500; // Fixed shipping cost in LKR

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const isInitializedRef = useRef(false);

  // Load cart from cookies on mount
  useEffect(() => {
    if (!isInitializedRef.current) {
      const savedCart = Cookies.get(CART_COOKIE_KEY);
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          startTransition(() => {
            setItems(parsedCart);
          });
        } catch (error) {
          console.error("Error loading cart:", error);
        }
      }
      isInitializedRef.current = true;
    }
  }, []);

  // Save cart to cookies whenever it changes
  useEffect(() => {
    if (isInitializedRef.current) {
      Cookies.set(CART_COOKIE_KEY, JSON.stringify(items), { expires: 7 });
    }
  }, [items]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.productId === item.productId);
      
      if (existingItem) {
        return prevItems.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((i) => i.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems((prevItems) =>
      prevItems.map((i) =>
        i.productId === productId ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartSummary = (): CartSummary => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = items.length > 0 ? SHIPPING_COST : 0;
    const total = subtotal + shipping;
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      subtotal,
      shipping,
      total,
      itemCount,
    };
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartSummary,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

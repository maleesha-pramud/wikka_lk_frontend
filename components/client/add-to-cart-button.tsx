"use client";

import { Button } from "@/components/client/ui/button";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";

interface AddToCartButtonProps {
  productId: string;
  title: string;
  price: number;
  image: string;
  condition?: string;
  location: string;
  sellerId: string;
  sellerName: string;
  className?: string;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline";
}

export function AddToCartButton({
  productId,
  title,
  price,
  image,
  condition,
  location,
  sellerId,
  sellerName,
  className,
  size = "default",
  variant = "default",
}: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    addToCart({
      id: `${productId}-${Date.now()}`,
      productId,
      title,
      price,
      image,
      condition,
      location,
      sellerId,
      sellerName,
    });

    toast.success("Added to cart!");
  };

  return (
    <Button
      onClick={handleAddToCart}
      className={className}
      size={size}
      variant={variant}
    >
      <span className="material-symbols-outlined text-[20px]">
        shopping_cart
      </span>
      Add to Cart
    </Button>
  );
}

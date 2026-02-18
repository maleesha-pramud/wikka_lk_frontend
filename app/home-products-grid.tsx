"use client";

import { useState } from "react";
import { ProductCard } from "@/components/client/ProductCard";
import staticData from "@/lib/static-data.json";

const mockProducts = staticData.mockProducts;

export function HomeProductsGrid() {
  const [products, setProducts] = useState(mockProducts);

  const handleFavoriteToggle = (id: string) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );
  };

  const handleProductClick = (id: string) => {
    console.log("Product clicked:", id);
    // Navigate to product detail page
  };

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 xl:grid-cols-4">
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
          alt={product.alt}
          isFavorite={product.isFavorite}
          onFavoriteToggle={handleFavoriteToggle}
          onClick={handleProductClick}
        />
      ))}
    </div>
  );
}

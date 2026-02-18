"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import staticData from "@/lib/static-data.json";
import { AddToCartButton } from "@/components/client/add-to-cart-button";

interface ProductDetailsClientProps {
  productId: string;
}

export function ProductDetailsClient({ productId }: ProductDetailsClientProps) {
  const product = staticData.mockProducts.find((p) => p.id === productId);
  const [isFavorite, setIsFavorite] = useState(product?.isFavorite || false);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text-main dark:text-white mb-4">
            Product Not Found
          </h1>
          <p className="text-text-secondary dark:text-gray-400">
            The product you&rsquo;re looking for doesn&rsquo;t exist.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-full bg-primary px-8 py-3 font-bold text-white transition-colors hover:bg-primary-hover"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    console.log("Toggle favorite:", productId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  // Mock related images (in real app, product would have multiple images)
  const productImages = [product.image, product.image, product.image];

  return (
    <main className="mx-auto w-full max-w-350 px-6 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-text-secondary dark:text-gray-400">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <Link href="/search" className="hover:text-primary transition-colors">{product.category}</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-text-main dark:text-white font-medium">{product.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Column - Images */}
        <div className="flex flex-col gap-4">
          {/* Main Image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-surface-dark">
            <Image
              fill
              src={productImages[selectedImage]}
              alt={product.alt}
              className="object-cover"
              unoptimized
            />
            <button
              onClick={handleFavoriteToggle}
              className="absolute right-4 top-4 flex size-12 items-center justify-center rounded-full bg-white text-gray-400 shadow-lg transition-colors hover:text-red-500 dark:bg-background-dark/90 dark:text-gray-200"
            >
              <span className={`material-symbols-outlined text-[28px] ${isFavorite ? 'text-red-500' : ''}`}>
                {isFavorite ? 'favorite' : 'favorite'}
              </span>
            </button>
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-3 gap-4">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square overflow-hidden rounded-xl ${
                  selectedImage === index
                    ? 'ring-2 ring-primary'
                    : 'ring-1 ring-gray-200 dark:ring-gray-700'
                }`}
              >
                <Image
                  fill
                  src={img}
                  alt={`${product.title} - Image ${index + 1}`}
                  className="object-cover"
                  unoptimized
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="flex flex-col gap-6">
          {/* Title and Price */}
          <div>
            <h1 className="text-3xl font-extrabold text-text-main dark:text-white mb-4">
              {product.title}
            </h1>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-extrabold text-primary">LKR {product.price}</span>
              {product.condition && (
                <span className="rounded-lg bg-primary/10 px-3 py-1 text-sm font-bold text-primary uppercase tracking-wide">
                  {product.condition}
                </span>
              )}
            </div>
          </div>

          {/* Location and Views */}
          <div className="flex items-center gap-6 text-text-secondary dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">location_on</span>
              <span className="font-medium">{product.location} · {product.distance}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">visibility</span>
              <span className="font-medium">{product.views} views</span>
            </div>
          </div>

          {/* Seller Info */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-surface-dark">
            <h3 className="text-lg font-bold text-text-main dark:text-white mb-4">Seller Information</h3>
            <div className="flex items-start gap-4">
              <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-[28px]">person</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-text-main dark:text-white">{product.seller.name}</span>
                  {product.seller.verified && (
                    <span className="material-symbols-outlined text-[18px] text-primary" title="Verified Seller">
                      verified
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-2 text-sm text-text-secondary dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-yellow-500">star</span>
                    <span className="font-semibold">{product.seller.rating}</span>
                  </div>
                  <span>·</span>
                  <span>{product.seller.reviews} reviews</span>
                  <span>·</span>
                  <span>Joined {new Date(product.seller.memberSince).getFullYear()}</span>
                </div>
                <div className="mt-4 flex gap-3">
                  <button className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-bold text-white transition-colors hover:bg-primary-hover">
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                    Message
                  </button>
                  <button className="flex h-11 items-center justify-center rounded-xl border-2 border-gray-200 bg-white px-4 text-text-main transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-gray-700 dark:bg-surface-dark dark:text-white">
                    <span className="material-symbols-outlined text-[20px]">person</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <AddToCartButton
                productId={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
                condition={product.condition}
                location={product.location}
                sellerId="seller-1"
                sellerName={product.seller.name}
                className="flex h-14 flex-1 items-center justify-center gap-2 rounded-xl text-lg font-bold shadow-lg shadow-primary/20"
                size="lg"
              />
              <button 
                onClick={handleFavoriteToggle}
                className={`flex h-14 items-center justify-center rounded-xl border-2 px-6 transition-all ${
                  isFavorite 
                    ? 'border-red-500 bg-red-50 text-red-500 dark:bg-red-500/10' 
                    : 'border-gray-200 bg-white text-text-main hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-gray-700 dark:bg-surface-dark dark:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[24px]">
                  {isFavorite ? 'favorite' : 'favorite_border'}
                </span>
              </button>
            </div>
            <div className="flex gap-3">
              <button className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-6 font-semibold text-text-main transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-gray-700 dark:bg-surface-dark dark:text-white">
                <span className="material-symbols-outlined text-[20px]">call</span>
                Call Seller
              </button>
              <button className="flex h-12 items-center justify-center rounded-xl border-2 border-gray-200 bg-white px-6 text-text-main transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-gray-700 dark:bg-surface-dark dark:text-white">
                <span className="material-symbols-outlined text-[20px]">share</span>
              </button>
            </div>
          </div>

          {/* Safety Tips */}
          <div className="rounded-xl bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-500">info</span>
              <div>
                <h4 className="font-bold text-yellow-900 dark:text-yellow-500 mb-1">Safety Tips</h4>
                <ul className="text-sm text-yellow-800 dark:text-yellow-400 space-y-1">
                  <li>• Meet in a public place</li>
                  <li>• Check the item before you buy</li>
                  <li>• Don&rsquo;t pay in advance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description and Specifications */}
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-surface-dark">
            <h2 className="text-xl font-bold text-text-main dark:text-white mb-4">Description</h2>
            <p className="text-text-secondary dark:text-gray-400 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {/* Specifications */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-surface-dark">
            <h2 className="text-xl font-bold text-text-main dark:text-white mb-4">Specifications</h2>
            <div className="space-y-3">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex items-start justify-between border-b border-gray-100 pb-3 last:border-0 dark:border-gray-700">
                  <span className="font-semibold text-text-secondary dark:text-gray-400">{key}</span>
                  <span className="text-right font-medium text-text-main dark:text-white max-w-[60%]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-surface-dark">
            <h2 className="text-xl font-bold text-text-main dark:text-white mb-4">Details</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-text-secondary dark:text-gray-400">category</span>
                <div className="flex-1">
                  <div className="text-sm text-text-secondary dark:text-gray-400">Category</div>
                  <div className="font-semibold text-text-main dark:text-white">{product.category}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-text-secondary dark:text-gray-400">label</span>
                <div className="flex-1">
                  <div className="text-sm text-text-secondary dark:text-gray-400">Brand</div>
                  <div className="font-semibold text-text-main dark:text-white">{product.brand}</div>
                </div>
              </div>
              {product.model && (
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-text-secondary dark:text-gray-400">devices</span>
                  <div className="flex-1">
                    <div className="text-sm text-text-secondary dark:text-gray-400">Model</div>
                    <div className="font-semibold text-text-main dark:text-white">{product.model}</div>
                  </div>
                </div>
              )}
              {product.color && (
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-text-secondary dark:text-gray-400">palette</span>
                  <div className="flex-1">
                    <div className="text-sm text-text-secondary dark:text-gray-400">Color</div>
                    <div className="font-semibold text-text-main dark:text-white">{product.color}</div>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-text-secondary dark:text-gray-400">schedule</span>
                <div className="flex-1">
                  <div className="text-sm text-text-secondary dark:text-gray-400">Posted</div>
                  <div className="font-semibold text-text-main dark:text-white">{formatDate(product.postedDate)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-text-main dark:text-white mb-6">Similar Products</h2>
        <div className="text-center py-12 text-text-secondary dark:text-gray-400">
          <p>Similar products would appear here</p>
        </div>
      </div>
    </main>
  );
}

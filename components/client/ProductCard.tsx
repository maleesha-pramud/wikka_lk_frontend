"use client";

import Image from "next/image";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  condition?: string;
  location: string;
  distance: string;
  image: string;
  alt: string;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
  onClick?: (id: string) => void;
}

export function ProductCard({
  id,
  title,
  price,
  condition,
  location,
  distance,
  image,
  alt,
  isFavorite = false,
  onFavoriteToggle,
  onClick,
}: ProductCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onFavoriteToggle) {
      onFavoriteToggle(id);
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div
      className="group relative flex flex-col gap-3 rounded-2xl bg-white p-2.5 shadow-soft transition-all hover:shadow-hover dark:bg-surface-dark cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-gray-100">
        <Image
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          alt={alt}
          src={image}
          unoptimized
        />
        <button
          onClick={handleFavoriteClick}
          className={`absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white shadow-sm transition-colors dark:bg-background-dark/80 ${
            isFavorite
              ? 'text-red-500'
              : 'text-gray-400 hover:text-red-500'
          }`}
        >
          <span className={`material-symbols-outlined text-[20px] ${isFavorite ? 'filled-icon' : ''}`}>
            favorite
          </span>
        </button>
        {condition && (
          <span className="absolute bottom-2 left-2 rounded-md bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-text-main shadow-sm backdrop-blur-sm dark:bg-black/80 dark:text-white">
            {condition}
          </span>
        )}
      </div>
      <div className="px-1 pb-2">
        <div className="mb-1 flex items-baseline justify-between">
          <span className="text-lg font-bold text-text-main dark:text-white">
            €{price}
          </span>
        </div>
        <h3 className="line-clamp-2 text-sm font-medium text-text-main dark:text-gray-200">
          {title}
        </h3>
        <div className="mt-2 flex items-center gap-1 text-xs font-medium text-gray-400">
          <span className="material-symbols-outlined text-[14px]">location_on</span>
          <span>{location} · {distance}</span>
        </div>
      </div>
    </div>
  );
}

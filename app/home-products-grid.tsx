"use client";

import { useState } from "react";
import { ProductCard } from "@/components/client/ProductCard";

const mockProducts = [
  {
    id: "1",
    title: "iPhone 13 Pro - 128GB Sierra Blue",
    price: 650,
    condition: "Like New",
    location: "Downtown",
    distance: "2km",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6iiFYNJBDuujFd8ZLBO5t0KWWOb0N8g3b1eaU-rtWdeGPOZNP4BAd9jhyRSs1-4-3d2HpsaWRXUaRiMWtj1l2RMSONz3MFyR_BtslXso_WVeVoWXgmGJFIGAx-zuwwQ5SY6VAsuYH8L7M3b77EYbAOBwvGNE6gs73tNprqB5fvCo3gp2NRnn6skpfTBwvtBfcMXZjKOc7bn-8MvO-CZxReelO9SoJOfV8BeXjd3nBJOIFi8WU0uQ6tEUgr3_tU2Igj-3QDAYe00Q",
    alt: "Close up of a modern smartphone on a desk",
    isFavorite: false
  },
  {
    id: "2",
    title: "Vintage Leather Jacket",
    price: 45,
    condition: "",
    location: "West End",
    distance: "5km",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbC99mddpwHOFNX5HnbGJJX7v4jsuzy78MCg4hl2zQP0ebKn_oAdqptsCD74dwh0zvoQvAQ8qkFoJ_rO9a87H-Op2iE4cpxxe3PT9EmwgwHczL9igR4ew4AuHtPH6OTVbBe4eZD_J0ppcRwvrBYA3ktud-dgr8B_GQinwwc98sJnWQZxwkUCq62dq7xAbyI2Y64JUzZC7J31fTX1vh8CJOx6Y6EJ4ixp4BQ4AosvCoiR_Qjsq8UD4vGlMCnvgN9wWPZE-oW9m0V9w",
    alt: "Brown leather jacket hanging against a wall",
    isFavorite: false
  },
  {
    id: "3",
    title: "Sony A7III Camera Kit",
    price: 1400,
    condition: "Good",
    location: "Uptown",
    distance: "1km",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsu5Bu3QZwgF2OEKgi7EK0qpWBUXztvjJM9Kxdcsl43vToTNNpE8hquBhYDfJO_Bf4F2dHw8GFI-9b_OHav6qu1T4nx2_ysTugSj5slDGGTOEAFnHiCZhC6jD0wknA7I9f7vHMQWX--SY9FunxSdp4opR5mbU7TAI-6FsgbiPV6NoguJ5B4rBmHNMJIpEVxTRNCuKf7oIL6AnI6eQ7WmN36KJeNReA-4cTZ4C0RsWgxrvmu1_IrEuXfyzqWNO7_UtybFUI-TNXLbA",
    alt: "Professional camera with lens on a table",
    isFavorite: false
  },
  {
    id: "4",
    title: "Trek Marlin Mountain Bike",
    price: 350,
    condition: "",
    location: "Suburbs",
    distance: "10km",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcuCK8bKy_-3Z5S_uPT1XRH916LfkiiS6cKIkgbenk_QiAy_gNeEik9T219IXbnsXlV3cac_kV0V4Cc391rj3usqOKlMbLJw-R5VPHUMSs08Fq2Cm4BHJFP4J5UqQVjICY8cwc4HwIsLRPQO3G_sIMgB4O7B6VG3aShBozE32VmS8TYoPgJwkhvjwIE9r7WNBTTODenB4j2UNfvGg7lqQ-wU4_gJW1Nve20YZfTN_buzsUWql0ChSv4XkETrqQ8YlhXxPueHGaPug",
    alt: "Mountain bike parked on a trail",
    isFavorite: false
  },
  {
    id: "5",
    title: "Green Velvet Sofa",
    price: 200,
    condition: "",
    location: "North End",
    distance: "8km",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlAi_aqHaz79RreZqiDmUOUPpBDKcsadpsMpZY6LBSlYxVDUIf5XhVmzYwjhYLpmB8UPLtN6U6gnrm_mVwm9tWlOqH1LxjTnf_nfufWOPbMsbrhYzQunkFbcjwOu6FFJ1tF3h_IDCtzEQwlC-vadxM6g1X47gXlZayuMLcYKs-gcGUEez2Mg1CXmxmwxlPK8cG8NeEQ1pSOs-apFmnRUs59E7HSVtELwr33laSAanQrIpPf7f8Q-p1tsc4m7KCihX-RgGVw-i2DA",
    alt: "Green velvet sofa in a modern living room",
    isFavorite: false
  },
  {
    id: "6",
    title: "PS5 Controller + Games Bundle",
    price: 85,
    condition: "Used",
    location: "City Center",
    distance: "4km",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFVKsmLa8GoDSlhdMXxI_8bkj-6xNgxnsRR31sG2jK6s1gZrN6UNRUk_FXDed92M0zcDOz3einqOiPIZCg7_qff9rp8K9pt4DxnpD9YBd_ZZwfmCONkbVRgZ5Qf5PIaurFU7ztO79M1smDOmU7LT2ZV1_QDLBKMBHPoeghqTna-kFz22ydT3HPOpvw0Nbd27qUvbsSyLmEv0iNDFBZZpkNL8829t29IxhtbUa7ssQr4Jb13iUuZ1uQrYbrLYNjzbIFixb5Sw81GwE",
    alt: "Gaming console controller on a dark background",
    isFavorite: false
  },
  {
    id: "7",
    title: "Nike Air Max - Size 42",
    price: 75,
    condition: "",
    location: "East Side",
    distance: "7km",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAl--e2Iq-cuPQiRpZiUWrH7_0e_43bfx_6ikQ0Rio8CkzoUZW_mNCHEhDxIVp44bqRirjGb5wSwLr-cgq2mjdDZwcx2T-mNBBuj2o-Pa0UkgykPqdOyok3vHvCUmSY6T7QmhhkAfiNyArC-zo8_gFVSZJIIuBpwvn0RggH-RJnw0x5q_3aqH6ZcaFbe6g5GhtIO9VLdo4zG9UYECPbzAtlG9h17-pAaRbS8nCI6elvZNwKi3AiOLqnS6gFTOFTOr49fGdnBwUmA7k",
    alt: "Red nike sneakers on white background",
    isFavorite: false
  },
  {
    id: "8",
    title: "Audio Technica Turntable",
    price: 180,
    condition: "Vintage",
    location: "Downtown",
    distance: "3km",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwEdbtiq2-Mj3THOr1N9lEkGlgS2mVGJCD-ppE2MU5Jcn1Evzqh9A_pN39aisOdKjys_27iq1kRhUyMWqtwvkH_pYDC34Q4Wse5mYVlcSzibkRN9RxTNmWl2ZmNgyj_gq-WkxtZ40Os4Ioe_1MIhIqasaySUl5LllOg7H8rBAzEhyWHcywDP8BihNjFV9-B4t0ZONurnEtJ0yefIi-5t8NtlUPhnTc3wRb8YhPtggyZdidSed_zPF1wMsBgGP1SbsW1pwt_RF1fuE",
    alt: "Vintage record player on wooden table",
    isFavorite: false
  }
];

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

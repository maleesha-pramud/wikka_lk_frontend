import { Navbar } from "@/components/server/navbar";
import { ProductDetailsClient } from "./product-details-client";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <ProductDetailsClient productId={id} />
    </div>
  );
}

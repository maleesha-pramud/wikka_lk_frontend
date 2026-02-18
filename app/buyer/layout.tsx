import BuyerSidebar from "@/components/client/sidebar/buyer-sidebar";

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      <BuyerSidebar />
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}

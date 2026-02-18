import { Navbar } from "@/components/server/navbar";
import { SearchClient } from "./search-client";

export default function SearchPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <SearchClient />
    </div>
  );
}

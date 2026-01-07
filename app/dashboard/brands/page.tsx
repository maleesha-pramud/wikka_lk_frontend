"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/client/ui/dialog";

interface Brand {
  id: number;
  name: string;
  category: string;
  productsCount: number;
  createdAt: string;
  status: "active" | "inactive";
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([
    { id: 1, name: "Apple", category: "Electronics", productsCount: 45, createdAt: "2024-01-15", status: "active" },
    { id: 2, name: "Samsung", category: "Electronics", productsCount: 38, createdAt: "2024-01-20", status: "active" },
    { id: 3, name: "Nike", category: "Fashion", productsCount: 22, createdAt: "2024-02-05", status: "active" },
    { id: 4, name: "Sony", category: "Electronics", productsCount: 31, createdAt: "2024-02-10", status: "active" },
    { id: 5, name: "Canon", category: "Cameras", productsCount: 18, createdAt: "2024-02-15", status: "inactive" },
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
  });

  const categories = ["Electronics", "Fashion", "Cameras", "Sports", "Home", "Gaming"];

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    brand.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddBrand = () => {
    if (!formData.name.trim() || !formData.category) {
      toast.error("Please fill in all fields");
      return;
    }

    const newBrand: Brand = {
      id: brands.length + 1,
      name: formData.name,
      category: formData.category,
      productsCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
      status: "active",
    };

    setBrands([...brands, newBrand]);
    setFormData({ name: "", category: "" });
    setShowAddDialog(false);
    toast.success("Brand added successfully!");
  };

  const handleEditBrand = () => {
    if (!editingBrand || !formData.name.trim() || !formData.category) {
      toast.error("Please fill in all fields");
      return;
    }

    setBrands(
      brands.map((brand) =>
        brand.id === editingBrand.id
          ? { ...brand, name: formData.name, category: formData.category }
          : brand
      )
    );

    setEditingBrand(null);
    setFormData({ name: "", category: "" });
    toast.success("Brand updated successfully!");
  };

  const handleDeleteBrand = (id: number) => {
    setBrands(brands.filter((brand) => brand.id !== id));
    toast.success("Brand deleted successfully!");
  };

  const toggleStatus = (id: number) => {
    setBrands(
      brands.map((brand) =>
        brand.id === id
          ? { ...brand, status: brand.status === "active" ? "inactive" : "active" }
          : brand
      )
    );
  };

  const openEditDialog = (brand: Brand) => {
    setEditingBrand(brand);
    setFormData({ name: brand.name, category: brand.category });
  };

  const closeDialog = () => {
    setShowAddDialog(false);
    setEditingBrand(null);
    setFormData({ name: "", category: "" });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-border-light/50 dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <div className="px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-text-main-light dark:text-text-main-dark tracking-tight">
                Brand Management
              </h1>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
                Manage all brands available on your platform
              </p>
            </div>
            <button
              onClick={() => setShowAddDialog(true)}
              className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold px-6 py-3 rounded-full shadow-lg shadow-primary/30 transition-all hover:scale-[1.02]"
            >
              <span className="material-symbols-outlined">add</span>
              Add Brand
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 lg:px-8 py-8">
        {/* Search & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">
                search
              </span>
              <input
                type="text"
                placeholder="Search brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-main-light dark:text-text-main-dark placeholder-text-secondary-light/60 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
              />
            </div>
          </div>
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-card border border-border-light/50 dark:border-border-dark">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-xl">label</span>
              </div>
              <h3 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">
                {brands.length}
              </h3>
            </div>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark font-medium">
              Total Brands
            </p>
          </div>
        </div>

        {/* Brands Table */}
        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-border-light/50 dark:border-border-dark overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background-light dark:bg-background-dark border-b border-border-light dark:border-border-dark">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                    Brand Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                    Products
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light dark:divide-border-dark">
                {filteredBrands.map((brand) => (
                  <tr
                    key={brand.id}
                    className="hover:bg-background-light dark:hover:bg-background-dark transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 text-primary font-bold">
                          {brand.name.charAt(0)}
                        </div>
                        <span className="font-bold text-text-main-light dark:text-text-main-dark">
                          {brand.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        {brand.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-text-main-light dark:text-text-main-dark">
                        {brand.productsCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        {new Date(brand.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleStatus(brand.id)}
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          brand.status === "active"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-gray-500/10 text-gray-500"
                        }`}
                      >
                        {brand.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditDialog(brand)}
                          className="p-2 rounded-lg hover:bg-background-light dark:hover:bg-background-dark text-text-secondary-light hover:text-primary transition-colors"
                          title="Edit brand"
                        >
                          <span className="material-symbols-outlined text-xl">edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteBrand(brand.id)}
                          className="p-2 rounded-lg hover:bg-background-light dark:hover:bg-background-dark text-text-secondary-light hover:text-red-500 transition-colors"
                          title="Delete brand"
                        >
                          <span className="material-symbols-outlined text-xl">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={showAddDialog || !!editingBrand} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="bg-surface-light dark:bg-surface-dark border-border-light/50 dark:border-border-dark sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
              {editingBrand ? "Edit Brand" : "Add New Brand"}
            </DialogTitle>
            <DialogDescription className="text-text-secondary-light dark:text-text-secondary-dark">
              {editingBrand ? "Update the brand information below." : "Add a new brand to your platform."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-text-main-light dark:text-text-main-dark ml-1">
                Brand Name
              </label>
              <input
                type="text"
                placeholder="e.g. Apple, Samsung"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light/30 dark:bg-background-dark text-text-main-light dark:text-text-main-dark placeholder-text-secondary-light/60 px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-text-main-light dark:text-text-main-dark ml-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light/30 dark:bg-background-dark text-text-main-light dark:text-text-main-dark px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm appearance-none cursor-pointer"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter className="gap-3">
            <button
              onClick={closeDialog}
              className="flex-1 px-4 py-3 rounded-xl border border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-background-dark font-bold transition-all"
            >
              Cancel
            </button>
            <button
              onClick={editingBrand ? handleEditBrand : handleAddBrand}
              className="flex-1 px-4 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold shadow-lg shadow-primary/30 transition-all"
            >
              {editingBrand ? "Update" : "Add Brand"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

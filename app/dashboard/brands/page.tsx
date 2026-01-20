"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getAllBrands, addBrand, updateBrand, deleteBrand } from "@/app/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/client/ui/dialog";
import { ConfirmationDialog } from "@/components/client/dialogs/confirmation-dialog";

interface Brand {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [deletingBrand, setDeletingBrand] = useState<Brand | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      setIsLoading(true);
      const response = await getAllBrands();
      if (response.status) {
        setBrands(response.data as Brand[]);
      } else {
        toast.error(response.error || "Unable to load brands. Please try again.");
      }
    } catch (error) {
      console.error("Error loading brands:", error);
      toast.error(
        error instanceof Error && error.message 
          ? error.message 
          : "Network error. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddBrand = async () => {
    if (!formData.name.trim()) {
      toast.error("Brand name is required");
      return;
    }

    if (formData.name.trim().length < 2) {
      toast.error("Brand name must be at least 2 characters long");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await addBrand(formData.name.trim());
      if (response.status) {
        toast.success("Brand added successfully!");
        setFormData({ name: "" });
        setShowAddDialog(false);
        await loadBrands();
      } else {
        toast.error(response.error || "Unable to add brand. Please try again.");
      }
    } catch (error) {
      console.error("Error adding brand:", error);
      toast.error(
        error instanceof Error && error.message
          ? error.message
          : "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditBrand = async () => {
    if (!editingBrand || !formData.name.trim()) {
      toast.error("Brand name is required");
      return;
    }

    if (formData.name.trim().length < 2) {
      toast.error("Brand name must be at least 2 characters long");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await updateBrand(editingBrand.id.toString(), formData.name.trim());
      if (response.status) {
        toast.success("Brand updated successfully!");
        setEditingBrand(null);
        setFormData({ name: "" });
        await loadBrands();
      } else {
        toast.error(response.error || "Unable to update brand. Please try again.");
      }
    } catch (error) {
      console.error("Error updating brand:", error);
      toast.error(
        error instanceof Error && error.message
          ? error.message
          : "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBrand = async () => {
    if (!deletingBrand) return;

    try {
      const response = await deleteBrand(deletingBrand.id.toString());
      if (response.status) {
        toast.success("Brand deleted successfully!");
        setDeletingBrand(null);
        await loadBrands();
      } else {
        toast.error(response.error || "Unable to delete brand. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting brand:", error);
      toast.error(
        error instanceof Error && error.message
          ? error.message
          : "Network error. Please check your connection and try again."
      );
    }
  };

  const openEditDialog = (brand: Brand) => {
    setEditingBrand(brand);
    setFormData({ name: brand.name });
  };

  const closeDialog = () => {
    setShowAddDialog(false);
    setEditingBrand(null);
    setFormData({ name: "" });
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
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <span className="material-symbols-outlined animate-spin text-5xl text-primary">
                  progress_activity
                </span>
                <p className="text-text-secondary-light dark:text-text-secondary-dark font-medium">
                  Loading brands...
                </p>
              </div>
            </div>
          ) : filteredBrands.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <span className="material-symbols-outlined text-5xl text-text-secondary-light/30 dark:text-text-secondary-dark/30">
                  {searchQuery ? "search_off" : "inventory_2"}
                </span>
                <p className="text-text-secondary-light dark:text-text-secondary-dark font-medium">
                  {searchQuery ? "No brands found matching your search" : "No brands yet"}
                </p>
                {!searchQuery && (
                  <button
                    onClick={() => setShowAddDialog(true)}
                    className="mt-2 flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold px-5 py-2.5 rounded-lg shadow-lg shadow-primary/30 transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">add</span>
                    Add Your First Brand
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-background-light dark:bg-background-dark border-b border-border-light dark:border-border-dark">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                      Brand Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                      Updated At
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
                      <span className="text-sm font-bold text-text-main-light dark:text-text-main-dark">
                        {brand.id}
                      </span>
                    </td>
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
                        {new Date(brand.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        }) + ' at ' + new Date(brand.createdAt).toLocaleTimeString('en-US', { 
                          hour: 'numeric', 
                          minute: '2-digit', 
                          hour12: true 
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        {new Date(brand.updatedAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        }) + ' at ' + new Date(brand.updatedAt).toLocaleTimeString('en-US', { 
                          hour: 'numeric', 
                          minute: '2-digit', 
                          hour12: true 
                        })}
                      </span>
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
                          onClick={() => setDeletingBrand(brand)}
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
          )}
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
          </div>
          <DialogFooter className="gap-3">
            <button
              onClick={closeDialog}
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 rounded-xl border border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-background-dark font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={editingBrand ? handleEditBrand : handleAddBrand}
              disabled={isSubmitting || !formData.name.trim()}
              className="flex-1 px-4 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold shadow-lg shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                  {editingBrand ? "Updating..." : "Adding..."}
                </>
              ) : (
                <>{editingBrand ? "Update" : "Add Brand"}</>
              )}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={!!deletingBrand}
        onOpenChange={(open) => !open && setDeletingBrand(null)}
        onConfirm={handleDeleteBrand}
        title="Delete Brand?"
        description={deletingBrand ? `Are you sure you want to delete "${deletingBrand.name}"? This action cannot be undone.` : ""}
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive={true}
      />
    </div>
  );
}

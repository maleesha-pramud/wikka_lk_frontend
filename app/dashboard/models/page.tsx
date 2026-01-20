"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getAllModels, addModel, updateModel, deleteModel, getAllBrands } from "@/app/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/client/ui/dialog";
import { ConfirmationDialog } from "@/components/client/dialogs/confirmation-dialog";

interface Model {
  id: number;
  name: string;
  brandId: number;
  brandName: string;
  createdAt: string;
  updatedAt: string;
}

interface Brand {
  id: number;
  name: string;
}

export default function ModelsPage() {
  const [models, setModels] = useState<Model[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingModel, setEditingModel] = useState<Model | null>(null);
  const [deletingModel, setDeletingModel] = useState<Model | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBrand, setFilterBrand] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    brandId: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [modelsResponse, brandsResponse] = await Promise.all([
        getAllModels(),
        getAllBrands(),
      ]);

      if (modelsResponse.status) {
        setModels(modelsResponse.data as Model[]);
      } else {
        toast.error(modelsResponse.error || "Unable to load models. Please try again.");
      }

      if (brandsResponse.status) {
        setBrands(brandsResponse.data as Brand[]);
      } else {
        toast.error(brandsResponse.error || "Unable to load brands. Please try again.");
      }
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error(
        error instanceof Error && error.message
          ? error.message
          : "Network error. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const filteredModels = models.filter((model) => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.brandName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = !filterBrand || model.brandName === filterBrand;
    return matchesSearch && matchesBrand;
  });

  const handleAddModel = async () => {
    if (!formData.name.trim()) {
      toast.error("Model name is required");
      return;
    }

    if (!formData.brandId) {
      toast.error("Please select a brand");
      return;
    }

    if (formData.name.trim().length < 2) {
      toast.error("Model name must be at least 2 characters long");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await addModel(formData.name.trim(), parseInt(formData.brandId));
      if (response.status) {
        toast.success("Model added successfully!");
        setFormData({ name: "", brandId: "" });
        setShowAddDialog(false);
        await loadData();
      } else {
        toast.error(response.error || "Unable to add model. Please try again.");
      }
    } catch (error) {
      console.error("Error adding model:", error);
      toast.error(
        error instanceof Error && error.message
          ? error.message
          : "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditModel = async () => {
    if (!editingModel || !formData.name.trim()) {
      toast.error("Model name is required");
      return;
    }

    if (!formData.brandId) {
      toast.error("Please select a brand");
      return;
    }

    if (formData.name.trim().length < 2) {
      toast.error("Model name must be at least 2 characters long");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await updateModel(
        editingModel.id.toString(),
        formData.name.trim(),
        parseInt(formData.brandId)
      );
      if (response.status) {
        toast.success("Model updated successfully!");
        setEditingModel(null);
        setFormData({ name: "", brandId: "" });
        await loadData();
      } else {
        toast.error(response.error || "Unable to update model. Please try again.");
      }
    } catch (error) {
      console.error("Error updating model:", error);
      toast.error(
        error instanceof Error && error.message
          ? error.message
          : "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteModel = async () => {
    if (!deletingModel) return;

    try {
      const response = await deleteModel(deletingModel.id.toString());
      if (response.status) {
        toast.success("Model deleted successfully!");
        setDeletingModel(null);
        await loadData();
      } else {
        toast.error(response.error || "Unable to delete model. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting model:", error);
      toast.error(
        error instanceof Error && error.message
          ? error.message
          : "Network error. Please check your connection and try again."
      );
    }
  };

  const openEditDialog = (model: Model) => {
    setEditingModel(model);
    setFormData({ name: model.name, brandId: model.brandId.toString() });
  };

  const closeDialog = () => {
    setShowAddDialog(false);
    setEditingModel(null);
    setFormData({ name: "", brandId: "" });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-border-light/50 dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <div className="px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-text-main-light dark:text-text-main-dark tracking-tight">
                Model Management
              </h1>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
                Manage all product models available on your platform
              </p>
            </div>
            <button
              onClick={() => setShowAddDialog(true)}
              className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold px-6 py-3 rounded-full shadow-lg shadow-primary/30 transition-all hover:scale-[1.02]"
            >
              <span className="material-symbols-outlined">add</span>
              Add Model
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 lg:px-8 py-8">
        {/* Search, Filter & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">
                search
              </span>
              <input
                type="text"
                placeholder="Search models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-main-light dark:text-text-main-dark placeholder-text-secondary-light/60 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
              />
            </div>
          </div>
          <div className="lg:col-span-2">
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="w-full rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-main-light dark:text-text-main-dark px-4 py-3.5 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm appearance-none cursor-pointer"
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-card border border-border-light/50 dark:border-border-dark">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-xl">category</span>
              </div>
              <h3 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">
                {models.length}
              </h3>
            </div>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark font-medium">
              Total Models
            </p>
          </div>
        </div>

        {/* Models Table */}
        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-border-light/50 dark:border-border-dark overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <span className="material-symbols-outlined animate-spin text-5xl text-primary">
                  progress_activity
                </span>
                <p className="text-text-secondary-light dark:text-text-secondary-dark font-medium">
                  Loading models...
                </p>
              </div>
            </div>
          ) : filteredModels.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <span className="material-symbols-outlined text-5xl text-text-secondary-light/30 dark:text-text-secondary-dark/30">
                  {searchQuery ? "search_off" : "devices"}
                </span>
                <p className="text-text-secondary-light dark:text-text-secondary-dark font-medium">
                  {searchQuery ? "No models found matching your search" : "No models yet"}
                </p>
                {!searchQuery && (
                  <button
                    onClick={() => setShowAddDialog(true)}
                    className="mt-2 flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold px-5 py-2.5 rounded-lg shadow-lg shadow-primary/30 transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">add</span>
                    Add Your First Model
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
                      Model Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                      Brand
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
                  {filteredModels.map((model) => (
                    <tr
                      key={model.id}
                      className="hover:bg-background-light dark:hover:bg-background-dark transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-text-main-light dark:text-text-main-dark">
                          {model.id}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center size-10 rounded-xl bg-blue-500/10 text-blue-500 font-bold">
                            <span className="material-symbols-outlined text-xl">devices</span>
                          </div>
                          <span className="font-bold text-text-main-light dark:text-text-main-dark">
                            {model.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
                          {model.brandName}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                          {new Date(model.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          }) + ' at ' + new Date(model.createdAt).toLocaleTimeString('en-US', { 
                            hour: 'numeric', 
                            minute: '2-digit', 
                            hour12: true 
                          })}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                          {new Date(model.updatedAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          }) + ' at ' + new Date(model.updatedAt).toLocaleTimeString('en-US', { 
                            hour: 'numeric', 
                            minute: '2-digit', 
                            hour12: true 
                          })}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditDialog(model)}
                            className="p-2 rounded-lg hover:bg-background-light dark:hover:bg-background-dark text-text-secondary-light hover:text-primary transition-colors"
                            title="Edit model"
                          >
                            <span className="material-symbols-outlined text-xl">edit</span>
                          </button>
                          <button
                            onClick={() => setDeletingModel(model)}
                            className="p-2 rounded-lg hover:bg-background-light dark:hover:bg-background-dark text-text-secondary-light hover:text-red-500 transition-colors"
                            title="Delete model"
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
      <Dialog open={showAddDialog || !!editingModel} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="bg-surface-light dark:bg-surface-dark border-border-light/50 dark:border-border-dark sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
              {editingModel ? "Edit Model" : "Add New Model"}
            </DialogTitle>
            <DialogDescription className="text-text-secondary-light dark:text-text-secondary-dark">
              {editingModel ? "Update the model information below." : "Add a new model to your platform."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-text-main-light dark:text-text-main-dark ml-1">
                Model Name
              </label>
              <input
                type="text"
                placeholder="e.g. iPhone 13, Galaxy S21"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light/30 dark:bg-background-dark text-text-main-light dark:text-text-main-dark placeholder-text-secondary-light/60 px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-text-main-light dark:text-text-main-dark ml-1">
                Brand
              </label>
              <select
                value={formData.brandId}
                onChange={(e) => setFormData({ ...formData, brandId: e.target.value })}
                className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light/30 dark:bg-background-dark text-text-main-light dark:text-text-main-dark px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm appearance-none cursor-pointer"
              >
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
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
              onClick={editingModel ? handleEditModel : handleAddModel}
              disabled={isSubmitting || !formData.name.trim() || !formData.brandId}
              className="flex-1 px-4 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold shadow-lg shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                  {editingModel ? "Updating..." : "Adding..."}
                </>
              ) : (
                <>{editingModel ? "Update" : "Add Model"}</>
              )}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={!!deletingModel}
        onOpenChange={(open) => !open && setDeletingModel(null)}
        onConfirm={handleDeleteModel}
        title="Delete Model?"
        description={deletingModel ? `Are you sure you want to delete "${deletingModel.name}"? This action cannot be undone.` : ""}
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive={true}
      />
    </div>
  );
}

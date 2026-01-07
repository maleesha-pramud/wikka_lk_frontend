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

interface Model {
  id: number;
  name: string;
  brand: string;
  category: string;
  productsCount: number;
  createdAt: string;
  status: "active" | "inactive";
}

export default function ModelsPage() {
  const [models, setModels] = useState<Model[]>([
    { id: 1, name: "iPhone 13", brand: "Apple", category: "Mobile", productsCount: 28, createdAt: "2024-01-15", status: "active" },
    { id: 2, name: "Galaxy S21", brand: "Samsung", category: "Mobile", productsCount: 22, createdAt: "2024-01-20", status: "active" },
    { id: 3, name: "Air Max", brand: "Nike", category: "Fashion", productsCount: 15, createdAt: "2024-02-05", status: "active" },
    { id: 4, name: "PlayStation 5", brand: "Sony", category: "Gaming", productsCount: 19, createdAt: "2024-02-10", status: "active" },
    { id: 5, name: "EOS R5", brand: "Canon", category: "Cameras", productsCount: 12, createdAt: "2024-02-15", status: "inactive" },
    { id: 6, name: "MacBook Pro", brand: "Apple", category: "Computers", productsCount: 31, createdAt: "2024-02-20", status: "active" },
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingModel, setEditingModel] = useState<Model | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBrand, setFilterBrand] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
  });

  const brands = ["Apple", "Samsung", "Nike", "Sony", "Canon", "Dell", "HP"];
  const categories = ["Mobile", "Computers", "Fashion", "Cameras", "Sports", "Gaming"];

  const filteredModels = models.filter((model) => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = !filterBrand || model.brand === filterBrand;
    return matchesSearch && matchesBrand;
  });

  const handleAddModel = () => {
    if (!formData.name.trim() || !formData.brand || !formData.category) {
      toast.error("Please fill in all fields");
      return;
    }

    const newModel: Model = {
      id: models.length + 1,
      name: formData.name,
      brand: formData.brand,
      category: formData.category,
      productsCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
      status: "active",
    };

    setModels([...models, newModel]);
    setFormData({ name: "", brand: "", category: "" });
    setShowAddDialog(false);
    toast.success("Model added successfully!");
  };

  const handleEditModel = () => {
    if (!editingModel || !formData.name.trim() || !formData.brand || !formData.category) {
      toast.error("Please fill in all fields");
      return;
    }

    setModels(
      models.map((model) =>
        model.id === editingModel.id
          ? { ...model, name: formData.name, brand: formData.brand, category: formData.category }
          : model
      )
    );

    setEditingModel(null);
    setFormData({ name: "", brand: "", category: "" });
    toast.success("Model updated successfully!");
  };

  const handleDeleteModel = (id: number) => {
    setModels(models.filter((model) => model.id !== id));
    toast.success("Model deleted successfully!");
  };

  const toggleStatus = (id: number) => {
    setModels(
      models.map((model) =>
        model.id === id
          ? { ...model, status: model.status === "active" ? "inactive" : "active" }
          : model
      )
    );
  };

  const openEditDialog = (model: Model) => {
    setEditingModel(model);
    setFormData({ name: model.name, brand: model.brand, category: model.category });
  };

  const closeDialog = () => {
    setShowAddDialog(false);
    setEditingModel(null);
    setFormData({ name: "", brand: "", category: "" });
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
                <option key={brand} value={brand}>
                  {brand}
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background-light dark:bg-background-dark border-b border-border-light dark:border-border-dark">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                    Model Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                    Brand
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
                {filteredModels.map((model) => (
                  <tr
                    key={model.id}
                    className="hover:bg-background-light dark:hover:bg-background-dark transition-colors"
                  >
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
                        {model.brand}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        {model.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-text-main-light dark:text-text-main-dark">
                        {model.productsCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        {new Date(model.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleStatus(model.id)}
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          model.status === "active"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-gray-500/10 text-gray-500"
                        }`}
                      >
                        {model.status}
                      </button>
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
                          onClick={() => handleDeleteModel(model.id)}
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
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light/30 dark:bg-background-dark text-text-main-light dark:text-text-main-dark px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm appearance-none cursor-pointer"
              >
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
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
              onClick={editingModel ? handleEditModel : handleAddModel}
              className="flex-1 px-4 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold shadow-lg shadow-primary/30 transition-all"
            >
              {editingModel ? "Update" : "Add Model"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

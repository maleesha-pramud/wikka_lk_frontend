"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/client/ui/dialog";

interface Category {
  id: number;
  name: string;
  icon: string;
  iconPreview?: string;
  productsCount: number;
  createdAt: string;
  status: "active" | "inactive";
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Cameras", icon: "photo_camera", productsCount: 45, createdAt: "2024-01-15", status: "active" },
    { id: 2, name: "Mobile", icon: "smartphone", productsCount: 128, createdAt: "2024-01-20", status: "active" },
    { id: 3, name: "Fashion", icon: "checkroom", productsCount: 92, createdAt: "2024-02-05", status: "active" },
    { id: 4, name: "Computers", icon: "computer", productsCount: 67, createdAt: "2024-02-10", status: "active" },
    { id: 5, name: "Sports", icon: "sports_soccer", productsCount: 34, createdAt: "2024-02-15", status: "inactive" },
    { id: 6, name: "Gaming", icon: "videogame_asset", productsCount: 56, createdAt: "2024-02-20", status: "active" },
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [iconPreview, setIconPreview] = useState<string>("");
  const [iconFile, setIconFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
  });

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB");
      return;
    }

    setIconFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setIconPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddCategory = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    if (!formData.icon.trim() && !iconPreview) {
      toast.error("Please provide an icon (Material Symbol name or upload image)");
      return;
    }

    const newCategory: Category = {
      id: categories.length + 1,
      name: formData.name,
      icon: formData.icon || "category",
      iconPreview: iconPreview || undefined,
      productsCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
      status: "active",
    };

    setCategories([...categories, newCategory]);
    resetForm();
    setShowAddDialog(false);
    toast.success("Category added successfully!");
  };

  const handleEditCategory = () => {
    if (!editingCategory || !formData.name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    setCategories(
      categories.map((category) =>
        category.id === editingCategory.id
          ? {
              ...category,
              name: formData.name,
              icon: formData.icon || category.icon,
              iconPreview: iconPreview || category.iconPreview,
            }
          : category
      )
    );

    resetForm();
    setEditingCategory(null);
    toast.success("Category updated successfully!");
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((category) => category.id !== id));
    toast.success("Category deleted successfully!");
  };

  const toggleStatus = (id: number) => {
    setCategories(
      categories.map((category) =>
        category.id === id
          ? { ...category, status: category.status === "active" ? "inactive" : "active" }
          : category
      )
    );
  };

  const openEditDialog = (category: Category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, icon: category.icon });
    if (category.iconPreview) {
      setIconPreview(category.iconPreview);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", icon: "" });
    setIconPreview("");
    setIconFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const closeDialog = () => {
    setShowAddDialog(false);
    setEditingCategory(null);
    resetForm();
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-border-light/50 dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <div className="px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-text-main-light dark:text-text-main-dark tracking-tight">
                Category Management
              </h1>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
                Manage all product categories on your platform
              </p>
            </div>
            <button
              onClick={() => setShowAddDialog(true)}
              className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold px-6 py-3 rounded-full shadow-lg shadow-primary/30 transition-all hover:scale-[1.02]"
            >
              <span className="material-symbols-outlined">add</span>
              Add Category
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
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-main-light dark:text-text-main-dark placeholder-text-secondary-light/60 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
              />
            </div>
          </div>
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-card border border-border-light/50 dark:border-border-dark">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-xl">widgets</span>
              </div>
              <h3 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">
                {categories.length}
              </h3>
            </div>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark font-medium">
              Total Categories
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-card border border-border-light/50 dark:border-border-dark hover:shadow-hover transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  {category.iconPreview ? (
                    <Image
                      src={category.iconPreview}
                      alt={category.name}
                      width={48}
                      height={48}
                      className="rounded-xl object-cover"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-4xl">{category.icon}</span>
                  )}
                </div>
                <button
                  onClick={() => toggleStatus(category.id)}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    category.status === "active"
                      ? "bg-green-500/10 text-green-500"
                      : "bg-gray-500/10 text-gray-500"
                  }`}
                >
                  {category.status}
                </button>
              </div>

              <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-2">
                {category.name}
              </h3>

              <div className="flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">
                <span className="material-symbols-outlined text-base">inventory_2</span>
                <span>{category.productsCount} products</span>
              </div>

              <div className="flex gap-2 pt-4 border-t border-border-light dark:border-border-dark">
                <button
                  onClick={() => openEditDialog(category)}
                  className="flex-1 px-3 py-2 rounded-lg bg-background-light dark:bg-background-dark hover:bg-primary/10 dark:hover:bg-primary/20 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-all text-sm font-bold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="flex-1 px-3 py-2 rounded-lg bg-background-light dark:bg-background-dark hover:bg-red-500/10 text-text-secondary-light dark:text-text-secondary-dark hover:text-red-500 transition-all text-sm font-bold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={showAddDialog || !!editingCategory} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="bg-surface-light dark:bg-surface-dark border-border-light/50 dark:border-border-dark sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </DialogTitle>
            <DialogDescription className="text-text-secondary-light dark:text-text-secondary-dark">
              {editingCategory ? "Update the category information below." : "Add a new category to your platform."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-text-main-light dark:text-text-main-dark ml-1">
                Category Name
              </label>
              <input
                type="text"
                placeholder="e.g. Electronics, Fashion"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light/30 dark:bg-background-dark text-text-main-light dark:text-text-main-dark placeholder-text-secondary-light/60 px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-text-main-light dark:text-text-main-dark ml-1">
                Icon
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Material icon name"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light/30 dark:bg-background-dark text-text-main-light dark:text-text-main-dark placeholder-text-secondary-light/60 px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm text-sm"
                  />
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark ml-1">
                    e.g. camera, phone
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleIconUpload}
                    className="hidden"
                    id="icon-upload"
                  />
                  <label
                    htmlFor="icon-upload"
                    className="flex flex-col items-center justify-center h-full min-h-[60px] rounded-xl border-2 border-dashed border-border-light dark:border-border-dark bg-background-light/30 dark:bg-background-dark hover:border-primary cursor-pointer transition-all"
                  >
                    <span className="material-symbols-outlined text-primary text-2xl">
                      upload
                    </span>
                    <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
                      Upload Icon
                    </span>
                  </label>
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark ml-1">
                    or upload image
                  </p>
                </div>
              </div>
            </div>

            {/* Icon Preview */}
            {(iconPreview || formData.icon) && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-main-light dark:text-text-main-dark ml-1">
                  Preview
                </label>
                <div className="flex items-center justify-center p-6 rounded-xl bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark">
                  {iconPreview ? (
                    <div className="relative">
                      <Image
                        src={iconPreview}
                        alt="Icon preview"
                        width={80}
                        height={80}
                        className="rounded-xl object-cover"
                      />
                      <button
                        onClick={() => {
                          setIconPreview("");
                          setIconFile(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center size-20 rounded-2xl bg-primary/10 text-primary">
                      <span className="material-symbols-outlined text-5xl">{formData.icon}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="gap-3">
            <button
              onClick={closeDialog}
              className="flex-1 px-4 py-3 rounded-xl border border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-background-dark font-bold transition-all"
            >
              Cancel
            </button>
            <button
              onClick={editingCategory ? handleEditCategory : handleAddCategory}
              className="flex-1 px-4 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold shadow-lg shadow-primary/30 transition-all"
            >
              {editingCategory ? "Update" : "Add Category"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

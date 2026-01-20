"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getAllCategories, addCategory, updateCategory, deleteCategory } from "@/app/actions";
import * as LucideIcons from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/client/ui/dialog";

type LucideIconComponent = React.ComponentType<{ size?: number }>;

interface Category {
  id: number;
  name: string;
  icon: string;
  productsCount: number;
  createdAt: string;
  status: "active" | "inactive";
}

const POPULAR_ICONS = [
  'Camera', 'Smartphone', 'Laptop', 'Gamepad2', 'Watch', 'Headphones',
  'Tv', 'Monitor', 'Keyboard', 'Mouse', 'Speaker', 'Mic',
  'Shirt', 'ShoppingBag', 'Package', 'Home', 'Car', 'Bike',
  'Book', 'Briefcase', 'Heart', 'Star', 'Gift', 'Music',
  'Coffee', 'Pizza', 'Utensils', 'Dumbbell', 'Palette', 'Wrench',
  'Scissors', 'Paintbrush', 'Glasses', 'Baby', 'Dog', 'Cat', 'Activity'
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [iconSearch, setIconSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    icon: "Package",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await getAllCategories();
      if (response.status) {
        setCategories(response.data as Category[]);
      } else {
        toast.error(response.message || "Failed to fetch categories");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );



  const handleAddCategory = async () => {
    if (!formData.name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    try {
      const response = await addCategory(formData.name, formData.icon);
      if (response.status) {
        toast.success("Category added successfully!");
        resetForm();
        setShowAddDialog(false);
        await fetchCategories();
      } else {
        toast.error(response.message || "Failed to add category");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add category");
    }
  };

  const handleEditCategory = async () => {
    if (!editingCategory || !formData.name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    try {
       const response = await updateCategory(editingCategory.id.toString(), formData.name, formData.icon);
      if (response.status) {
        toast.success("Category updated successfully!");
        resetForm();
        setEditingCategory(null);
        await fetchCategories();
      } else {
        toast.error(response.message || "Failed to update category");
        setEditingCategory(null);
        await fetchCategories();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update category");
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      const response = await deleteCategory(id.toString());
      if (response.status) {
        toast.success("Category deleted successfully!");
        await fetchCategories();
      } else {
        toast.error(response.message || "Failed to delete category");
        toast.success("Category deleted successfully!");
        await fetchCategories();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete category");
    }
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
  };

  const resetForm = () => {
    setFormData({ name: "", icon: "Package" });
    setIconSearch("");
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
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark">Loading categories...</p>
            </div>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20">
            <span className="material-symbols-outlined text-6xl text-text-secondary-light/30 dark:text-text-secondary-dark/30 mb-4">
              widgets
            </span>
            <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-2">
              No categories found
            </h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
              {searchQuery ? "Try adjusting your search" : "Get started by adding your first category"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-card border border-border-light/50 dark:border-border-dark hover:shadow-hover transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  {(() => {
                    const IconComponent = (LucideIcons as unknown as Record<string, LucideIconComponent>)[category.icon] || LucideIcons.Package;
                    return <IconComponent size={40} />;
                  })()}
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
        )}
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
                Select Icon
              </label>
              
              {/* Selected Icon Preview */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark">
                <div className="flex items-center justify-center size-12 rounded-xl bg-primary/10 text-primary">
                  {(() => {
                    const IconComponent = (LucideIcons as unknown as Record<string, LucideIconComponent>)[formData.icon] || LucideIcons.Package;
                    return <IconComponent size={28} />;
                  })()}
                </div>
                <div>
                  <p className="text-sm font-bold text-text-main-light dark:text-text-main-dark">
                    {formData.icon}
                  </p>
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                    Selected icon
                  </p>
                </div>
              </div>

              {/* Icon Search */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark">
                  {(() => {
                    const SearchIcon = LucideIcons.Search;
                    return <SearchIcon size={18} />;
                  })()}
                </span>
                <input
                  type="text"
                  placeholder="Search icons..."
                  value={iconSearch}
                  onChange={(e) => setIconSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-background-light/30 dark:bg-background-dark text-text-main-light dark:text-text-main-dark placeholder-text-secondary-light/60 text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
              </div>

              {/* Icon Grid */}
              <div className="max-h-75 overflow-y-auto rounded-xl border border-border-light dark:border-border-dark bg-background-light/30 dark:bg-background-dark p-3">
                <div className="grid grid-cols-6 gap-2">
                  {POPULAR_ICONS
                    .filter(icon => icon.toLowerCase().includes(iconSearch.toLowerCase()))
                    .map((iconName) => {
                      const IconComponent = (LucideIcons as unknown as Record<string, LucideIconComponent>)[iconName];
                      if (!IconComponent) return null;
                      const isSelected = formData.icon === iconName;
                      return (
                        <button
                          key={iconName}
                          type="button"
                          onClick={() => setFormData({ ...formData, icon: iconName })}
                          className={`flex items-center justify-center size-12 rounded-lg transition-all ${
                            isSelected
                              ? "bg-primary text-white shadow-lg scale-105"
                              : "bg-surface-light dark:bg-surface-dark hover:bg-primary/10 dark:hover:bg-primary/20 text-text-main-light dark:text-text-main-dark"
                          }`}
                          title={iconName}
                        >
                          <IconComponent size={24} />
                        </button>
                      );
                    })}
                </div>
              </div>
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

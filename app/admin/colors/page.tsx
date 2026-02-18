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

interface Color {
  id: number;
  name: string;
  hexCode: string;
  productsCount: number;
  createdAt: string;
  status: "active" | "inactive";
}

export default function ColorsPage() {
  const [colors, setColors] = useState<Color[]>([
    { id: 1, name: "Black", hexCode: "#000000", productsCount: 156, createdAt: "2024-01-15", status: "active" },
    { id: 2, name: "White", hexCode: "#FFFFFF", productsCount: 134, createdAt: "2024-01-20", status: "active" },
    { id: 3, name: "Blue", hexCode: "#0066FF", productsCount: 89, createdAt: "2024-02-05", status: "active" },
    { id: 4, name: "Red", hexCode: "#FF0000", productsCount: 67, createdAt: "2024-02-10", status: "active" },
    { id: 5, name: "Green", hexCode: "#00CC66", productsCount: 45, createdAt: "2024-02-15", status: "active" },
    { id: 6, name: "Yellow", hexCode: "#FFCC00", productsCount: 38, createdAt: "2024-02-20", status: "inactive" },
    { id: 7, name: "Purple", hexCode: "#9933FF", productsCount: 52, createdAt: "2024-02-25", status: "active" },
    { id: 8, name: "Pink", hexCode: "#FF66CC", productsCount: 41, createdAt: "2024-03-01", status: "active" },
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingColor, setEditingColor] = useState<Color | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    hexCode: "#000000",
  });

  const filteredColors = colors.filter((color) =>
    color.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    color.hexCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddColor = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter a color name");
      return;
    }

    if (!/^#[0-9A-F]{6}$/i.test(formData.hexCode)) {
      toast.error("Please enter a valid hex color code");
      return;
    }

    const newColor: Color = {
      id: colors.length + 1,
      name: formData.name,
      hexCode: formData.hexCode.toUpperCase(),
      productsCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
      status: "active",
    };

    setColors([...colors, newColor]);
    setFormData({ name: "", hexCode: "#000000" });
    setShowAddDialog(false);
    toast.success("Color added successfully!");
  };

  const handleEditColor = () => {
    if (!editingColor || !formData.name.trim()) {
      toast.error("Please enter a color name");
      return;
    }

    if (!/^#[0-9A-F]{6}$/i.test(formData.hexCode)) {
      toast.error("Please enter a valid hex color code");
      return;
    }

    setColors(
      colors.map((color) =>
        color.id === editingColor.id
          ? { ...color, name: formData.name, hexCode: formData.hexCode.toUpperCase() }
          : color
      )
    );

    setEditingColor(null);
    setFormData({ name: "", hexCode: "#000000" });
    toast.success("Color updated successfully!");
  };

  const handleDeleteColor = (id: number) => {
    setColors(colors.filter((color) => color.id !== id));
    toast.success("Color deleted successfully!");
  };

  const toggleStatus = (id: number) => {
    setColors(
      colors.map((color) =>
        color.id === id
          ? { ...color, status: color.status === "active" ? "inactive" : "active" }
          : color
      )
    );
  };

  const openEditDialog = (color: Color) => {
    setEditingColor(color);
    setFormData({ name: color.name, hexCode: color.hexCode });
  };

  const closeDialog = () => {
    setShowAddDialog(false);
    setEditingColor(null);
    setFormData({ name: "", hexCode: "#000000" });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-border-light/50 dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <div className="px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-text-main-light dark:text-text-main-dark tracking-tight">
                Color Management
              </h1>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
                Manage all product colors available on your platform
              </p>
            </div>
            <button
              onClick={() => setShowAddDialog(true)}
              className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold px-6 py-3 rounded-full shadow-lg shadow-primary/30 transition-all hover:scale-[1.02]"
            >
              <span className="material-symbols-outlined">add</span>
              Add Color
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
                placeholder="Search colors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-main-light dark:text-text-main-dark placeholder-text-secondary-light/60 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
              />
            </div>
          </div>
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-card border border-border-light/50 dark:border-border-dark">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-xl">palette</span>
              </div>
              <h3 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">
                {colors.length}
              </h3>
            </div>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark font-medium">
              Total Colors
            </p>
          </div>
        </div>

        {/* Colors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredColors.map((color) => (
            <div
              key={color.id}
              className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-card border border-border-light/50 dark:border-border-dark hover:shadow-hover transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="size-16 rounded-2xl shadow-sm border-2 border-border-light dark:border-border-dark group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: color.hexCode }}
                  ></div>
                  <div>
                    <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">
                      {color.name}
                    </h3>
                    <p className="text-xs font-mono text-text-secondary-light dark:text-text-secondary-dark">
                      {color.hexCode}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleStatus(color.id)}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    color.status === "active"
                      ? "bg-green-500/10 text-green-500"
                      : "bg-gray-500/10 text-gray-500"
                  }`}
                >
                  {color.status}
                </button>
              </div>

              <div className="flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">
                <span className="material-symbols-outlined text-base">inventory_2</span>
                <span>{color.productsCount} products</span>
              </div>

              <div className="flex gap-2 pt-4 border-t border-border-light dark:border-border-dark">
                <button
                  onClick={() => openEditDialog(color)}
                  className="flex-1 px-3 py-2 rounded-lg bg-background-light dark:bg-background-dark hover:bg-primary/10 dark:hover:bg-primary/20 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-all text-sm font-bold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteColor(color.id)}
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
      <Dialog open={showAddDialog || !!editingColor} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="bg-surface-light dark:bg-surface-dark border-border-light/50 dark:border-border-dark sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-text-main-light dark:text-text-main-dark">
              {editingColor ? "Edit Color" : "Add New Color"}
            </DialogTitle>
            <DialogDescription className="text-text-secondary-light dark:text-text-secondary-dark">
              {editingColor ? "Update the color information below." : "Add a new color to your platform."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-text-main-light dark:text-text-main-dark ml-1">
                Color Name
              </label>
              <input
                type="text"
                placeholder="e.g. Black, Navy Blue"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light/30 dark:bg-background-dark text-text-main-light dark:text-text-main-dark placeholder-text-secondary-light/60 px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-text-main-light dark:text-text-main-dark ml-1">
                Color Code
              </label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="#000000"
                    value={formData.hexCode}
                    onChange={(e) => setFormData({ ...formData, hexCode: e.target.value })}
                    className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light/30 dark:bg-background-dark text-text-main-light dark:text-text-main-dark placeholder-text-secondary-light/60 px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm font-mono"
                    maxLength={7}
                  />
                </div>
                <div className="relative">
                  <input
                    type="color"
                    value={formData.hexCode}
                    onChange={(e) => setFormData({ ...formData, hexCode: e.target.value })}
                    className="w-16 h-full rounded-xl border border-border-light dark:border-border-dark cursor-pointer"
                  />
                </div>
              </div>
              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark ml-1">
                Enter hex code or use color picker
              </p>
            </div>

            {/* Color Preview */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-text-main-light dark:text-text-main-dark ml-1">
                Preview
              </label>
              <div className="flex items-center gap-4 p-6 rounded-xl bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark">
                <div
                  className="size-20 rounded-2xl shadow-lg border-2 border-border-light dark:border-border-dark"
                  style={{ backgroundColor: formData.hexCode }}
                ></div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-1">
                    {formData.name || "Color Name"}
                  </h4>
                  <p className="text-sm font-mono text-text-secondary-light dark:text-text-secondary-dark">
                    {formData.hexCode}
                  </p>
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
              onClick={editingColor ? handleEditColor : handleAddColor}
              className="flex-1 px-4 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold shadow-lg shadow-primary/30 transition-all"
            >
              {editingColor ? "Update" : "Add Color"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

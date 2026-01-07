"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

interface Variant {
  color: string;
  price: number;
  stock: number;
}

interface FormErrors {
  title?: string;
  category?: string;
  brand?: string;
  model?: string;
  images?: string;
  contact?: string;
  variants?: string;
}

export default function SellPage() {
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("cameras");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [condition, setCondition] = useState("like-new");
  const [specs, setSpecs] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [openToExchange, setOpenToExchange] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [variants, setVariants] = useState<Variant[]>([
    { color: "black", price: 1200, stock: 2 },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-save to localStorage
  useEffect(() => {
    const draft = {
      title,
      selectedCategory,
      brand,
      model,
      condition,
      specs,
      description,
      contact,
      openToExchange,
      variants,
    };
    localStorage.setItem("sell-draft", JSON.stringify(draft));
  }, [
    title,
    selectedCategory,
    brand,
    model,
    condition,
    specs,
    description,
    contact,
    openToExchange,
    variants,
  ]);

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem("sell-draft");
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        setTitle(parsed.title || "");
        setSelectedCategory(parsed.selectedCategory || "cameras");
        setBrand(parsed.brand || "");
        setModel(parsed.model || "");
        setCondition(parsed.condition || "like-new");
        setSpecs(parsed.specs || "");
        setDescription(parsed.description || "");
        setContact(parsed.contact || "");
        setOpenToExchange(parsed.openToExchange || false);
        setVariants(
          parsed.variants || [{ color: "black", price: 1200, stock: 2 }]
        );
      } catch (e) {
        console.error("Failed to load draft:", e);
      }
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.length < 10) {
      newErrors.title = "Title must be at least 10 characters";
    }

    if (!selectedCategory) {
      newErrors.category = "Please select a category";
    }

    if (!brand) {
      newErrors.brand = "Brand is required";
    }

    if (!model) {
      newErrors.model = "Model is required";
    }

    if (images.length === 0) {
      newErrors.images = "At least one photo is required";
    }

    const formattedContact = formatContactNumber(contact);
    setContact(formattedContact);

    if (!formattedContact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (!/^\+94 \d{3} \d{3} \d{3}$/.test(formattedContact)) {
      newErrors.contact = "Please enter a valid phone number";
    }

    if (variants.length === 0) {
      newErrors.variants = "At least one variant is required";
    } else {
      const hasValidVariant = variants.some(
        (v) => v.price > 0 && v.stock >= 0
      );
      if (!hasValidVariant) {
        newErrors.variants = "At least one variant must have a valid price and stock";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatContactNumber = (number: string): string => {
    const cleaned = number.replace(/\s+/g, "").replace(/^\+?94/, "94");
    return `+94 ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear draft
      localStorage.removeItem("sell-draft");

      toast.success("Item listed successfully!", {
        description: "Your listing is now live and visible to buyers.",
      });

      // Reset form
      setTitle("");
      setSelectedCategory("cameras");
      setBrand("");
      setModel("");
      setCondition("like-new");
      setSpecs("");
      setDescription("");
      setContact("");
      setOpenToExchange(false);
      setImages([]);
      setImagePreviews([]);
      setVariants([{ color: "black", price: 0, stock: 0 }]);
      setErrors({});
    } catch (error) {
      toast.error("Failed to list item", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    const validFiles = newFiles.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`Invalid file type: ${file.name}`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error(`File too large: ${file.name} (max 5MB)`);
        return false;
      }
      return true;
    });

    if (images.length + validFiles.length > 10) {
      toast.error("Maximum 10 images allowed");
      return;
    }

    setImages((prev) => [...prev, ...validFiles]);

    // Create previews
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreviews((prev) => [...prev, result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newImages = [...images];
    const newPreviews = [...imagePreviews];

    const [draggedImage] = newImages.splice(draggedIndex, 1);
    const [draggedPreview] = newPreviews.splice(draggedIndex, 1);

    newImages.splice(dropIndex, 0, draggedImage);
    newPreviews.splice(dropIndex, 0, draggedPreview);

    setImages(newImages);
    setImagePreviews(newPreviews);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const categories = [
    { id: "cameras", icon: "photo_camera", label: "Cameras" },
    { id: "mobile", icon: "smartphone", label: "Mobile" },
    { id: "fashion", icon: "checkroom", label: "Fashion" },
    { id: "computers", icon: "computer", label: "Computers" },
    { id: "sports", icon: "sports_soccer", label: "Sports" },
  ];

  const conditions = ["New", "Like New", "Good", "Fair", "Has given it all"];

  const addVariant = () => {
    setVariants([...variants, { color: "black", price: 0, stock: 0 }]);
  };

  const updateVariant = (index: number, field: keyof Variant, value: string | number) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setVariants(newVariants);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    let cleaned = input.replace(/\D+/g, ""); // Remove non-digits

    if (cleaned.startsWith("0")) {
      cleaned = cleaned.slice(1); // Remove leading 0
    }

    const formatted = `+94 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 9)}`.trim();
    setContact(formatted);
  };

  return (
    <main className="grow w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-10 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text-main-light dark:text-text-main-dark tracking-tight mb-3">
          What are you selling?
        </h1>
        <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg leading-relaxed">
          Create a listing in seconds. Good photos and a clear title help you sell
          faster.
        </p>
      </div>

      <form className="flex flex-col gap-6 md:gap-8" onSubmit={handleSubmit}>
        {/* Section 1: Item Information */}
        <section className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 md:p-8 shadow-card border border-border-light/50 dark:border-border-dark">
          <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-6 flex items-center gap-2">
            <span className="bg-primary-light text-primary rounded-full w-8 h-8 flex items-center justify-center text-sm">
              1
            </span>
            Item Information
          </h2>

          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-bold text-text-main-light dark:text-text-main-dark ml-1"
                htmlFor="title"
              >
                Title
              </label>
              <div className="relative">
                <input
                  className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light/30 dark:bg-background-dark text-text-main-light dark:text-text-main-dark placeholder-text-secondary-light/60 px-4 py-3.5 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm text-base"
                  id="title"
                  placeholder="What are you selling? (e.g. iPhone 12 Pro Max 128GB)"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={50}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-text-secondary-light font-medium bg-surface-light dark:bg-surface-dark px-1 rounded">
                  {title.length}/50
                </span>
              </div>
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold text-text-main-light dark:text-text-main-dark ml-1">
                Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`group flex flex-col items-center justify-center gap-3 h-28 rounded-xl transition-all shadow-sm ${
                      selectedCategory === category.id
                        ? "border-2 border-primary bg-primary-light/30 text-primary"
                        : "border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark hover:bg-background-light dark:hover:bg-white/5 text-text-secondary-light dark:text-text-secondary-dark hover:border-primary/50 hover:text-primary"
                    }`}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </span>
                    <span
                      className={`text-xs ${
                        selectedCategory === category.id ? "font-bold" : "font-medium"
                      }`}
                    >
                      {category.label}
                    </span>
                  </button>
                ))}
                <button
                  className="group flex flex-col items-center justify-center gap-3 h-28 rounded-xl border border-dashed border-border-light dark:border-border-dark bg-background-light/50 dark:bg-surface-dark text-text-secondary-light hover:border-text-secondary-light hover:text-text-main-light transition-all"
                  type="button"
                >
                  <span className="material-symbols-outlined text-3xl">grid_view</span>
                  <span className="text-xs font-medium">More</span>
                </button>
              </div>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-bold text-text-main-light dark:text-text-main-dark ml-1"
                  htmlFor="brand"
                >
                  Brand
                </label>
                <div className="relative">
                  <select
                    className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light/30 dark:bg-background-dark text-text-main-light dark:text-text-main-dark px-4 py-3.5 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm text-base appearance-none cursor-pointer"
                    id="brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  >
                    <option value="">Select Brand</option>
                    <option value="apple">Apple</option>
                    <option value="samsung">Samsung</option>
                    <option value="nike">Nike</option>
                    <option value="sony">Sony</option>
                    <option value="canon">Canon</option>
                    <option value="add_new" className="font-bold text-primary">
                      + Add New Brand
                    </option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-text-secondary-light">
                    <span className="material-symbols-outlined">expand_more</span>
                  </div>
                </div>
                {errors.brand && (
                  <p className="text-red-500 text-xs mt-1">{errors.brand}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-bold text-text-main-light dark:text-text-main-dark ml-1"
                  htmlFor="model"
                >
                  Model
                </label>
                <div className="relative">
                  <select
                    className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light/30 dark:bg-background-dark text-text-main-light dark:text-text-main-dark px-4 py-3.5 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm text-base appearance-none cursor-pointer"
                    id="model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  >
                    <option value="">Select Model</option>
                    <option value="iphone13">iPhone 13</option>
                    <option value="galaxy_s21">Galaxy S21</option>
                    <option value="air_max">Air Max</option>
                    <option value="ps5">PlayStation 5</option>
                    <option value="eos_r5">EOS R5</option>
                    <option value="add_new" className="font-bold text-primary">
                      + Add New Model
                    </option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-text-secondary-light">
                    <span className="material-symbols-outlined">expand_more</span>
                  </div>
                </div>
                {errors.model && (
                  <p className="text-red-500 text-xs mt-1">{errors.model}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Photos */}
        <section className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 md:p-8 shadow-card border border-border-light/50 dark:border-border-dark">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark flex items-center gap-2">
              <span className="bg-primary-light text-primary rounded-full w-8 h-8 flex items-center justify-center text-sm">
                2
              </span>
              Photos
            </h2>
            <span className="text-xs font-bold px-2 py-1 bg-background-light dark:bg-background-dark rounded text-text-secondary-light">
              {images.length}/10 added
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <div className="col-span-1 aspect-square relative group cursor-pointer">
              <input
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                multiple
                type="file"
                ref={fileInputRef}
                onChange={(e) => handleImageUpload(e.target.files)}
              />
              <div className="w-full h-full border-2 border-dashed border-primary/40 group-hover:border-primary rounded-xl flex flex-col items-center justify-center bg-primary-light/10 group-hover:bg-primary-light/30 transition-all duration-200">
                <div className="bg-surface-light dark:bg-surface-dark p-2.5 rounded-full mb-2 shadow-sm group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary text-2xl">
                    add_a_photo
                  </span>
                </div>
                <span className="text-xs font-bold text-primary">Add photos</span>
              </div>
            </div>

            {imagePreviews.map((img, idx) => (
              <div
                key={idx}
                className="aspect-square relative rounded-xl overflow-hidden group shadow-sm border border-border-light dark:border-border-dark"
                draggable
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, idx)}
                onDragEnd={handleDragEnd}
              >
                <Image
                  alt="Preview"
                  className="w-full h-full object-cover"
                  src={img}
                  height={144.8}
                  width={144.8}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                <button
                  type="button"
                  className="absolute top-1.5 right-1.5 bg-surface-light text-red-500 hover:text-red-600 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-sm transform scale-90 hover:scale-100"
                  onClick={() => removeImage(idx)}
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
                {idx === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-sm py-1 border-t border-border-light dark:border-border-dark">
                    <p className="text-[10px] font-bold text-center uppercase tracking-wider text-text-secondary-light">
                      Main
                    </p>
                  </div>
                )}
              </div>
            ))}

            {Array.from({ length: Math.max(0, 3 - imagePreviews.length) }).map(
              (_, idx) => (
                <div
                  key={`placeholder-${idx}`}
                  className="aspect-square rounded-xl bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark flex items-center justify-center opacity-60"
                >
                  <span className="material-symbols-outlined text-border-light dark:text-border-dark text-3xl">
                    image
                  </span>
                </div>
              )
            )}
          </div>

          <p className="mt-4 text-xs font-medium text-text-secondary-light flex items-center gap-1.5 bg-background-light dark:bg-background-dark w-fit px-3 py-1.5 rounded-lg">
            <span className="material-symbols-outlined text-sm">lightbulb</span>
            Tip: Drag photos to reorder. The first photo is your main image.
          </p>
        </section>

        {/* Section 3: Details */}
        <section className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 md:p-8 shadow-card border border-border-light/50 dark:border-border-dark">
          <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-6 flex items-center gap-2">
            <span className="bg-primary-light text-primary rounded-full w-8 h-8 flex items-center justify-center text-sm">
              3
            </span>
            Details
          </h2>

          <div className="space-y-6">
            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold text-text-main-light dark:text-text-main-dark ml-1">
                Condition
              </label>
              <div className="flex flex-wrap gap-2">
                {conditions.map((cond) => (
                  <label key={cond} className="cursor-pointer group">
                    <input
                      className="peer sr-only"
                      name="condition"
                      type="radio"
                      value={cond.toLowerCase().replace(/\s+/g, "-")}
                      checked={condition === cond.toLowerCase().replace(/\s+/g, "-")}
                      onChange={(e) => setCondition(e.target.value)}
                    />
                    <span className="block px-4 py-2 rounded-full border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-secondary-light dark:text-text-secondary-dark text-sm font-semibold peer-checked:bg-text-main-light peer-checked:text-white peer-checked:border-text-main-light peer-checked:dark:bg-white peer-checked:dark:text-black hover:border-text-secondary-light transition-all select-none">
                      {cond}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-bold text-text-main-light dark:text-text-main-dark ml-1"
                htmlFor="specs"
              >
                Specifications
              </label>
              <div className="relative">
                <input
                  className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light/30 dark:bg-background-dark text-text-main-light dark:text-text-main-dark placeholder-text-secondary-light/60 px-4 py-3.5 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm text-base"
                  id="specs"
                  placeholder="e.g. 8GB RAM, 256GB Storage, Size 42..."
                  type="text"
                  value={specs}
                  onChange={(e) => setSpecs(e.target.value)}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-text-secondary-light font-medium bg-surface-light dark:bg-surface-dark px-1 rounded">
                  Variant Details
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-bold text-text-main-light dark:text-text-main-dark ml-1"
                htmlFor="description"
              >
                Description
              </label>
              <div className="relative">
                <textarea
                  className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light/30 dark:bg-background-dark text-text-main-light dark:text-text-main-dark placeholder-text-secondary-light/60 px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-y min-h-35 text-sm leading-relaxed"
                  id="description"
                  placeholder="Describe the item's condition, features, and any defects. Be honest to avoid issues later."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Variants & Availability */}
        <section className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 md:p-8 shadow-card border border-border-light/50 dark:border-border-dark">
          <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-6 flex items-center gap-2">
            <span className="bg-primary-light text-primary rounded-full w-8 h-8 flex items-center justify-center text-sm">
              4
            </span>
            Variants &amp; Availability
          </h2>

          <div className="space-y-8">
            <div className="flex flex-col gap-4">
              <label className="text-sm font-bold text-text-main-light dark:text-text-main-dark ml-1">
                Product Variants
              </label>
              <p className="text-xs text-text-secondary-light -mt-3 ml-1">
                Define different price and stock levels for each color option.
              </p>

              <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden shadow-sm">
                <div className="grid grid-cols-12 gap-2 sm:gap-4 px-4 py-3 bg-background-light dark:bg-white/5 border-b border-border-light dark:border-border-dark text-[10px] sm:text-xs font-bold text-text-secondary-light uppercase tracking-wider">
                  <div className="col-span-5 md:col-span-4">Color</div>
                  <div className="col-span-3 md:col-span-3">Price (LKR)</div>
                  <div className="col-span-3 md:col-span-3">Stock</div>
                  <div className="col-span-1 md:col-span-2"></div>
                </div>

                {variants.map((variant, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-12 gap-2 sm:gap-4 px-4 py-3 items-center border-b border-border-light dark:border-border-dark last:border-0"
                  >
                    <div className="col-span-5 md:col-span-4 flex items-center gap-2 sm:gap-3">
                      <div
                        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-border-light dark:border-border-dark shadow-sm shrink-0`}
                        style={{ backgroundColor: variant.color }}
                      ></div>
                      <div className="relative w-full">
                        <select
                          className="w-full bg-transparent font-medium text-text-main-light dark:text-text-main-dark border-none focus:ring-0 p-0 text-xs sm:text-sm cursor-pointer truncate pr-4"
                          value={variant.color}
                          onChange={(e) => updateVariant(idx, "color", e.target.value)}
                        >
                          <option value="black">Black</option>
                          <option value="white">White</option>
                          <option value="blue">Blue</option>
                          <option value="red">Red</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none text-text-secondary-light">
                          <span className="material-symbols-outlined text-sm">expand_more</span>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-3 md:col-span-3 relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-text-secondary-light text-xs">LKR</span>
                      <input
                        className="w-full bg-background-light/50 dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg pl-10 pr-2 py-1.5 text-xs sm:text-sm font-bold text-text-main-light focus:ring-1 focus:ring-primary focus:border-primary placeholder-text-secondary-light/50"
                        type="number"
                        value={variant.price}
                        onChange={(e) => updateVariant(idx, "price", Number(e.target.value))}
                      />
                    </div>

                    <div className="col-span-3 md:col-span-3">
                      <input
                        className="w-full bg-background-light/50 dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-text-main-light focus:ring-1 focus:ring-primary focus:border-primary"
                        type="number"
                        value={variant.stock}
                        onChange={(e) => updateVariant(idx, "stock", Number(e.target.value))}
                      />
                    </div>

                    <div className="col-span-1 md:col-span-2 flex justify-end">
                      <button
                        type="button"
                        className="text-text-secondary-light hover:text-red-500 transition-colors p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg group"
                        title="Remove variant"
                        onClick={() => removeVariant(idx)}
                      >
                        <span className="material-symbols-outlined text-lg sm:text-xl group-hover:scale-110 transition-transform">
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                ))}

                <div onClick={addVariant} className="px-4 py-3 bg-background-light/30 dark:bg-white/5 hover:bg-background-light/60 transition-colors cursor-pointer border-t border-border-light dark:border-border-dark">
                  <div
                    className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover transition-colors w-full cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">
                      add_circle
                    </span>
                    Add another color variant
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="w-full">
                <label
                  className="text-sm font-bold text-text-main-light dark:text-text-main-dark ml-1 mb-2 block"
                  htmlFor="contact"
                >
                  Contact Number
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary-light">
                    <span className="material-symbols-outlined">call</span>
                  </div>
                  <input
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-background-light/30 dark:bg-background-dark text-text-main-light dark:text-text-main-dark text-base font-medium placeholder-text-secondary-light/30 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
                    id="contact"
                    placeholder="+94 600 000 000"
                    type="tel"
                    value={contact}
                    onChange={handleContactChange}
                  />
                </div>
                <p className="text-[11px] text-text-secondary-light mt-1.5 ml-1">
                  For buyers to contact you quickly.
                </p>
                {errors.contact && (
                  <p className="text-red-500 text-xs mt-1">{errors.contact}</p>
                )}
              </div>

              <div className="flex items-center h-full pt-1 md:pt-8">
                <label className="inline-flex items-center cursor-pointer group select-none">
                  <div className="relative flex items-center">
                    <input
                      className="peer sr-only"
                      type="checkbox"
                      checked={openToExchange}
                      onChange={(e) => setOpenToExchange(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </div>
                  <span className="ml-3 text-sm font-medium text-text-main-light dark:text-text-main-dark group-hover:text-primary transition-colors">
                    Open to exchanges
                  </span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="sticky bottom-4 z-40 bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-border-light/50 dark:border-border-dark flex items-center justify-between gap-4 mt-4 transition-all">
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-bold text-text-main-light dark:text-text-main-dark">
              Almost done!
            </span>
            <span className="text-xs text-text-secondary-light">
              Review your listing before publishing.
            </span>
          </div>
          <button
            className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white text-base font-bold py-3.5 px-12 rounded-full shadow-lg shadow-primary/30 transform transition-all hover:scale-[1.02] active:scale-[0.98]"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Listing..." : "List Item"}
          </button>
        </div>
      </form>
    </main>
  );
}

"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { addProduct, getAllBrands, getModelsByBrand, getAllCategories, getAllConditions } from "@/app/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/client/ui/dialog";

interface FormErrors {
  productName?: string;
  category?: string;
  brand?: string;
  model?: string;
  basePrice?: string;
  images?: string;
  contact?: string;
}

interface Brand {
  id: number;
  name: string;
}

interface Model {
  id: number;
  name: string;
  brandId: number;
}

interface Category {
  id: number;
  name: string;
  icon?: string;
}

interface Condition {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export default function SellPage() {
  const [productName, setProductName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [condition, setCondition] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [statusId] = useState(1); // Auto-set to active
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // API data
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Auto-save to localStorage
  useEffect(() => {
    const draft = {
      productName,
      selectedCategory,
      brand,
      model,
      condition,
      basePrice,
      description,
      contact,
    };
    localStorage.setItem("sell-draft", JSON.stringify(draft));
  }, [
    productName,
    selectedCategory,
    brand,
    model,
    condition,
    basePrice,
    description,
    contact,
  ]);

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem("sell-draft");
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        setProductName(parsed.productName || "");
        setSelectedCategory(parsed.selectedCategory || "");
        setBrand(parsed.brand || "");
        setModel(parsed.model || "");
        setCondition(parsed.condition || "");
        setBasePrice(parsed.basePrice || "");
        setDescription(parsed.description || "");
        setContact(parsed.contact || "");
      } catch (e) {
        console.error("Failed to load draft:", e);
      }
    }
  }, []);

  // Fetch brands, categories, and conditions on mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      try {
        const [brandsResult, categoriesResult, conditionsResult] = await Promise.all([
          getAllBrands(),
          getAllCategories(),
          getAllConditions(),
        ]);

        if (brandsResult.status && brandsResult.data) {
          setBrands(brandsResult.data as Brand[]);
        }
        if (categoriesResult.status && categoriesResult.data) {
          setCategories(categoriesResult.data as Category[]);
        }
        if (conditionsResult.status && conditionsResult.data) {
          setConditions(conditionsResult.data as Condition[]);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load form data", {
          description: "Some options may not be available.",
        });
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchData();
  }, []);

  // Fetch models when brand is selected
  useEffect(() => {
    const fetchModels = async () => {
      if (!brand) {
        setModels([]);
        return;
      }

      try {
        const modelsResult = await getModelsByBrand(parseInt(brand));
        if (modelsResult.status && modelsResult.data) {
          setModels(modelsResult.data as Model[]);
        } else {
          setModels([]);
          toast.error("Failed to load models", {
            description: modelsResult.message || "Please try again.",
          });
        }
      } catch (error) {
        console.error("Failed to fetch models:", error);
        setModels([]);
        toast.error("Failed to load models");
      }
    };

    fetchModels();
  }, [brand]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!productName.trim()) {
      newErrors.productName = "Product Name is required";
    } else if (productName.length < 10) {
      newErrors.productName = "Product Name must be at least 10 characters";
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

    const price = parseFloat(basePrice);
    if (!basePrice.trim()) {
      newErrors.basePrice = "Price is required";
    } else if (isNaN(price) || price <= 0) {
      newErrors.basePrice = "Please enter a valid price";
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
      // Format contact number (remove spaces and +94 prefix)
      const formattedContact = contact.replace(/\s+/g, "").replace(/^\+94/, "0");

      // Call the API
      const result = await addProduct(
        productName,
        parseFloat(basePrice),
        description,
        formattedContact,
        parseInt(model) || 1,
        parseInt(condition) || 1,
        parseInt(selectedCategory) || 1,
        1, // sellerId - auto-selected
        statusId
      );

      if (result.status) {
        // Clear draft
        localStorage.removeItem("sell-draft");

        toast.success("Item listed successfully!", {
          description: result.message || "Your listing is now live and visible to buyers.",
        });

        // Reset form
        setProductName("");
        setSelectedCategory(categories.length > 0 ? categories[0].id.toString() : "");
        setBrand("");
        setModel("");
        setCondition(conditions.length > 0 ? conditions[0].id.toString() : "");
        setBasePrice("");
        setDescription("");
        setContact("");
        setImages([]);
        setImagePreviews([]);
        setErrors({});
      } else {
        toast.error("Failed to list item", {
          description: result.message || "Please try again later.",
        });
      }
    } catch (error) {
      toast.error("Failed to list item", {
        description: error instanceof Error ? error.message : "An unexpected error occurred",
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



  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // Remove all non-digits first
    let cleaned = input.replace(/\D+/g, "");

    // Remove leading 94 if present (country code)
    if (cleaned.startsWith("94")) {
      cleaned = cleaned.slice(2);
    }

    // Remove leading 0 if present
    if (cleaned.startsWith("0")) {
      cleaned = cleaned.slice(1);
    }

    // Format with +94 prefix and spacing
    const formatted = `+94 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 9)}`.trim();
    setContact(formatted);
  };

  const getSelectedCategoryName = () => {
    const category = categories.find(c => c.id.toString() === selectedCategory);
    return category?.name || "Category";
  };

  const getSelectedBrandName = () => {
    const brandObj = brands.find(b => b.id.toString() === brand);
    return brandObj?.name || "Brand";
  };

  const getSelectedModelName = () => {
    const modelObj = models.find(m => m.id.toString() === model);
    return modelObj?.name || "Model";
  };

  const getSelectedConditionName = () => {
    const conditionObj = conditions.find(c => c.id.toString() === condition);
    return conditionObj?.name || "Not specified";
  };

  return (
    <main className="px-6 lg:px-8 py-8">
      <div className="mb-10 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text-main-light dark:text-text-main-dark tracking-tight mb-3">
          What are you selling?
        </h1>
        <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg leading-relaxed">
          Create a listing in seconds. Good photos and a clear title help you sell
          faster.
        </p>
        {/* Overall tip */}
        <div className="mt-4 flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <span className="material-symbols-outlined text-blue-500 text-xl mt-0.5">lightbulb</span>
          <div>
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">
              Pro Tip: Listings with clear photos and detailed descriptions get 3x more views!
            </p>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
              Take a few minutes to make your listing stand out.
            </p>
          </div>
        </div>
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
                htmlFor="productName"
              >
                Product Name
              </label>
              <div className="relative">
                <input
                  className="w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light/30 dark:bg-background-dark text-text-main-light dark:text-text-main-dark placeholder-text-secondary-light/60 px-4 py-3.5 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm text-base"
                  id="productName"
                  placeholder="What are you selling? (e.g. iPhone 12 Pro Max 128GB)"
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  maxLength={50}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-text-secondary-light font-medium bg-surface-light dark:bg-surface-dark px-1 rounded">
                  {productName.length}/50
                </span>
              </div>
              {errors.productName && (
                <p className="text-red-500 text-xs mt-1">{errors.productName}</p>
              )}
              <div className="flex items-center gap-2 text-xs text-text-secondary-light">
                <span className="material-symbols-outlined text-sm text-green-500">check_circle</span>
                <span>Include brand, model, and key features for better visibility</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold text-text-main-light dark:text-text-main-dark ml-1">
                Category
              </label>
              {isLoadingData ? (
                <div className="flex items-center justify-center py-8 text-text-secondary-light">
                  <span className="text-sm">Loading categories...</span>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className={`group flex flex-col items-center justify-center gap-3 h-28 rounded-xl transition-all shadow-sm ${selectedCategory === category.id.toString()
                          ? "border-2 border-primary bg-primary-light/30 text-primary"
                          : "border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark hover:bg-background-light dark:hover:bg-white/5 text-text-secondary-light dark:text-text-secondary-dark hover:border-primary/50 hover:text-primary"
                        }`}
                      type="button"
                      onClick={() => setSelectedCategory(category.id.toString())}
                    >
                      <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform duration-300">
                        {category.icon || "category"}
                      </span>
                      <span
                        className={`text-xs ${selectedCategory === category.id.toString() ? "font-bold" : "font-medium"
                          }`}
                      >
                        {category.name}
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
              )}
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
                    onChange={(e) => {
                      setBrand(e.target.value);
                      setModel(""); // Reset model when brand changes
                    }}
                    disabled={isLoadingData}
                  >
                    <option value="">{isLoadingData ? "Loading..." : "Select Brand"}</option>
                    {brands.map((b) => (
                      <option key={b.id} value={b.id.toString()}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-text-secondary-light">
                    <span className="material-symbols-outlined text-lg">expand_more</span>
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
                    disabled={!brand}
                  >
                    <option value="">
                      {!brand ? "Select a brand first" : "Select Model"}
                    </option>
                    {models.map((m) => (
                      <option key={m.id} value={m.id.toString()}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-text-secondary-light">
                    <span className="material-symbols-outlined text-lg">expand_more</span>
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

          <div className="mt-4 space-y-2">
            <p className="text-xs font-medium text-text-secondary-light flex items-center gap-1.5 bg-background-light dark:bg-background-dark w-fit px-3 py-1.5 rounded-lg">
              <span className="material-symbols-outlined text-sm">lightbulb</span>
              Drag photos to reorder. The first photo is your main image.
            </p>
            <div className="flex items-start gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <span className="material-symbols-outlined text-green-500 text-base mt-0.5">photo_camera</span>
              <div className="text-xs text-green-600 dark:text-green-400">
                <span className="font-semibold">Good photos sell faster!</span>
                <ul className="mt-1 space-y-0.5 text-text-secondary-light dark:text-text-secondary-dark">
                  <li>• Use natural lighting</li>
                  <li>• Show all angles and any defects</li>
                  <li>• Clean background works best</li>
                </ul>
              </div>
            </div>
          </div>
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
              {isLoadingData ? (
                <div className="flex items-center justify-center py-4 text-text-secondary-light">
                  <span className="text-sm">Loading conditions...</span>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {conditions.map((cond) => (
                    <label key={cond.id} className="cursor-pointer group">
                      <input
                        className="peer sr-only"
                        name="condition"
                        type="radio"
                        value={cond.id.toString()}
                        checked={condition === cond.id.toString()}
                        onChange={(e) => setCondition(e.target.value)}
                      />
                      <span className="block px-4 py-2 rounded-full border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-secondary-light dark:text-text-secondary-dark text-sm font-semibold peer-checked:bg-text-main-light peer-checked:text-white peer-checked:border-text-main-light peer-checked:dark:bg-white peer-checked:dark:text-black hover:border-text-secondary-light transition-all select-none">
                        {cond.name}
                      </span>
                    </label>
                  ))}
                </div>
              )}
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
              <div className="flex items-center gap-2 text-xs text-text-secondary-light">
                <span className="material-symbols-outlined text-sm text-blue-500">article</span>
                <span>Detailed descriptions build buyer trust and reduce questions</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Pricing & Contact */}
        <section className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 md:p-8 shadow-card border border-border-light/50 dark:border-border-dark">
          <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-6 flex items-center gap-2">
            <span className="bg-primary-light text-primary rounded-full w-8 h-8 flex items-center justify-center text-sm">
              4
            </span>
            Pricing &amp; Contact
          </h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-bold text-text-main-light dark:text-text-main-dark ml-1"
                  htmlFor="basePrice"
                >
                  Price (LKR)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary-light font-medium">
                    Rs.
                  </span>
                  <input
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border-light dark:border-border-dark bg-background-light/30 dark:bg-background-dark text-text-main-light dark:text-text-main-dark placeholder-text-secondary-light/60 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm text-base"
                    id="basePrice"
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    min="0"
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                  />
                </div>
                {errors.basePrice && (
                  <p className="text-red-500 text-xs mt-1">{errors.basePrice}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-bold text-text-main-light dark:text-text-main-dark ml-1"
                  htmlFor="contact"
                >
                  Contact Number
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary-light">
                    <span className="material-symbols-outlined text-lg">phone</span>
                  </span>
                  <input
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border-light dark:border-border-dark bg-background-light/30 dark:bg-background-dark text-text-main-light dark:text-text-main-dark placeholder-text-secondary-light/60 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm text-base"
                    id="contact"
                    placeholder="+94 600 000 000"
                    type="tel"
                    value={contact}
                    onChange={handleContactChange}
                  />
                </div>
                {errors.contact && (
                  <p className="text-red-500 text-xs mt-1">{errors.contact}</p>
                )}
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
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-surface-light dark:bg-surface-dark border-2 border-primary text-primary hover:bg-primary/5 text-base font-bold py-3.5 px-8 rounded-full shadow-lg transform transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-xl">visibility</span>
              Preview
            </button>
            <button
              className="flex-1 sm:flex-none bg-primary hover:bg-primary-hover text-white text-base font-bold py-3.5 px-12 rounded-full shadow-lg shadow-primary/30 transform transition-all hover:scale-[1.02] active:scale-[0.98]"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Listing..." : "List Item"}
            </button>
          </div>
        </div>
      </form>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">visibility</span>
              Preview - How buyers will see your listing
            </DialogTitle>
            <DialogDescription>
              This is how your product will appear to potential buyers
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Product Preview Card */}
            <div className="bg-background-light dark:bg-background-dark rounded-2xl overflow-hidden border border-border-light/50 dark:border-border-dark">
              {/* Images Section */}
              <div className="relative bg-surface-light dark:bg-surface-dark">
                {imagePreviews.length > 0 ? (
                  <div className="aspect-video relative">
                    <Image
                      src={imagePreviews[0]}
                      alt="Main product"
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="aspect-video flex items-center justify-center bg-background-light dark:bg-background-dark">
                    <div className="text-center">
                      <span className="material-symbols-outlined text-6xl text-text-secondary-light/30 mb-2">
                        image
                      </span>
                      <p className="text-sm text-text-secondary-light">No photos added</p>
                    </div>
                  </div>
                )}
                
                {imagePreviews.length > 1 && (
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto">
                    {imagePreviews.slice(1, 5).map((img, idx) => (
                      <div key={idx} className="shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 border-white/80 shadow-lg">
                        <Image src={img} alt={`Preview ${idx + 2}`} width={64} height={64} className="object-cover w-full h-full" />
                      </div>
                    ))}
                    {imagePreviews.length > 5 && (
                      <div className="shrink-0 w-16 h-16 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center border-2 border-white/80 shadow-lg">
                        <span className="text-white text-xs font-bold">+{imagePreviews.length - 5}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-6 space-y-4">
                {/* Title and Price */}
                <div>
                  <h3 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mb-2">
                    {productName || "Your Product Title"}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-primary">
                      Rs. {basePrice || "0"}
                    </span>
                    {condition && (
                      <span className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-xs font-semibold">
                        {getSelectedConditionName()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-surface-light dark:bg-surface-dark rounded-xl">
                  <div>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-1">Category</p>
                    <p className="font-semibold text-text-main-light dark:text-text-main-dark">
                      {getSelectedCategoryName()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-1">Brand</p>
                    <p className="font-semibold text-text-main-light dark:text-text-main-dark">
                      {getSelectedBrandName()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-1">Model</p>
                    <p className="font-semibold text-text-main-light dark:text-text-main-dark">
                      {getSelectedModelName()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-1">Contact</p>
                    <p className="font-semibold text-text-main-light dark:text-text-main-dark">
                      {contact || "+94 XXX XXX XXX"}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-bold text-text-main-light dark:text-text-main-dark mb-2">Description</h4>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed whitespace-pre-wrap">
                    {description || "No description provided yet. Add details about your product to help buyers make a decision."}
                  </p>
                </div>

                {/* Seller Info */}
                <div className="flex items-center justify-between pt-4 border-t border-border-light/50 dark:border-border-dark">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      JD
                    </div>
                    <div>
                      <p className="font-semibold text-text-main-light dark:text-text-main-dark">John Doe</p>
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Member since 2024</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-primary-hover transition-all">
                    <span className="material-symbols-outlined text-lg">chat</span>
                    Contact Seller
                  </button>
                </div>
              </div>
            </div>

            {/* Preview Notes */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-blue-500 text-xl mt-0.5">info</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">Preview Notes</p>
                  <ul className="text-xs text-text-secondary-light dark:text-text-secondary-dark space-y-1">
                    <li>• This preview shows how your listing will appear to buyers</li>
                    <li>• Make sure all information is accurate before publishing</li>
                    <li>• You can edit your listing anytime after publishing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}

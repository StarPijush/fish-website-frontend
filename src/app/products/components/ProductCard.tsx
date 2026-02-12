"use client";

import { useState } from "react";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";
import type { Fish } from "./ProductsInteractive";

interface ProductCardProps {
  fish: Fish;
  quantity: number;
  updateQuantity: (fishId: string, quantity: number) => void;
}

export default function ProductCard({
  fish,
  quantity,
  updateQuantity,
}: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    if (fish.status === "out_of_stock") return;
    setIsAdding(true);
    updateQuantity(fish.id, quantity + 1);
    setIsAdding(false);
  };

  const handleIncrement = () => {
    if (fish.status !== "out_of_stock") {
      updateQuantity(fish.id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      updateQuantity(fish.id, quantity - 1);
    }
  };

  const getStatusBadge = () => {
    switch (fish.status) {
      case "in_stock":
        return (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-success/10 rounded-full">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-bold text-success">In Stock</span>
          </div>
        );
      case "low_stock":
        return (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-warning/10 rounded-full">
            <Icon
              name="ExclamationTriangleIcon"
              size={14}
              className="text-warning"
            />
            <span className="text-xs font-bold text-warning">Low Stock</span>
          </div>
        );
      case "out_of_stock":
        return (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-error/10 rounded-full">
            <Icon name="XCircleIcon" size={14} className="text-error" />
            <span className="text-xs font-bold text-error">Out of Stock</span>
          </div>
        );
    }
  };

  return (
    <div className="min-w-[300px] w-[300px] shrink-0 snap-center">
      <div
        className={`glass-card rounded-3xl overflow-hidden transition-all duration-500 h-[440px] flex flex-col ${
          fish.status === "out_of_stock"
            ? "opacity-60"
            : "hover:shadow-2xl"
        }`}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <AppImage
             src={fish.image || "/assets/images/no_image.png"}
             alt={fish.alt || fish.name || "Product image"}
             fill
             className={`object-cover transition-all duration-700 ${
                fish.status !== "out_of_stock"
                   ? "grayscale-hover"
                   : "grayscale"
             }`}
          />

          {/* Sustainability Badge */}
          {fish.sustainability && (
            <div className="absolute top-3 left-3 glass px-2.5 py-1.5 rounded-full flex items-center gap-1.5">
              <Icon
                name="CheckBadgeIcon"
                variant="solid"
                size={14}
                className="text-success"
              />
              <span className="text-xs font-bold text-success">
                Sustainable
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Header */}
          <div className="mb-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="text-xl font-heading font-bold text-foreground mb-1 leading-tight">
                  {fish.name}
                </h3>
                <div className="flex items-center gap-1 text-xs text-foreground/60">
                  <Icon name="MapPinIcon" size={12} />
                  <span>{fish.origin}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">
                  ${fish.pricePerKg}
                </p>
                <p className="text-xs text-foreground/60">per kg</p>
              </div>
            </div>

            {getStatusBadge()}
          </div>

          {/* Description */}
          <p className="text-sm text-foreground/70 mb-4 leading-relaxed line-clamp-2">
            {fish.description}
          </p>

          {/* Quantity */}
          <div className="mt-auto">
            {quantity > 0 && (
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-foreground/70">
                  Quantity
                </span>
                <div className="flex items-center gap-3 glass rounded-full px-2 py-1">
                  <button
                    onClick={handleDecrement}
                    className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                  >
                    <Icon name="MinusIcon" size={16} />
                  </button>
                  <span className="text-lg font-bold text-foreground min-w-[24px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    disabled={fish.status === "out_of_stock"}
                    className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center transition-colors disabled:opacity-50"
                  >
                    <Icon name="PlusIcon" size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <Icon name="ShoppingCartIcon" size={20} />
              <span>{isAdding ? "Adding..." : "Add to Cart"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

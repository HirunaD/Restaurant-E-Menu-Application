import { useState, useEffect } from "react";
import { useMenu } from "../../hooks/useMenu";
import type { ModalContentProps } from "../../types";

const ModalContent = ({ item, onClose, onAddToCart }: ModalContentProps) => {
  // Initialize state with default values - these reset on re-mount
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(
    item.customizations?.sizes?.[0]?.name || null,
  );
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Format price to currency
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  // Calculate total price including customizations
  const calculateTotalPrice = (): number => {
    let total = item.price;

    // Add size modifier
    if (selectedSize && item.customizations?.sizes) {
      const size = item.customizations.sizes.find(
        (s) => s.name === selectedSize,
      );
      if (size) total += size.priceModifier;
    }

    // Add add-ons
    if (selectedAddOns.length > 0 && item.customizations?.addOns) {
      selectedAddOns.forEach((addOnName) => {
        const addOn = item.customizations!.addOns!.find(
          (a) => a.name === addOnName,
        );
        if (addOn) total += addOn.price;
      });
    }

    return total * quantity;
  };

  // Get dietary badge color
  const getDietaryColor = (dietary: string): string => {
    const colors: Record<string, string> = {
      vegetarian:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      vegan:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
      "gluten-free":
        "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      "dairy-free":
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      "nut-free":
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      halal: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
      kosher:
        "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
    };
    return (
      colors[dietary.toLowerCase()] ||
      "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
    );
  };

  // Handle add-on toggle
  const toggleAddOn = (addOnName: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnName)
        ? prev.filter((a) => a !== addOnName)
        : [...prev, addOnName],
    );
  };

  // Handle add to cart
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart();
    }
    // Show toast notification
    const toast = document.createElement("div");
    toast.className =
      "fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-[60] animate-fadeIn";
    toast.textContent = `${quantity}x ${item.name} added to cart!`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);

    onClose();
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative bg-white dark:bg-gray-900 
                 w-full sm:w-[90%] sm:max-w-2xl 
                 max-h-[90vh] overflow-y-auto
                 rounded-t-3xl sm:rounded-2xl
                 shadow-2xl animate-slideUp"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 
                 w-10 h-10 rounded-full 
                 bg-white/90 dark:bg-gray-800/90 
                 shadow-lg flex items-center justify-center
                 hover:bg-white dark:hover:bg-gray-700
                 transition-colors"
        aria-label="Close detail view"
      >
        <svg
          className="w-6 h-6 text-gray-600 dark:text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Image */}
      <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-3xl sm:rounded-t-2xl">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />

        {/* Popular badge */}
        {item.popular && (
          <div
            className="absolute top-4 left-4 
                        bg-orange-500 text-white text-sm font-bold 
                        px-3 py-1 rounded-full shadow-md"
          >
            🔥 Popular
          </div>
        )}

        {/* Preparation time */}
        {item.preparationTime && (
          <div
            className="absolute bottom-4 left-4 
                        bg-black/70 text-white text-sm 
                        px-3 py-1 rounded-full flex items-center gap-1.5"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {item.preparationTime} min
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Price */}
        <div className="flex justify-between items-start gap-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {item.name}
          </h2>
          <span className="text-2xl font-bold text-orange-500 whitespace-nowrap">
            {formatPrice(item.price)}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          {item.description}
        </p>

        {/* Dietary badges and Spicy level */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {item.dietary &&
            item.dietary.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 text-sm font-medium rounded-full capitalize ${getDietaryColor(tag)}`}
              >
                {tag}
              </span>
            ))}

          {/* Spicy level */}
          {item.spicyLevel > 0 && (
            <div className="flex items-center gap-1 px-3 py-1 bg-red-100 dark:bg-red-900/30 rounded-full">
              <span className="text-sm font-medium text-red-600 dark:text-red-400">
                Spicy Level:
              </span>
              <span>
                {Array.from({ length: item.spicyLevel }, () => "🌶️").join("")}
              </span>
            </div>
          )}
        </div>

        {/* Customization Options */}
        {item.customizations && (
          <div className="space-y-6 mb-6">
            {/* Size options */}
            {item.customizations.sizes &&
              item.customizations.sizes.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                    Choose Size
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.customizations.sizes.map((size) => (
                      <button
                        key={size.name}
                        onClick={() => setSelectedSize(size.name)}
                        className={`
                        px-4 py-2 rounded-lg font-medium text-sm
                        border-2 transition-all duration-200
                        ${
                          selectedSize === size.name
                            ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                            : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-orange-300"
                        }
                      `}
                      >
                        {size.name}
                        {size.priceModifier !== 0 && (
                          <span className="ml-1 text-xs">
                            ({size.priceModifier >= 0 ? "+" : ""}
                            {formatPrice(size.priceModifier)})
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            {/* Add-ons */}
            {item.customizations.addOns &&
              item.customizations.addOns.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                    Add-ons
                  </h3>
                  <div className="space-y-2">
                    {item.customizations.addOns.map((addOn) => (
                      <label
                        key={addOn.name}
                        className={`
                        flex items-center justify-between p-3 rounded-lg cursor-pointer
                        border-2 transition-all duration-200
                        ${
                          selectedAddOns.includes(addOn.name)
                            ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-orange-300"
                        }
                      `}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedAddOns.includes(addOn.name)}
                            onChange={() => toggleAddOn(addOn.name)}
                            className="w-5 h-5 rounded border-gray-300 text-orange-500 
                                   focus:ring-orange-500 cursor-pointer"
                          />
                          <span className="text-gray-800 dark:text-white font-medium">
                            {addOn.name}
                          </span>
                        </div>
                        <span className="text-orange-500 font-semibold">
                          +{formatPrice(addOn.price)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
          </div>
        )}

        {/* Quantity selector and Add to Cart */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {/* Quantity selector */}
          <div className="flex items-center justify-center gap-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 
                       shadow-sm flex items-center justify-center
                       hover:bg-gray-50 dark:hover:bg-gray-600
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors"
              aria-label="Decrease quantity"
            >
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </button>
            <span className="text-xl font-bold text-gray-800 dark:text-white w-8 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 
                       shadow-sm flex items-center justify-center
                       hover:bg-gray-50 dark:hover:bg-gray-600
                       transition-colors"
              aria-label="Increase quantity"
            >
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>

          {/* Add to Cart button */}
          <button
            onClick={handleAddToCart}
            disabled={!item.available}
            className={`
              flex-1 py-3.5 rounded-lg font-bold text-lg
              flex items-center justify-center gap-3
              transition-all duration-200
              ${
                item.available
                  ? "bg-orange-500 hover:bg-orange-600 text-white active:scale-[0.98]"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>Add to Cart - {formatPrice(calculateTotalPrice())}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const ItemDetailModal = () => {
  const { selectedItem, setSelectedItem, addToCart } = useMenu();

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      }
    };

    if (selectedItem) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedItem, setSelectedItem]);

  if (!selectedItem) return null;

  const handleClose = () => setSelectedItem(null);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 modal-backdrop" />

      {/* Modal content - key forces re-mount when item changes */}
      <ModalContent
        key={selectedItem.id}
        item={selectedItem}
        onClose={handleClose}
        onAddToCart={addToCart}
      />
    </div>
  );
};

export default ItemDetailModal;

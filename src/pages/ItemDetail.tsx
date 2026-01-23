import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMenu } from "../hooks/useMenu";
import type { MenuItem } from "../types";

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { allItems, addToCart, loading: contextLoading } = useMenu();
  
  const [item, setItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const findOrFetchItem = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      // First try to find item in context
      if (allItems.length > 0) {
        const foundItem = allItems.find((item) => item.id === parseInt(id));
        if (foundItem) {
          setItem(foundItem);
          if (foundItem.customizations?.sizes?.length) {
            setSelectedSize(foundItem.customizations.sizes[0].name);
          }
          setLoading(false);
          return;
        }
      }

      // If context is still loading, wait for it
      if (contextLoading) {
        return;
      }

      // If not found and context finished loading, fetch directly
      try {
        const response = await fetch(`http://localhost:3001/menuItems/${id}`);
        if (response.ok) {
          const fetchedItem = await response.json();
          setItem(fetchedItem);
          if (fetchedItem.customizations?.sizes?.length) {
            setSelectedSize(fetchedItem.customizations.sizes[0].name);
          }
        }
      } catch (error) {
        console.error("Failed to fetch item:", error);
      } finally {
        setLoading(false);
      }
    };

    findOrFetchItem();
  }, [id, allItems, contextLoading]);

  if (loading || contextLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Loading item...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Item not found</p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  // Format price to currency
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  // Get dietary badge color based on type
  const getDietaryColor = (dietary: string): string => {
    const colors: Record<string, string> = {
      vegetarian: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      vegan: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
      "gluten-free": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      "dairy-free": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      "nut-free": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      halal: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
      kosher: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
    };
    return colors[dietary.toLowerCase()] || "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
  };

  // Render spicy level indicators
  const renderSpicyLevel = (level: number) => {
    return (
      <div className="flex items-center gap-2">
        <span className="text-gray-600 dark:text-gray-400 text-sm">Spicy Level:</span>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className={`text-lg ${i < level ? "opacity-100" : "opacity-30"}`}
            >
              🌶️
            </span>
          ))}
        </div>
        {level === 0 && <span className="text-sm text-gray-500 dark:text-gray-400">Not spicy</span>}
      </div>
    );
  };

  // Calculate total price
  const calculateTotalPrice = (): number => {
    let total = item.price;
    
    // Add size modifier
    if (selectedSize && item.customizations?.sizes) {
      const size = item.customizations.sizes.find((s) => s.name === selectedSize);
      if (size) total += size.priceModifier;
    }
    
    // Add add-ons
    if (selectedAddOns.length > 0 && item.customizations?.addOns) {
      selectedAddOns.forEach((addOnName) => {
        const addOn = item.customizations?.addOns?.find((a) => a.name === addOnName);
        if (addOn) total += addOn.price;
      });
    }
    
    return total * quantity;
  };

  // Toggle add-on selection
  const toggleAddOn = (addOnName: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnName)
        ? prev.filter((name) => name !== addOnName)
        : [...prev, addOnName]
    );
  };

  // Handle add to cart
  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Add items to cart (quantity times)
    for (let i = 0; i < quantity; i++) {
      addToCart();
    }
    
    // Show success feedback
    setTimeout(() => {
      setIsAdding(false);
      // Show toast
      const toast = document.createElement("div");
      toast.className =
        "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fadeIn flex items-center gap-2";
      toast.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>${quantity}x ${item.name} added to cart!</span>
      `;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Back Button */}
      <div className="sticky top-0 z-10 bg-gray-50/95 dark:bg-gray-950/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Menu</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Popular badge */}
            {item.popular && (
              <div className="absolute top-4 left-4 bg-orange-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-md">
                🔥 Popular
              </div>
            )}
            
            {/* Availability overlay */}
            {!item.available && (
              <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">Currently Unavailable</span>
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="flex flex-col">
            {/* Name and Price */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {item.name}
              </h1>
              <p className="text-2xl md:text-3xl font-bold text-orange-500">
                {formatPrice(item.price)}
              </p>
            </div>

            {/* Full Description */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Description</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Preparation Time */}
            {item.preparationTime && (
              <div className="flex items-center gap-2 mb-6 text-gray-600 dark:text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Preparation time: <strong>{item.preparationTime} minutes</strong></span>
              </div>
            )}

            {/* Dietary Indicators */}
            {item.dietary && item.dietary.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Dietary Information</h2>
                <div className="flex flex-wrap gap-2">
                  {item.dietary.map((diet) => (
                    <span
                      key={diet}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium ${getDietaryColor(diet)}`}
                    >
                      {diet.charAt(0).toUpperCase() + diet.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Spicy Level */}
            <div className="mb-6">
              {renderSpicyLevel(item.spicyLevel)}
            </div>

            {/* Customization Options - Sizes */}
            {item.customizations?.sizes && item.customizations.sizes.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Size</h2>
                <div className="flex flex-wrap gap-3">
                  {item.customizations.sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size.name)}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200
                        ${selectedSize === size.name
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                          : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-orange-300"
                        }`}
                    >
                      {size.name}
                      {size.priceModifier > 0 && (
                        <span className="ml-1 text-sm opacity-75">
                          (+{formatPrice(size.priceModifier)})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Customization Options - Add-ons */}
            {item.customizations?.addOns && item.customizations.addOns.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Add-ons</h2>
                <div className="flex flex-wrap gap-3">
                  {item.customizations.addOns.map((addOn) => (
                    <button
                      key={addOn.name}
                      onClick={() => toggleAddOn(addOn.name)}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200
                        ${selectedAddOns.includes(addOn.name)
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                          : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-orange-300"
                        }`}
                    >
                      {addOn.name}
                      <span className="ml-1 text-sm opacity-75">
                        (+{formatPrice(addOn.price)})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Quantity</h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300
                             hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-600 dark:hover:text-orange-400
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-colors duration-200 flex items-center justify-center text-2xl font-bold"
                >
                  −
                </button>
                <span className="text-2xl font-bold text-gray-900 dark:text-white w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  disabled={quantity >= 10}
                  className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300
                             hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-600 dark:hover:text-orange-400
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-colors duration-200 flex items-center justify-center text-2xl font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-auto">
              <button
                onClick={handleAddToCart}
                disabled={!item.available || isAdding}
                className="w-full py-4 px-6 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 
                           text-white text-lg font-bold rounded-xl shadow-lg
                           hover:shadow-xl disabled:cursor-not-allowed
                           transition-all duration-200 flex items-center justify-center gap-3"
              >
                {isAdding ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Add to Cart - {formatPrice(calculateTotalPrice())}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;

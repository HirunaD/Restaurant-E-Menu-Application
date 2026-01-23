import { useNavigate } from 'react-router-dom';
import type { MenuCardProps } from '../../types';
import { useMenu } from '../../hooks/useMenu';



const MenuCard = ({ item }: MenuCardProps) => {
  const { addToCart } = useMenu();
  const navigate = useNavigate();

  // Format price to currency
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  // Get dietary badge color based on type
  const getDietaryColor = (dietary: string): string => {
    const colors: Record<string, string> = {
      vegetarian: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      vegan: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      'gluten-free': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      'dairy-free': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      'nut-free': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      halal: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
      kosher: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
    };
    return colors[dietary.toLowerCase()] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
  };

  // Render spicy level indicators
  const renderSpicyLevel = (level: number) => {
    if (level === 0) return null;
    return (
      <div className="flex items-center gap-0.5" title={`Spicy level: ${level}/5`}>
        {Array.from({ length: level }, (_, i) => (
          <span key={i} className="text-sm">🌶️</span>
        ))}
      </div>
    );
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    addToCart();
    // Show a toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fadeIn';
    toast.textContent = `${item.name} added to cart!`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 2000);
  };

  return (
    <article
      onClick={() => navigate(`/item/${item.id}`)}
      className="group bg-gray-200 dark:bg-gray-800 rounded-xl shadow-md 
                 overflow-hidden cursor-pointer
                 hover:shadow-xl hover:-translate-y-1 
                 transition-all duration-300 ease-out
                 animate-fadeIn"
    >
      {/* Image container with overlay */}
      <div className="relative h-40 lg:h-52 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover 
                     group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Popular badge */}
        {item.popular && (
          <div className="absolute top-3 left-3 
                        bg-orange-500 text-white text-xs font-bold 
                        px-2 py-1 rounded-full shadow-md">
            🔥 Popular
          </div>
        )}

        {/* Availability indicator */}
        {!item.available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Currently Unavailable</span>
          </div>
        )}

        {/* Preparation time badge */}
        {item.preparationTime && (
          <div className="absolute bottom-3 right-3 
                        bg-black/70 text-white text-xs 
                        px-2 py-1 rounded-full flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {item.preparationTime} min
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Price row */}
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white 
                       group-hover:text-orange-500 transition-colors line-clamp-1">
            {item.name}
          </h3>
          <span className="text-orange-500 font-bold text-lg whitespace-nowrap">
            {formatPrice(item.price)}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
          {item.description}
        </p>

        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4 min-h-7">
          {/* Dietary badges */}
          {item.dietary && item.dietary.map((tag) => (
            <span
              key={tag}
              className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${getDietaryColor(tag)}`}
            >
              {tag}
            </span>
          ))}
          
          {/* Spicy level */}
          {renderSpicyLevel(item.spicyLevel)}
        </div>

        {/* Add to Cart button */}
        <button
          onClick={handleAddToCart}
          disabled={!item.available}
          className={`
            w-full py-2.5 rounded-lg font-semibold text-sm
            flex items-center justify-center gap-2
            transition-all duration-200
            ${item.available
              ? 'bg-orange-500 hover:bg-orange-600 text-white active:scale-95'
              : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {item.available ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </article>
  );
};

export default MenuCard;

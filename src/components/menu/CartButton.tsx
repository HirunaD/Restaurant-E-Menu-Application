import { useMenu } from "../../hooks/useMenu";

const CartButton = () => {
  const { cartCount } = useMenu();

  const handleClick = () => {
    alert(`You have ${cartCount} item(s) in your cart`);
  };

  return (
    <button
      onClick={handleClick}
      className="relative p-2.5 rounded-full bg-orange-100 dark:bg-orange-900/30 
                 hover:bg-orange-200 dark:hover:bg-orange-900/50 
                 transition-colors duration-200"
      aria-label={`Shopping cart with ${cartCount} items`}
    >
      <svg
        className="w-5 h-5 text-orange-600 dark:text-orange-400"
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

      {cartCount > 0 && (
        <span
          className="absolute -top-1 -right-1 w-5 h-5 
                     bg-orange-500 text-white text-xs font-bold 
                     rounded-full flex items-center justify-center
                     animate-pulse"
        >
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </button>
  );
};

export default CartButton;

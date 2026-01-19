# 🍽️ Delicious Bites - Restaurant E-Menu Application

A modern, responsive digital menu application built with React, TypeScript, and Tailwind CSS.

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-06B6D4?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=flat-square&logo=vite)

## 📋 Features Implemented

### Must-Have Features ✅

1. **Home Display**
   - Fetches and displays all 50 menu items from API
   - Shows item image, name, price (formatted as $0.00), description
   - Dietary badges (vegetarian, vegan, gluten-free, etc.)
   - Spicy level indicator (🌶️)
   - Responsive grid layout

2. **Category Filtering**
   - Displays all 4 categories (Appetizers, Mains, Desserts, Beverages)
   - "All" option to show all items
   - Click category to filter items instantly
   - Visual indicator for active/selected category
   - Smooth transitions when switching categories
   - Item count per category

3. **Search Functionality**
   - Search input field in header
   - Real-time search as user types (no submit button needed)
   - Search by item name and description
   - Clear/reset search button (X icon)
   - Display result count ("X items found")
   - "No results found" message when appropriate

4. **Responsive Design**
   - Mobile-first approach
   - Works perfectly on:
     - Mobile: 320px - 767px
     - Tablet: 768px - 1023px
     - Desktop: 1024px+
   - Touch-friendly buttons and interactions on mobile
   - Readable text on all screen sizes

5. **UI/UX States**
   - Loading state with skeleton placeholders while fetching data
   - Error state if API request fails with retry option
   - Empty state for "no search results"
   - Smooth transitions between states

6. **Code Quality**
   - Clean, well-organized code structure
   - Proper component breakdown
   - TypeScript for type safety
   - Meaningful variable and function names
   - Comments for complex logic

### Bonus Features ✅

- ✅ **Dark Mode Toggle** - Persistent dark/light theme switching
- ✅ **Animations/Transitions** - Smooth animations throughout the app
- ✅ **Item Detail View** - Modal with full item details
- ✅ **Item Customization** - Size options and add-ons in detail view
- ✅ **Quantity Selector** - +/- buttons for quantity selection
- ✅ **Cart Counter** - Visual cart icon with item count badge

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI Framework |
| **TypeScript** | Type Safety |
| **Tailwind CSS 4** | Styling |
| **Vite** | Build Tool |
| **React Context** | State Management |
| **JSON Server** | Mock API |

## 📁 Project Structure

```
src/
├── api/
│   └── menuApi.ts          # API functions for fetching data
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Header with search and navigation
│   │   └── Footer.tsx      # Footer component
│   └── menu/
│       ├── CategoryFilter.tsx  # Category tabs
│       ├── MenuCard.tsx        # Individual menu item card
│       ├── MenuGrid.tsx        # Grid display with states
│       └── ItemDetailModal.tsx # Item detail popup
├── context/
│   └── MenuContext.tsx     # Global state management
├── hooks/
│   └── useMenu.ts          # Custom hook for menu context
├── types/
│   └── index.ts            # TypeScript interfaces
├── App.tsx                 # Main app component
├── main.tsx                # Entry point
└── index.css               # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Restaurant-E-Menu-Application
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install JSON Server globally** (for the API)
   ```bash
   npm install -g json-server
   ```

### Running the Application

1. **Start the API server** (in one terminal)
   ```bash
   npm run api
   ```
   The API will run at: `http://localhost:3001`

2. **Start the development server** (in another terminal)
   ```bash
   npm run dev
   ```
   The app will open at: `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 📡 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /restaurant` | Restaurant info |
| `GET /categories` | All 4 categories |
| `GET /menuItems` | All 50 menu items |
| `GET /menuItems?category=appetizers` | Filter by category |
| `GET /menuItems?name_like=chicken` | Search by name |
| `GET /menuItems?popular=true` | Popular items only |

## 🎨 Design Decisions

### Color Palette
- **Primary**: Orange (#f97316) - Represents warmth, appetite, and energy
- **Background**: Light gray (#fafafa) for light mode, Dark gray (#111827) for dark mode
- **Text**: High contrast colors for accessibility

### Component Architecture
- Components are kept small and focused on single responsibility
- State management centralized in MenuContext for easy data flow
- Custom hook (`useMenu`) provides clean API for accessing context

### Responsive Strategy
- Mobile-first approach with Tailwind's responsive utilities
- Grid layout adapts from 1 column (mobile) to 4 columns (desktop)
- Touch-friendly tap targets (minimum 44px)

## 🔧 Assumptions Made

1. The JSON Server API will always be available at `http://localhost:3001`
2. Menu items have consistent data structure as per the provided API
3. Cart functionality is a placeholder (shows alerts/toasts)
4. Images are externally hosted and always accessible
5. All menu items have at least the required fields (id, name, price, etc.)

## 📝 Notes

- The "Add to Cart" buttons are functional placeholders that show toast notifications
- Dark mode preference is persisted in localStorage
- The application gracefully handles API errors and empty states

---

Made with ❤️ for the Frontend Intern Hiring Test


# Shopping Cart Application

A modern e-commerce application built with React, TypeScript, and Material-UI. This application demonstrates a complete shopping experience with authentication, product browsing, cart management, and responsive design.

## Features

- 🛍️ **Product Browsing**

  - View products in a responsive grid layout
  - Search products by name
  - Filter by category and price range
  - Pagination support

- 🔐 **Authentication**

  - User registration and login
  - Protected routes
  - Persistent sessions

- 🛒 **Shopping Cart**

  - Add/remove products
  - Update quantities
  - Real-time cart updates
  - Persistent cart data

- 🎨 **UI/UX**

  - Responsive design
  - Dark/Light theme support
  - Modern and clean interface
  - Loading states and error handling
  - Mobile-friendly navigation

- 🔍 **Search & Filters**
  - Real-time search
  - Category filtering
  - Price range filtering
  - Clear filters option

## Technologies Used

- React
- TypeScript
- Material-UI
- React Router
- React Query
- Fake Store API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/shopping-cart.git
   cd shopping-cart
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/         # Reusable components
├── pages/             # Page components
├── styles/            # Global styles
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## API Integration

The application uses the [Fake Store API](https://fakestoreapi.com/) for:

- Product data
- User authentication
- Cart management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- [Fake Store API](https://fakestoreapi.com/) for providing the mock data
- [Material-UI](https://mui.com/) for the UI components
- [React Query](https://tanstack.com/query/latest) for data fetching and caching

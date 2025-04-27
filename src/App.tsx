import { useState, useMemo, useEffect } from "react";
import { useQuery } from "react-query";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTheme } from './ThemeContext';
// Components
import Item from "./Item/Item";
import Cart from "./Cart/Cart";
import Header from "./Header/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Filters from "./components/Filters";
import { Drawer, Grid, Box, Container } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { AddShoppingCartRounded } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { Typography } from "@mui/material";
import ProductsPagination from "./components/Pagination";
import Footer from "./components/Footer";
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
// Styles
import { Wrapper } from "./App.styles";
// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

const getTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#90caf9' : '#1976d2',
    },
    secondary: {
      main: mode === 'dark' ? '#f48fb1' : '#dc004e',
    },
    background: {
      default: mode === 'dark' ? '#121212' : '#f5f5f5',
      paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
    },
  },
});

const queryClient = new QueryClient();

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null; // or a loading spinner
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const ITEMS_PER_PAGE = 9;

const App = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  const categories = useMemo(() => {
    if (!data) return [];
    return Array.from(new Set(data.map(product => product.category)));
  }, [data]);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 1000]);
  };

  const filteredProducts = useMemo(() => {
    if (!data) return [];
    
    return data.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [data, searchQuery, selectedCategory, priceRange]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleThemeToggle = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  if (isLoading) return <LoadingSpinner message="Loading products..." />;
  if (error) return (
    <ErrorBoundary>
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          Failed to load products
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please try refreshing the page
        </Typography>
      </Box>
    </ErrorBoundary>
  );

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Wrapper>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Header 
                cartItemsCount={getTotalItems(cartItems)} 
                onCartClick={() => setCartOpen(true)}
                onSearch={setSearchQuery}
                onLogout={handleLogout}
                onThemeToggle={handleThemeToggle}
                isAuthenticated={isAuthenticated}
              />
              <Box component="main" sx={{ flex: 1 }}>
                <Routes>
                  <Route path="/login" element={<Login onLogin={handleLogin} />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/" element={<Landing />} />
                  <Route
                    path="/products"
                    element={
                      <PrivateRoute>
                        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={3}>
                              <Filters
                                categories={categories}
                                selectedCategory={selectedCategory}
                                onCategoryChange={setSelectedCategory}
                                priceRange={priceRange}
                                onPriceRangeChange={setPriceRange}
                                onClearFilters={handleClearFilters}
                              />
                            </Grid>
                            <Grid item xs={12} md={9}>
                              <Grid container spacing={3}>
                                {paginatedProducts.map((product) => (
                                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                                    <Item item={product} handleAddToCart={handleAddToCart} />
                                  </Grid>
                                ))}
                              </Grid>
                              {totalPages > 1 && (
                                <ProductsPagination
                                  currentPage={currentPage}
                                  totalPages={totalPages}
                                  onPageChange={handlePageChange}
                                />
                              )}
                            </Grid>
                          </Grid>
                        </Container>
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </Box>
              <Footer />
            </Box>
            <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
              <Cart
                cartItems={cartItems}
                addToCart={handleAddToCart}
                removeFromCart={handleRemoveFromCart}
              />
            </Drawer>
          </Wrapper>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;

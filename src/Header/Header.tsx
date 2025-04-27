import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  InputBase, 
  IconButton,
  Badge,
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment
} from '@mui/material';
import { 
  Search as SearchIcon,
  AddShoppingCartRounded,
  Brightness4,
  Brightness7,
  ShoppingCart,
  Logout
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
}));

type HeaderProps = {
  cartItemsCount: number;
  onCartClick: () => void;
  onSearch: (query: string) => void;
  onLogout: () => void;
  onThemeToggle: () => void;
  isAuthenticated: boolean;
};

const Header = ({ 
  cartItemsCount, 
  onCartClick, 
  onSearch, 
  onLogout,
  onThemeToggle,
  isAuthenticated
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleLogoClick = () => {
    if (isAuthenticated) {
      navigate('/products');
    } else {
      navigate('/');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Shopping Cart
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isAuthenticated && (
            <TextField
              size="small"
              placeholder="Search products..."
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
          <IconButton color="inherit" onClick={onThemeToggle}>
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {isAuthenticated && (
            <>
              <IconButton color="inherit" onClick={onCartClick}>
                <Badge badgeContent={cartItemsCount} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <Button
                color="inherit"
                startIcon={<Logout />}
                onClick={onLogout}
              >
                Logout
              </Button>
            </>
          )}
          {!isAuthenticated && (
            <Button
              color="inherit"
              component={Link}
              to="/login"
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header; 
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
  InputAdornment,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  Search as SearchIcon,
  AddShoppingCartRounded,
  Brightness4,
  Brightness7,
  ShoppingCart,
  Logout,
  Menu as MenuIcon
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';

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
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDarkMode = theme.palette.mode === 'dark';
  const navigate = useNavigate();

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleLogout = () => {
    onLogout();
    handleMobileMenuClose();
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

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMenuAnchor}
      open={Boolean(mobileMenuAnchor)}
      onClose={handleMobileMenuClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {isAuthenticated && (
        <MenuItem onClick={handleMobileMenuClose}>
          <TextField
            fullWidth
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
        </MenuItem>
      )}
      <MenuItem onClick={onThemeToggle}>
        <IconButton color="inherit">
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <Typography>Toggle Theme</Typography>
      </MenuItem>
      {isAuthenticated && (
        <Box>
          <MenuItem onClick={onCartClick}>
            <IconButton color="inherit">
              <Badge badgeContent={cartItemsCount} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <Typography>Cart</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <IconButton color="inherit">
              <Logout />
            </IconButton>
            <Typography>Logout</Typography>
          </MenuItem>
        </Box>
      )}
      {!isAuthenticated && (
        <MenuItem component={Link} to="/login" onClick={handleMobileMenuClose}>
          <Typography>Login</Typography>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            cursor: 'pointer',
            fontSize: { xs: '1rem', sm: '1.25rem' }
          }}
          onClick={handleLogoClick}
        >
          Shopping Cart
        </Typography>
        {isMobile ? (
          isAuthenticated ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton color="inherit" onClick={onCartClick}>
                  <Badge badgeContent={cartItemsCount} color="error">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={handleMobileMenuOpen}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
              {renderMobileMenu}
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton color="inherit" onClick={onThemeToggle}>
                {isDarkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                size="small"
              >
                Login
              </Button>
            </Box>
          )
        ) : (
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
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header; 
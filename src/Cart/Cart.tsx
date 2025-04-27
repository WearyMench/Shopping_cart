import { Box, Typography, Button, IconButton } from "@mui/material";
import { Close as CloseIcon, Delete as DeleteIcon } from "@mui/icons-material";
import CartItem from "../CartItem/CartItem";
import { CartItemType } from "../App";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  onClose: () => void;
  onEmptyCart: () => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart, onClose, onEmptyCart }) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <Box
      sx={{
        width: { xs: '100%', sm: 500 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: { xs: 2, sm: 3 }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            fontWeight: 'bold',
            color: 'primary.main'
          }}
        >
          Your Shopping Cart
        </Typography>
        <IconButton 
          onClick={onClose}
          sx={{ 
            color: 'text.secondary',
            '&:hover': {
              color: 'text.primary'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      
      {cartItems.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', my: 4 }}>
          No items in cart.
        </Typography>
      ) : (
        <Box sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          ))}
        </Box>
      )}

      {cartItems.length > 0 && (
        <Box 
          sx={{ 
            mt: 'auto',
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                textAlign: 'right'
              }}
            >
              Total: ${calculateTotal(cartItems).toFixed(2)}
            </Typography>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={onEmptyCart}
              sx={{ ml: 2 }}
            >
              Empty Cart
            </Button>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            Checkout
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Cart;

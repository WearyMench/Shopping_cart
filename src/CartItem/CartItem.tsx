import { Box, Typography, Button, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
// Types
import { CartItemType } from "../App";
// Styles
import { Wrapper } from "./CartItem.styles";

type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        gap: 2
      }}
    >
      <Box
        component="img"
        src={item.image}
        alt={item.title}
        sx={{
          width: { xs: 60, sm: 80 },
          height: { xs: 60, sm: 80 },
          objectFit: 'cover',
          borderRadius: 1
        }}
      />
      
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            fontWeight: 'bold',
            mb: 0.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {item.title}
        </Typography>
        
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1
          }}
        >
          <Typography variant="body2" color="text.secondary">
            ${item.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total: ${(item.amount * item.price).toFixed(2)}
          </Typography>
        </Box>

        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 1,
            mt: 1
          }}
        >
          <IconButton
            size={isMobile ? "small" : "medium"}
            onClick={() => removeFromCart(item.id)}
            sx={{ 
              bgcolor: 'background.default',
              '&:hover': { bgcolor: 'action.hover' }
            }}
          >
            <Remove fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
          
          <Typography variant="body1" sx={{ minWidth: 24, textAlign: 'center' }}>
            {item.amount}
          </Typography>
          
          <IconButton
            size={isMobile ? "small" : "medium"}
            onClick={() => addToCart(item)}
            sx={{ 
              bgcolor: 'background.default',
              '&:hover': { bgcolor: 'action.hover' }
            }}
          >
            <Add fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItem;

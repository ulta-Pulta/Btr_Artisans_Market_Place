import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Box,
  Rating,
  Chip,
  Tooltip,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  RemoveShoppingCart,
  Close,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  artisanId: string;
  artisanName: string;
  rating: number;
  category: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
}

const styles = {
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-4px)',
    },
  },
  media: {
    height: 200,
    position: 'relative',
  },
  content: {
    flexGrow: 1,
  },
  priceTag: {
    position: 'absolute',
    top: 16,
    right: 16,
    bgcolor: 'rgba(255, 255, 255, 0.9)',
    px: 2,
    py: 1,
    borderRadius: 2,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  category: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  artisanInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mt: 1,
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    px: 2,
    pb: 2,
  },
  outOfStock: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    bgcolor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState<'success' | 'error'>('success');
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();
  const { addToCart, removeFromCart, items } = useCart();
  const { isAuthenticated } = useAuth();

  const isInCart = items.some(item => item.id === product.id);

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleCartAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      setSnackbarMessage('Please login to add items to cart');
      setSeverity('error');
      setShowSnackbar(true);
      return;
    }

    if (!product.inStock) {
      setSnackbarMessage('Product is out of stock');
      setSeverity('error');
      setShowSnackbar(true);
      return;
    }

    if (isInCart) {
      removeFromCart(product.id);
      setSnackbarMessage('Removed from cart');
      setSeverity('success');
    } else {
      addToCart(product);
      setSnackbarMessage('Added to cart');
      setSeverity('success');
    }
    setShowSnackbar(true);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      setSnackbarMessage('Please login to save favorites');
      setSeverity('error');
      setShowSnackbar(true);
      return;
    }
    setIsFavorite(!isFavorite);
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          '&:hover': {
            boxShadow: 6,
          },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image={product.image}
            alt={product.name}
            sx={{ 
              cursor: 'pointer',
              objectFit: 'cover',
            }}
            onClick={handleOpenDialog}
          />
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'background.paper',
              '&:hover': { bgcolor: 'background.paper' },
            }}
            onClick={handleFavorite}
          >
            {isFavorite ? (
              <Favorite color="error" />
            ) : (
              <FavoriteBorder />
            )}
          </IconButton>
        </Box>
        <CardContent sx={{ flexGrow: 1, pt: 1 }}>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="h2" 
            sx={{ 
              cursor: 'pointer',
              '&:hover': { color: 'primary.main' },
            }}
            onClick={handleOpenDialog}
          >
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {product.description.length > 100
              ? `${product.description.substring(0, 100)}...`
              : product.description}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={product.rating} precision={0.5} size="small" readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              by {product.artisanName}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" color="primary">
              ₹{product.price.toLocaleString()}
            </Typography>
            <Chip
              label={product.inStock ? 'In Stock' : 'Out of Stock'}
              color={product.inStock ? 'success' : 'error'}
              size="small"
            />
          </Box>
        </CardContent>
        <Box sx={{ p: 2, pt: 0 }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<ShoppingCart />}
            onClick={handleCartAction}
            disabled={!product.inStock || isInCart}
          >
            {isInCart ? 'In Cart' : 'Add to Cart'}
          </Button>
        </Box>
      </Card>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{product.name}</Typography>
            <IconButton onClick={handleCloseDialog} size="small">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
            <Box sx={{ flex: '0 0 auto', width: { xs: '100%', md: '400px' } }}>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '400px',
                  objectFit: 'contain',
                }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                ₹{product.price.toLocaleString()}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={product.rating} precision={0.5} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  by {product.artisanName}
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>
              <Chip
                label={product.inStock ? 'In Stock' : 'Out of Stock'}
                color={product.inStock ? 'success' : 'error'}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                fullWidth
                startIcon={<ShoppingCart />}
                onClick={handleCartAction}
                disabled={!product.inStock || isInCart}
              >
                {isInCart ? 'In Cart' : 'Add to Cart'}
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductCard; 
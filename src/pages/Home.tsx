import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const featuredProducts = [
    {
      id: 1,
      name: 'Traditional Bodo Shawl',
      price: '₹2,499',
      image: '/images/products/bodo-shawl.jpg',
      description: 'Handwoven traditional Bodo shawl with intricate patterns',
    },
    {
      id: 2,
      name: 'Bamboo Craft Basket',
      price: '₹899',
      image: '/images/products/bamboo-basket.jpg',
      description: 'Beautifully crafted bamboo basket by local artisans',
    },
    {
      id: 3,
      name: 'Aronai Traditional Scarf',
      price: '₹1,299',
      image: '/images/products/aronai-scarf.jpg',
      description: 'Hand-woven Aronai scarf with traditional motifs',
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
          borderRadius: 2,
          mb: 4,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            color="text.primary"
            gutterBottom
          >
            BTR Artisans
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Discover unique handcrafted products from talented artisans in the
            Bodoland Territorial Region. Support local craftsmanship and preserve
            cultural heritage.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/products')}
              sx={{ mr: 2 }}
            >
              Explore Products
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => navigate('/artisans')}
            >
              Meet Artisans
            </Button>
          </Box>
        </Container>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Traditional Crafts
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Explore authentic handwoven textiles, bamboo crafts, and traditional
              jewelry that showcase the rich cultural heritage of BTR.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Support Artisans
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Every purchase directly supports local artisans and their families,
              helping preserve traditional craftsmanship for future generations.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Secure Platform
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Shop with confidence using our secure payment system and reliable
              delivery services across India.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Featured Products Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Featured Products
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {featuredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h3">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                    {product.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => navigate('/products')}
                  >
                    View Details
                  </Button>
                  <Button size="small" color="primary">
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* About BTR Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" gutterBottom>
                About BTR Region
              </Typography>
              <Typography variant="body1" paragraph>
                The Bodoland Territorial Region (BTR) in Assam is known for its rich cultural heritage
                and traditional craftsmanship. Our platform connects you directly with skilled local
                artisans, helping preserve and promote their unique art forms while providing them
                with sustainable livelihoods.
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate('/products')}
              >
                Explore Products
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/btr-region.jpg"
                alt="BTR Region"
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: 400,
                  objectFit: 'cover',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 
import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  SelectChangeEvent,
} from '@mui/material';
import { ProductCard } from '../components';
import type { Product } from '../components/ProductCard';

// Mock data - Replace with API call
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Traditional Bodo Shawl',
    description: 'Handwoven traditional Bodo shawl with intricate patterns',
    price: 2499,
    image: 'https://placeholder.com/400x300',
    artisanId: 'artisan1',
    artisanName: 'Ranjita Basumatary',
    rating: 4.5,
    category: 'Textiles',
    inStock: true,
  },
  {
    id: '2',
    name: 'Bamboo Craft Basket',
    description: 'Beautifully crafted bamboo basket by local artisans',
    price: 899,
    image: 'https://placeholder.com/400x300',
    artisanId: 'artisan2',
    artisanName: 'Bishnu Boro',
    rating: 4.8,
    category: 'Bamboo Craft',
    inStock: true,
  },
  {
    id: '3',
    name: 'Aronai Traditional Scarf',
    description: 'Hand-woven Aronai scarf with traditional motifs',
    price: 1299,
    image: 'https://placeholder.com/400x300',
    artisanId: 'artisan3',
    artisanName: 'Pratima Brahma',
    rating: 4.7,
    category: 'Textiles',
    inStock: true,
  },
  {
    id: '4',
    name: 'Traditional Jewelry Set',
    description: 'Handcrafted traditional Bodo jewelry set',
    price: 3999,
    image: 'https://placeholder.com/400x300',
    artisanId: 'artisan4',
    artisanName: 'Dipali Narzary',
    rating: 4.9,
    category: 'Jewelry',
    inStock: false,
  },
];

const categories = ['All', 'Textiles', 'Bamboo Craft', 'Jewelry'];
const sortOptions = [
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
];

const Products: React.FC = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const productsPerPage = 6;

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
    setPage(1);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Filter and sort products
  const filteredProducts = mockProducts
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory = category === 'All' || product.category === category;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'newest':
        default:
          return parseInt(b.id) - parseInt(a.id);
      }
    });

  // Paginate products
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Our Products
      </Typography>

      {/* Filters */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Search Products"
            value={search}
            onChange={handleSearchChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select value={category} label="Category" onChange={handleCategoryChange}>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} label="Sort By" onChange={handleSortChange}>
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Products Grid */}
      <Grid container spacing={4}>
        {displayedProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}

      {/* No Results */}
      {displayedProducts.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No products found matching your criteria
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Products; 
import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const ArtisanDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [productFormData, setProductFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
  });

  // Mock data - In a real app, this would come from an API
  const products = [
    {
      id: 1,
      name: 'Traditional Bodo Shawl',
      category: 'Traditional Textiles',
      price: 2499,
      stock: 15,
      sales: 24,
    },
    {
      id: 2,
      name: 'Bamboo Craft Basket',
      category: 'Bamboo Crafts',
      price: 899,
      stock: 30,
      sales: 42,
    },
  ];

  const orders = [
    {
      id: 'ORD001',
      date: '2024-03-15',
      customer: 'John Doe',
      product: 'Traditional Bodo Shawl',
      amount: 2499,
      status: 'Pending',
    },
    {
      id: 'ORD002',
      date: '2024-03-14',
      customer: 'Jane Smith',
      product: 'Bamboo Craft Basket',
      amount: 899,
      status: 'Delivered',
    },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleProductDialogOpen = () => {
    setOpenProductDialog(true);
  };

  const handleProductDialogClose = () => {
    setOpenProductDialog(false);
    setProductFormData({
      name: '',
      category: '',
      price: '',
      stock: '',
      description: '',
    });
  };

  const handleProductSubmit = () => {
    // In a real app, implement product creation/update logic here
    console.log('Submitting product:', productFormData);
    handleProductDialogClose();
  };

  const ProductDialog = () => (
    <Dialog open={openProductDialog} onClose={handleProductDialogClose}>
      <DialogTitle>
        {productFormData.name ? 'Edit Product' : 'Add New Product'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                value={productFormData.name}
                onChange={(e) =>
                  setProductFormData({
                    ...productFormData,
                    name: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={productFormData.category}
                  label="Category"
                  onChange={(e) =>
                    setProductFormData({
                      ...productFormData,
                      category: e.target.value,
                    })
                  }
                >
                  <MenuItem value="Traditional Textiles">
                    Traditional Textiles
                  </MenuItem>
                  <MenuItem value="Bamboo Crafts">Bamboo Crafts</MenuItem>
                  <MenuItem value="Wood Carvings">Wood Carvings</MenuItem>
                  <MenuItem value="Metal Work">Metal Work</MenuItem>
                  <MenuItem value="Pottery">Pottery</MenuItem>
                  <MenuItem value="Jewelry">Jewelry</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price (₹)"
                type="number"
                value={productFormData.price}
                onChange={(e) =>
                  setProductFormData({
                    ...productFormData,
                    price: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Stock"
                type="number"
                value={productFormData.stock}
                onChange={(e) =>
                  setProductFormData({
                    ...productFormData,
                    stock: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={productFormData.description}
                onChange={(e) =>
                  setProductFormData({
                    ...productFormData,
                    description: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleProductDialogClose}>Cancel</Button>
        <Button onClick={handleProductSubmit} variant="contained">
          {productFormData.name ? 'Update' : 'Add'} Product
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Artisan Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Total Products
            </Typography>
            <Typography variant="h4">{products.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Total Orders
            </Typography>
            <Typography variant="h4">{orders.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Total Sales
            </Typography>
            <Typography variant="h4">
              ₹{orders.reduce((sum, order) => sum + order.amount, 0).toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Total Products Sold
            </Typography>
            <Typography variant="h4">
              {products.reduce((sum, product) => sum + product.sales, 0)}
            </Typography>
          </Paper>
        </Grid>

        {/* Tabs Section */}
        <Grid item xs={12}>
          <Paper sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Products" />
                <Tab label="Orders" />
              </Tabs>
            </Box>

            {/* Products Tab */}
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleProductDialogOpen}
                >
                  Add New Product
                </Button>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Stock</TableCell>
                      <TableCell align="right">Sales</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell align="right">
                          ₹{product.price.toLocaleString()}
                        </TableCell>
                        <TableCell align="right">{product.stock}</TableCell>
                        <TableCell align="right">{product.sales}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            onClick={() => {
                              // Handle edit
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => {
                              // Handle delete
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>

            {/* Orders Tab */}
            <TabPanel value={tabValue} index={1}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Order ID</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell>Product</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell align="right">
                          ₹{order.amount.toLocaleString()}
                        </TableCell>
                        <TableCell align="right">
                          <Chip
                            label={order.status}
                            color={
                              order.status === 'Delivered' ? 'success' : 'warning'
                            }
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>

      <ProductDialog />
    </Container>
  );
};

export default ArtisanDashboard; 
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';

// Initialize Stripe - In a real app, use your Stripe publishable key
const stripePromise = loadStripe('your_publishable_key');

const Checkout = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [shippingDetails, setShippingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const steps = ['Shipping Details', 'Payment'];

  // Mock cart data - In a real app, this would come from a cart context
  const cartItems = [
    {
      id: 1,
      name: 'Traditional Bodo Shawl',
      price: 2499,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Bamboo Craft Basket',
      price: 899,
      quantity: 2,
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = 100;
  const total = subtotal + shippingCost;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveStep(1);
  };

  const handlePaymentSubmit = async () => {
    // In a real app, handle payment processing here
    try {
      // Process payment
      console.log('Processing payment...');
      // Navigate to success page
      navigate('/order-success');
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  const ShippingForm = () => (
    <form onSubmit={handleShippingSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="First Name"
            value={shippingDetails.firstName}
            onChange={(e) =>
              setShippingDetails({
                ...shippingDetails,
                firstName: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Last Name"
            value={shippingDetails.lastName}
            onChange={(e) =>
              setShippingDetails({
                ...shippingDetails,
                lastName: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Email"
            type="email"
            value={shippingDetails.email}
            onChange={(e) =>
              setShippingDetails({
                ...shippingDetails,
                email: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Phone"
            value={shippingDetails.phone}
            onChange={(e) =>
              setShippingDetails({
                ...shippingDetails,
                phone: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Address"
            multiline
            rows={2}
            value={shippingDetails.address}
            onChange={(e) =>
              setShippingDetails({
                ...shippingDetails,
                address: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="City"
            value={shippingDetails.city}
            onChange={(e) =>
              setShippingDetails({
                ...shippingDetails,
                city: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="State"
            value={shippingDetails.state}
            onChange={(e) =>
              setShippingDetails({
                ...shippingDetails,
                state: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="PIN Code"
            value={shippingDetails.pincode}
            onChange={(e) =>
              setShippingDetails({
                ...shippingDetails,
                pincode: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            Continue to Payment
          </Button>
        </Grid>
      </Grid>
    </form>
  );

  const PaymentForm = () => (
    <Box>
      <FormControl component="fieldset" sx={{ mb: 3 }}>
        <FormLabel component="legend">Payment Method</FormLabel>
        <RadioGroup defaultValue="card">
          <FormControlLabel
            value="card"
            control={<Radio />}
            label="Credit/Debit Card"
          />
          <FormControlLabel value="upi" control={<Radio />} label="UPI" />
          <FormControlLabel
            value="netbanking"
            control={<Radio />}
            label="Net Banking"
          />
        </RadioGroup>
      </FormControl>

      <Elements stripe={stripePromise}>
        {/* In a real app, implement Stripe payment form here */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Card payment form will be integrated here using Stripe Elements
          </Typography>
        </Box>
      </Elements>

      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        onClick={handlePaymentSubmit}
      >
        Pay ₹{total.toLocaleString()}
      </Button>
    </Box>
  );

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Checkout
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            {activeStep === 0 ? <ShippingForm /> : <PaymentForm />}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            {cartItems.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 1,
                }}
              >
                <Typography>
                  {item.name} x {item.quantity}
                </Typography>
                <Typography>₹{(item.price * item.quantity).toLocaleString()}</Typography>
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 1,
              }}
            >
              <Typography>Subtotal</Typography>
              <Typography>₹{subtotal.toLocaleString()}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 1,
              }}
            >
              <Typography>Shipping</Typography>
              <Typography>₹{shippingCost.toLocaleString()}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 1,
              }}
            >
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">₹{total.toLocaleString()}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout; 
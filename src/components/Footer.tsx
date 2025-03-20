import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { text: 'Home', path: '/' },
        { text: 'Products', path: '/products' },
        { text: 'Artisans', path: '/artisans' }
      ],
    },
    {
      title: 'Customer Service',
      links: [
        { text: 'Contact Us', path: '/contact' },
        { text: 'Shipping Policy', path: '/shipping' },
        { text: 'Return Policy', path: '/returns' },
        { text: 'FAQ', path: '/faq' },
      ],
    },
    {
      title: 'For Artisans',
      links: [
        { text: 'Sell on BTR Artisans', path: '/become-seller' },
        { text: 'Artisan Dashboard', path: '/artisan-dashboard' },
        { text: 'Terms for Artisans', path: '/artisan-terms' },
        { text: 'Success Stories', path: '/success-stories' },
      ],
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {footerSections.map((section) => (
            <Grid item xs={12} sm={6} md={4} key={section.title}>
              <Typography variant="h6" gutterBottom>
                {section.title}
              </Typography>
              <Box>
                {section.links.map((link) => (
                  <Link
                    component={RouterLink}
                    to={link.path}
                    key={link.text}
                    color="inherit"
                    sx={{
                      display: 'block',
                      mb: 1,
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {link.text}
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" sx={{ mb: { xs: 2, sm: 0 } }}>
            © {new Date().getFullYear()} BTR Artisans Marketplace. All rights reserved.
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton color="inherit" aria-label="Facebook">
              <Facebook />
            </IconButton>
            <IconButton color="inherit" aria-label="Twitter">
              <Twitter />
            </IconButton>
            <IconButton color="inherit" aria-label="Instagram">
              <Instagram />
            </IconButton>
            <IconButton color="inherit" aria-label="YouTube">
              <YouTube />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 
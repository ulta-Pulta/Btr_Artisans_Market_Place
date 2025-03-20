import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Container,
  Divider,
  ListItemIcon,
  Avatar,
} from '@mui/material';
import {
  ShoppingCart,
  Person,
  Menu as MenuIcon,
  Login,
  PersonAdd,
  Dashboard,
  Home,
  Store,
  Group,
  ExitToApp,
  AccountCircle,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

// Types
interface MenuItem {
  text: string;
  path: string;
  icon?: React.ReactNode;
}

interface NavbarProps {}

// Mock auth state - Replace with your actual auth context
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  const login = () => {
    setIsAuthenticated(true);
    setUser({ name: 'John Doe', role: 'artisan' });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return { isAuthenticated, user, login, logout };
};

// Styles
const styles = {
  appBar: {
    position: 'sticky',
    bgcolor: 'background.paper',
    color: 'text.primary',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
  },
  logo: {
    textDecoration: 'none',
    color: 'inherit',
    fontWeight: 700,
    fontSize: { xs: '1.1rem', md: '1.3rem' },
    flexBasis: '200px',
  },
  toolbar: {
    px: { xs: 0 },
    justifyContent: 'space-between',
    gap: 2,
    minHeight: '64px',
  },
  navButton: {
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: 500,
    px: 2,
  },
  desktopNav: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: { xs: 2, md: 3 },
    flexBasis: '200px',
    justifyContent: 'flex-end',
  },
  mobileDrawer: {
    width: 250,
    pt: 2,
  },
  menuPaper: {
    elevation: 2,
    sx: { 
      mt: 1,
      minWidth: 220,
      '& .MuiMenuItem-root': {
        py: 1,
        px: 2,
      },
    },
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
  },
  cartIcon: {
    color: 'text.primary',
    position: 'relative',
    '& svg': {
      fontSize: '1.75rem',
    },
    '&:hover': {
      color: 'primary.main',
    },
  },
  cartBadge: {
    '& .MuiBadge-badge': {
      backgroundColor: '#E41E31',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '0.75rem',
      minWidth: '20px',
      height: '20px',
      borderRadius: '10px',
      right: -2,
      top: 2,
    },
  },
  profileIcon: {
    color: 'text.primary',
    '& svg': {
      fontSize: '1.75rem',
    },
    '&:hover': {
      color: 'primary.main',
    },
  },
  menuIcon: {
    color: 'text.primary',
    minWidth: 'auto',
    '& svg': {
      fontSize: '1.75rem',
    },
    '&:hover': {
      color: 'primary.main',
    },
  },
  menuDivider: {
    my: 1,
  },
  avatar: {
    width: 32,
    height: 32,
    marginRight: 1,
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    px: 2,
    py: 1,
  },
  userName: {
    fontWeight: 500,
  },
};

const menuItems: MenuItem[] = [
  { text: 'Home', path: '/', icon: <Home /> },
  { text: 'Products', path: '/products', icon: <Store /> },
  { text: 'Artisans', path: '/artisans', icon: <Group /> },
];

const getProfileMenuItems = (isAuthenticated: boolean, role: string | undefined) => {
  if (!isAuthenticated) {
    return [
      { text: 'Login', path: '/login', icon: <Login /> },
      { text: 'Register', path: '/register', icon: <PersonAdd /> },
    ];
  }

  const items = [
    { text: 'Profile', path: '/profile', icon: <AccountCircle /> },
  ];

  if (role === 'artisan') {
    items.push({ text: 'Dashboard', path: '/artisan-dashboard', icon: <Dashboard /> });
  }

  items.push({ text: 'Logout', path: '/logout', icon: <ExitToApp /> });
  return items;
};

const Navbar: React.FC<NavbarProps> = () => {
  // State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { getItemCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  // Get profile menu items
  const profileMenuItems = getProfileMenuItems(isAuthenticated, user?.role);

  // Handlers
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigate = (path: string) => {
    handleMenuClose();
    if (path === '/logout') {
      logout();
      navigate('/');
    } else {
      navigate(path);
    }
  };

  // Mobile Menu Component
  const renderMobileMenu = (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={handleMobileMenuToggle}
    >
      <List sx={styles.mobileDrawer}>
        {isAuthenticated && user && (
          <>
            <Box sx={styles.userInfo}>
              <Avatar sx={styles.avatar}>
                {user.name.charAt(0)}
              </Avatar>
              <Typography variant="subtitle1" sx={styles.userName}>
                {user.name}
              </Typography>
            </Box>
            <Divider sx={styles.menuDivider} />
          </>
        )}
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            onClick={handleMobileMenuToggle}
          >
            <ListItemIcon sx={styles.menuIcon}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <Divider sx={styles.menuDivider} />
        {profileMenuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              handleMobileMenuToggle();
              handleNavigate(item.path);
            }}
          >
            <ListItemIcon sx={styles.menuIcon}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  return (
    <AppBar position="sticky" elevation={1} sx={styles.appBar}>
      <Container maxWidth="lg">
        <Toolbar sx={styles.toolbar}>
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={styles.logo}
          >
            BTR Artisans
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={styles.desktopNav}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  component={Link}
                  to={item.path}
                  sx={styles.navButton}
                  startIcon={item.icon}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          {/* Right Side Icons */}
          <Box sx={styles.iconContainer}>
            <IconButton
              onClick={() => navigate('/cart')}
              size="large"
              sx={styles.cartIcon}
            >
              <Badge 
                badgeContent={getItemCount()} 
                sx={styles.cartBadge}
                max={99}
              >
                <ShoppingCart />
              </Badge>
            </IconButton>

            <IconButton
              onClick={handleProfileMenuOpen}
              size="large"
              sx={styles.profileIcon}
            >
              {isAuthenticated && user ? (
                <Avatar sx={styles.avatar}>
                  {user.name.charAt(0)}
                </Avatar>
              ) : (
                <Person />
              )}
            </IconButton>

            {isMobile && (
              <IconButton
                onClick={handleMobileMenuToggle}
                edge="end"
                size="large"
                sx={styles.menuIcon}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={styles.menuPaper}
          >
            {isAuthenticated && user && (
              <>
                <Box sx={styles.userInfo}>
                  <Avatar sx={styles.avatar}>
                    {user.name.charAt(0)}
                  </Avatar>
                  <Typography variant="subtitle1" sx={styles.userName}>
                    {user.name}
                  </Typography>
                </Box>
                <Divider sx={styles.menuDivider} />
              </>
            )}
            {profileMenuItems.map((item) => (
              <MenuItem 
                key={item.text}
                onClick={() => handleNavigate(item.path)}
                sx={styles.menuItem}
              >
                <ListItemIcon sx={styles.menuIcon}>
                  {item.icon}
                </ListItemIcon>
                {item.text}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
      {renderMobileMenu}
    </AppBar>
  );
};

export default Navbar; 
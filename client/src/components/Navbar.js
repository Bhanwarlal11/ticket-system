import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Snackbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/api";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null); // For the user menu anchor
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null); // For mobile menu anchor
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const { logout, role } = useAuth();

  // Open the user menu when clicking on avatar
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the user menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await logoutUser();

      console.log(response);
      console.log(loading);
      if (response.data.success) {
        logout();
      }
      setSuccessMessage("Logout successful!");
    } catch (error) {
      setError(error || "Logout failed. Please try after sometime.");
    } finally {
      setLoading(false);
    }
    handleMenuClose();
  };

  const handleProfile = () => {
    navigate("/profile"); // Redirect to profile page
    handleMenuClose();
  };

  // Open the mobile menu
  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  // Close the mobile menu
  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  // Render mobile menu (for smaller screens)
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMenuAnchor}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(mobileMenuAnchor)}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfile}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  // Render desktop menu (for larger screens)
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      {/* Profile option */}
      <MenuItem onClick={handleProfile}>Profile</MenuItem>

      {/* Logout option */}
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
    setError(null);
    setSuccessMessage("");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: role !== "user" ? "#4a148c" : "primary.main", // Change color based on role
        }}
      >
        <Toolbar>
          {/* Logo Text */}

          {role === "user" ? (
            <Link
              to="/"
              style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
            >
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Ticket App
              </Typography>
            </Link>
          ) : (
            <Link
              to="/admin/tickets"
              style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
            >
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Admin Panel
              </Typography>
            </Link>
          )}

          {/* Desktop Menu (Avatar with Profile/Logout) */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton onClick={handleMenuClick}>
              <Avatar alt="User" src="/path/to/avatar.jpg" />
            </IconButton>
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={successMessage || error}
      />
      {/* Render mobile menu */}
      {renderMobileMenu}

      {/* Render desktop menu */}
      {renderMenu}
    </Box>
  );
};

export default Navbar;

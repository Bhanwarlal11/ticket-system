import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Tab,
  Tabs,
  Typography,
  Container,
  Snackbar,
} from "@mui/material";
import { registerUser, loginUser } from "../../api/api"; // Import the API functions
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";


function UserAuthForm() {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { login, isAuthenticated,role } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (isAuthenticated && role === "user") {
      navigate("/tickets"); 
    } else if (isAuthenticated && role !== "user") {
      navigate("/admin/tickets"); 
    }
  }, [isAuthenticated, role, navigate]); 

  // Handles tab change (Login or Sign Up)
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Handles form field change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission for login
  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await loginUser(formData.email, formData.password);
      console.log(response);
      if(response.data.success){
        login(response.data.user);
      }
      setSuccessMessage("Login successful!");
      setOpenSnackbar(true);
    } catch (error) {
      setError(error || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for sign-up
  const handleSignUp = async () => {
    try {
      setLoading(true);
      const response = await registerUser(
        formData.name,
        formData.email,
        formData.password
      );
      console.log(response);
      setSuccessMessage("Sign-up successful! Please log in.");
      setOpenSnackbar(true);
    } catch (error) {
      setError(error || "Sign-up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Clear error and success messages after Snackbar closes
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
    setError(null);
    setSuccessMessage("");
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h4" gutterBottom>
          {activeTab === 0 ? "Login" : "Sign Up"}
        </Typography>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        {/* Login Form */}
        {activeTab === 0 && (
          <Box sx={{ width: "100%", mt: 2 }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Box>
        )}

        {/* Sign Up Form */}
        {activeTab === 1 && (
          <Box sx={{ width: "100%", mt: 2 }}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleSignUp}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </Box>
        )}
      </Box>

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={successMessage || error}
      />
    </Container>
  );
}

export default UserAuthForm;

import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../common/firebase.js";
import { signWithGoogle } from "../../api/api.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.js";

const AdminLogin = () => {
  const { login, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && role === "user") {
      navigate("/tickets");
    } else if (isAuthenticated && role !== "user") {
      navigate("/admin/tickets");
    }
  }, [isAuthenticated, role, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      const token = await result.user.getIdToken();

      const response = await signWithGoogle(token);

      if (response.data.success) {
        login(response.data.user);
      }

      console.log(response.data.user);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      padding={3}
      boxShadow={3}
      borderRadius={2}
    >
      <Typography variant="h5" gutterBottom>
        Admin Panel Login
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleGoogleSignIn}
        sx={{
          padding: "10px 20px", // Add padding to the button
          fontSize: "16px", // Set font size
          borderRadius: "8px", // Rounded corners for the button
          boxShadow: 3, // Add shadow to the button
          "&:hover": {
            boxShadow: 6, // Button shadow on hover
            backgroundColor: "#1976d2", // Change background color on hover
          },
        }}
      >
        Sign In With Google
      </Button>
    </Box>
  );
};

export default AdminLogin;

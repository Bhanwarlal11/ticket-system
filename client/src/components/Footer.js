import React from "react";
import { Box, Typography, Grid, Link, Container } from "@mui/material";
import { useAuth } from "../context/authContext";

const Footer = () => {

    const {role} = useAuth();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: role !== "user" ? "secondary.main" : "primary.main",
        color: "white",
        py: 4,
        mt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Ticketing System
            </Typography>
            <Typography variant="body2">
              Simplify your event management and ticketing process with our
              seamless platform.
            </Typography>
          </Grid>

          {/* Useful Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Useful Links
            </Typography>
            <Box>
              <Link href="/about" color="inherit" underline="none">
                About Us
              </Link>
            </Box>
            <Box>
              <Link href="/contact" color="inherit" underline="none">
                Contact Us
              </Link>
            </Box>
            <Box>
              <Link href="/faq" color="inherit" underline="none">
                FAQ
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2">
              Email: support@ticketingsystem.com
            </Typography>
            <Typography variant="body2">Phone: +1-234-567-8901</Typography>
            <Typography variant="body2">Address: 123 Event Lane, City</Typography>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box
          sx={{
            mt: 4,
            textAlign: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            pt: 2,
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} Ticketing System. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

import React, { useState, useEffect } from "react";
import TicketsTable from "../../components/TicketTable";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import AddNewTicket from "../../components/AddNewTicket"; // Import the new component
import { getUserTickets } from "../../api/api.js"; // Import the API call to get tickets

const UserTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [open, setOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar visibility state

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Fetch the user's tickets on component mount
  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true); // Set loading to true before API call
      try {
        const response = await getUserTickets();
        console.log(response.data.tickets); // Check the structure of the tickets data
        // Map over the tickets and extract category and subcategory names
        setTickets(
          response.data.tickets.map((ticket) => ({
            ...ticket,
            category: ticket.category.name, // Assuming category has 'name' field
            subcategory: ticket.subCategory.name, // Assuming subcategory has 'name' field
          }))
        );
      } catch (err) {
        setError("Failed to fetch tickets");
      } finally {
        setLoading(false); // Set loading to false once the API call is complete
      }
    };

    fetchTickets(); // Call the function to fetch tickets
  }, []); // Empty dependency array means this will run once when the component mounts

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "1rem",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          My Tickets
        </Typography>
        <Button variant="outlined" onClick={handleOpen}>
          Add New Ticket
        </Button>
      </Box>

      {loading ? (
        <CircularProgress /> // Display loading spinner while fetching data
      ) : error ? (
        <Typography variant="h8" textAlign={"center"}>No Ticket, add new ticket.</Typography> // Show error message if fetching fails
      ) : (
        <TicketsTable tickets={tickets} /> // Display tickets if available
      )}

      {/* AddNewTicket modal component */}
      <AddNewTicket
        open={open}
        handleClose={handleClose}
        setSuccessMessage={setSuccessMessage}
      />

      {/* Snackbar for success message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={successMessage}
      />
    </Box>
  );
};

export default UserTickets;

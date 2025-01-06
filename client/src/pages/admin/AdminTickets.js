import React, { useEffect, useState } from "react";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import TicketsTable from "../../components/TicketTable";
import CreateCategoryDialog from "../../components/CreateCategoryDialog";
import CreateSolutionDialog from "../../components/CreateSolutionDialog";
import CreateSubcategoryDialog from "../../components/CreateSubcategoryDialog";
import {
  createCategory,
  createSubCategory,
  createSolution,
  getAllTickets,
} from "../../api/api"; // Import API calls
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const AdminTickets = () => {
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openSubcategoryDialog, setOpenSubcategoryDialog] = useState(false);
  const [openSolutionDialog, setOpenSolutionDialog] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state for API calls
  const [error, setError] = useState(""); // Track error state
  const [successMessage, setSuccessMessage] = useState(""); // Track success message
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar open state
  const [tickets, setTickets] = useState([]);
  const { role } = useAuth();
  const navigate = useNavigate();

  // // Fetch the user's tickets on component mount
  // useEffect(() => {
  //   const fetchTickets = async () => {
  //     setLoading(true); // Set loading to true before API call
  //     try {
  //       const response = await getAllTickets();
  //       console.log(response.data.tickets); // Check the structure of the tickets data
  //       // Map over the tickets and extract category and subcategory names
  //       setTickets(
  //         response.data.tickets.map((ticket) => ({
  //           ...ticket,
  //           category: ticket.category.name, // Assuming category has 'name' field
  //           subcategory: ticket.subCategory.name, // Assuming subcategory has 'name' field
  //         }))

  //       );
  //     } catch (err) {
  //       setError("Failed to fetch tickets");
  //     } finally {
  //       setLoading(false); // Set loading to false once the API call is complete
  //     }
  //   };

  //   fetchTickets(); // Call the function to fetch tickets
  // }, []); // Empty dependency array means this will run once when the component mounts

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true); // Set loading to true before API call
      try {
        const response = await getAllTickets();
        console.log(response.data.tickets); // Check the structure of the tickets data

        // Filter tickets based on the 'escalatedTo' field dynamically from the 'role'
        const filteredTickets = response.data.tickets
          .filter((ticket) => ticket.escalatedTo === role) // Only tickets escalated to the user's role
          .map((ticket) => ({
            ...ticket,
            category: ticket.category.name, // Assuming category has 'name' field
            subcategory: ticket.subCategory.name, // Assuming subcategory has 'name' field
          }));

        // Update the tickets state with filtered and mapped tickets
        setTickets(filteredTickets);
      } catch (err) {
        setError("Failed to fetch tickets");
      } finally {
        setLoading(false); // Set loading to false once the API call is complete
      }
    };

    fetchTickets(); // Call the function to fetch tickets
  }, [role]); // The effect will run again if the 'role' changes

  const handleCategorySubmit = async (name) => {
    setLoading(true);
    try {
      const response = await createCategory(name);
      setSuccessMessage("Category created successfully!");
      setSnackbarOpen(true); // Show Snackbar on success
      setOpenCategoryDialog(false); // Close the dialog after successful submission
    } catch (error) {
      console.error("Error creating category:", error);
      setError("Failed to create category.");
      setSnackbarOpen(true); // Show Snackbar on error
    } finally {
      setLoading(false);
    }
  };

  const handleSubcategorySubmit = async (name, category, riskLevel) => {
    setLoading(true);
    try {
      const response = await createSubCategory(name, category, riskLevel);
      setSuccessMessage("Subcategory created successfully!");
      setSnackbarOpen(true); // Show Snackbar on success
      setOpenSubcategoryDialog(false);
      console.log(loading);
    } catch (error) {
      console.error("Error creating subcategory:", error);
      setError("Failed to create subcategory.");
      setSnackbarOpen(true); // Show Snackbar on error
    } finally {
      setLoading(false);
    }
  };

  const handleSolutionSubmit = async (subCategoryId, solutionText) => {
    setLoading(true);
    try {
      const response = await createSolution(subCategoryId, solutionText);

      // Check if the response was successful
      if (response.data.success) {
        setSuccessMessage("Solution created successfully!");
        setSnackbarOpen(true); // Show Snackbar on success
        setOpenSolutionDialog(false); // Close the dialog after successful submission
      } else {
        // If the response was not successful, show the error message from the server
        setError(response.data.message || "Failed to create solution.");
        setSnackbarOpen(true); // Show Snackbar on error
      }
    } catch (error) {
      console.error("Error creating solution:", error);
      setError(error.response?.data?.message || "Failed to create solution.");
      setSnackbarOpen(true); // Show Snackbar on error
    } finally {
      setLoading(false);
    }
  };

  // Handle Snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setError(""); // Reset error state on Snackbar close
    setSuccessMessage(""); // Reset success message state on Snackbar close
  };

  return (
    <Box>
      <Box sx={{ padding: "2rem" }}>
        <Button
          variant="contained"
          color={role !== "user" ? "secondary" : "primary"}
          onClick={() => setOpenCategoryDialog(true)}
          sx={{ marginBottom: "1rem", marginRight: "1rem" }}
        >
          Add New Category
        </Button>
        <Button
          variant="contained"
          color={role !== "user" ? "secondary" : "primary"}
          onClick={() => setOpenSubcategoryDialog(true)}
          sx={{ marginBottom: "1rem", marginRight: "1rem" }}
        >
          Add New Subcategory
        </Button>
        <Button
          variant="contained"
          color={role !== "user" ? "secondary" : "primary"}
          onClick={() => setOpenSolutionDialog(true)}
          sx={{ marginBottom: "1rem", marginRight: "1rem" }}
        >
          Add New Solution
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginBottom: "1rem" }}
          onClick={()=> navigate('/admin/charts')}
        >
          DashBoard
        </Button>

        {/* Dialogs */}
        <CreateCategoryDialog
          open={openCategoryDialog}
          onClose={() => setOpenCategoryDialog(false)}
          onSubmit={handleCategorySubmit}
        />

        <CreateSubcategoryDialog
          open={openSubcategoryDialog}
          onClose={() => setOpenSubcategoryDialog(false)}
          onSubmit={handleSubcategorySubmit}
        />

        <CreateSolutionDialog
          open={openSolutionDialog}
          onClose={() => setOpenSolutionDialog(false)}
          onSubmit={handleSolutionSubmit}
        />
      </Box>

      {/* Tickets Table */}
      <TicketsTable tickets={tickets} />

      {/* Snackbar for Success or Error Messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {error || successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminTickets;

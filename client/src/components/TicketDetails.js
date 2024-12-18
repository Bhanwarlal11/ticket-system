

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useAuth } from "../context/authContext";
import { useParams } from "react-router-dom";
import { getTicketById, updateTicketStatus } from "../api/api"; // Import the API function
import { sendQueryToTicket } from "../api/api"; // Import sendQueryToTicket API function
import { sendSolutionToTicket } from "../api/api"; // Import sendSolutionToTicket API function
import QuerySendDialog from "./QueryResponseDialog";
import SendSolutionDialog from "./SendSolutionDialog";
import StatusChangeDialog from "./StatusChangeDialog";

const TicketDetails = () => {
  const { role } = useAuth();
  const { ticketID } = useParams(); // Retrieve ticketID from URL
  const [ticket, setTicket] = useState(null); // Store ticket data
  const [openDialog, setOpenDialog] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [ticketStatus, setTicketStatus] = useState("Open");

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await getTicketById(ticketID); // Fetch ticket details by ID
        setTicket(response.data.ticket);
        setTicketStatus(response.data.ticket.status); // Set the initial ticket status
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    };

    fetchTicket(); // Call the fetch function when the component mounts
  }, [ticketID]); // Refetch when ticketID changes

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleStatusDialogOpen = () => {
    setOpenStatusDialog(true); // Open the status change dialog
  };

  const handleStatusDialogClose = () => {
    setOpenStatusDialog(false); // Close the status change dialog
  };

  const handleSubmit = async (query, status) => {
    if (role === "user") {
      try {
        await sendQueryToTicket(ticketID, query); 
        console.log("Query submitted successfully");
      } catch (error) {
        console.error("Error sending query:", error);
      }
    } else {
      try {
        await sendSolutionToTicket(ticketID, query);
        console.log("Solution submitted successfully");
      } catch (error) {
        console.error("Error sending solution:", error);
      }
    }
  };

  const handleStatusChangeSubmit = async (newStatus) => {
    setTicketStatus(newStatus); // Update the ticket's status in the state
    try {
      await updateTicketStatus(ticketID, newStatus); // Call the API to update the ticket status
      console.log("Ticket status updated to:", newStatus);
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  };


  if (!ticket) {
    return <Typography>Loading...</Typography>; // Show loading message while fetching ticket data
  }

  return (
    <Box
      sx={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {/* First Box: Ticket ID and Status */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.5rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Ticket ID: {ticket._id}
        </Typography>
        <Typography variant="subtitle1">Status: {ticketStatus}</Typography>
        <Typography variant="subtitle1">Date: {ticket.createdAt}</Typography>

        <Button variant="contained" color="primary" onClick={handleDialogOpen}>
          {role !== "user" ? "Send Solution" : "Send Query"}
        </Button>
        {role === "user" ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleStatusDialogOpen} // Open StatusChangeDialog when clicked
          >
            Change Status
          </Button>
        ) : null}
      </Box>

      <Box>
        <Typography variant="subtitle1">
          Category: {ticket.category.name}
        </Typography>
        <Typography variant="subtitle1">
          Subcategory: {ticket.subCategory.name}
        </Typography>
      </Box>
      <Box>
        {role !== "user" ? (
          <Typography variant="subtitle1">
            Escalated To: {ticket.escalatedTo}
          </Typography>
        ) : null}

        {role !== "user" ? (
          <Typography variant="subtitle1">
            Risk: {ticket.subCategory.riskLevel}
          </Typography>
        ) : null}
      </Box>

      {/* Second Box: Query and Solution Table */}
      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Query
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Solution
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Time
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ticket.queries.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.query}</TableCell>
                  <TableCell>
                    {ticket.solutions[index] ? ticket.solutions[index].solutionText : "Pending"}
                  </TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {role !== "user" ? (
        <SendSolutionDialog
          open={openDialog}
          onClose={handleDialogClose}
          onSubmit={handleSubmit}
        />
      ) : (
        <QuerySendDialog
          open={openDialog}
          onClose={handleDialogClose}
          onSubmit={handleSubmit}
        />
      )}

      {/* StatusChangeDialog */}
      <StatusChangeDialog
        open={openStatusDialog}
        onClose={handleStatusDialogClose}
        onSubmit={handleStatusChangeSubmit} // Pass the submit handler
        currentStatus={ticketStatus} // Pass current status to pre-populate the select field
      />
    </Box>
  );
};

export default TicketDetails;

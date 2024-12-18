import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const TicketsTable = ({ tickets = [] }) => {
  const { role } = useAuth();

  const navigate = useNavigate();

  const handleViewClick = (ticketID) => {
    if (role !== "user") {
      navigate(`/admin/tickets/${ticketID}`); // Redirect to admin page
    } else {
      navigate(`/tickets/${ticketID}`); // Redirect to user page
    }
  };

  console.log(tickets);

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ticket ID</TableCell>
            <TableCell>Query</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Subcategory</TableCell>
            <TableCell>Solution</TableCell>
            <TableCell>Status</TableCell>
            {role !== "user" && <TableCell>Date</TableCell>}
            {role !== "user" && <TableCell>Escalated To</TableCell>}
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket._id}>
              <TableCell>{ticket._id}</TableCell>
              <TableCell>{ticket.queries[0].query}</TableCell>
              <TableCell>{ticket.category}</TableCell>
              <TableCell>{ticket.subcategory}</TableCell>
              <TableCell>
                {ticket.solutions[0]
                  ? ticket.solutions[0].solutionText
                  : "Pending"}
              </TableCell>
              <TableCell>{ticket.status}</TableCell>
              {role !== "user" && <TableCell>{ticket.date}</TableCell>}
              {role !== "user" && <TableCell>{ticket.escalatedTo}</TableCell>}
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleViewClick(ticket._id)} // Handle the button click
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TicketsTable;

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
  Chip,
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
            {/* {role !== "user" && <TableCell>Date</TableCell>} */}
            {role !== "user" && <TableCell>Escalated To</TableCell>}
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} align="center">
                No tickets found
              </TableCell>
            </TableRow>
          ) : (
            tickets.map((ticket) => (
              <TableRow key={ticket._id}>
                <TableCell>{ticket._id}</TableCell>
                <TableCell>{ticket.queries[0].query}</TableCell>
                <TableCell>
                  <Chip label={ticket.category} />
                </TableCell>
                <TableCell>
                  <Chip label={ticket.subcategory} />
                </TableCell>
                <TableCell>
                  {ticket.solutions[0]
                    ? ticket.solutions[0].solutionText
                    : "Pending"}
                </TableCell>
                <TableCell>
                  <Chip
                    label={ticket.status}
                    variant="outlined"
                    color={role !== "user" ? "secondary" : "primary"}
                  />
                </TableCell>
                {/* {role !== "user" && <TableCell>{ticket.date}</TableCell>} */}
                {role !== "user" && (
                  <TableCell>
                    <Chip
                      label={ticket.escalatedTo}
                      variant="outlined"
                      color="secondary"
                    />
                  </TableCell>
                )}
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color={role !== "user" ? "secondary" : "primary"}
                    size="small"
                    onClick={() => handleViewClick(ticket._id)} // Handle the button click
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TicketsTable;

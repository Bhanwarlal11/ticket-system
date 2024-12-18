const Ticket = require("../models/Ticket");
const User = require("../models/User");
const Solution = require("../models/Solution");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");

const createTicket = async (req, res) => {
  const { query, category, subCategory } = req.body;
  const user = req.user; // Extract user information from req.user

  try {
    // Check if the category and subcategory exist
    const categoryExists = await Category.findById(category);
    const subCategoryExists = await SubCategory.findById(subCategory);

    if (!categoryExists || !subCategoryExists) {
      return res
        .status(404)
        .json({ success: false, message: "Category or Subcategory not found" });
    }

    // Prepare query object since queries is an array
    const newQuery = {
      query: query, // Assuming the query comes as a single string from the request
      createdAt: new Date(),
    };

    // Create the ticket using the user ID
    const newTicket = new Ticket({
      user: user.id, // Use user.id instead of user._id
      queries: [newQuery], // Create ticket with the queries array
      category,
      subCategory,
      solutions: [], // Initially, the solutions array is empty
    });

    // Save the new ticket to the database
    await newTicket.save();

    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      ticket: newTicket,
    });
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Get all tickets for the logged-in user
const getUserTickets = async (req, res) => {
  const user = req.user;

  try {
    // Find tickets created by the user
    const tickets = await Ticket.find({ user: user.id })
      .populate({
        path: "category",
        select: "name",
      })
      .populate({
        path: "subCategory",
        select: "name riskLevel",
      })
      .sort({ createdAt: -1 });

    if (tickets.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No tickets found for this user" });
    }

    res.json({ success: true, tickets });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Get all tickets (Admin view)
const getAllTickets = async (req, res) => {
  try {
    // Find all tickets
    const tickets = await Ticket.find()
      .populate({
        path: "category",
        select: "name",
      })
      .populate({
        path: "subCategory",
        select: "name riskLevel",
      })
      .sort({ createdAt: -1 });

    if (tickets.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No tickets found" });
    }

    res.json({ success: true, tickets });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Get a specific ticket by its ID
const getTicketById = async (req, res) => {
  const { ticketId } = req.params;

  try {
    const ticket = await Ticket.findById(ticketId)
      .populate({
        path: "category",
        select: "name",
      })
      .populate({
        path: "subCategory",
        select: "name riskLevel",
      });

  
      

    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });
    }

    res.json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Update the status of a ticket (e.g., to 'In Progress', 'Resolved', etc.)
const updateTicketStatus = async (req, res) => {
  const { ticketId } = req.params;
  const { status } = req.body;

  try {
    // Validate the status
    const validStatuses = ["Open", "Awaited", "Resolved", "Closed"];
    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });
    }

    ticket.status = status;
    await ticket.save();

    res.json({
      success: false,
      message: "Ticket status updated successfully",
      ticket,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Escalate the ticket (e.g., escalate from teamMember to manager, etc.)
const escalateTicket = async (req, res) => {
  const { ticketId } = req.params;
  const { escalatedTo } = req.body;

  try {
    // Validate the escalation level
    const validEscalationLevels = ["teamMember", "manager", "admin"];
    if (!validEscalationLevels.includes(escalatedTo)) {
      return res.status(400).json({ message: "Invalid escalation level" });
    }

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Check if escalation is already at the highest level
    if (ticket.escalatedTo === "admin") {
      return res
        .status(400)
        .json({ message: "Ticket is already escalated to the highest level" });
    }

    // Ensure the escalation is sequential
    const escalationOrder = ["teamMember", "manager", "admin"];
    const currentEscalationIndex = escalationOrder.indexOf(
      ticket.escalatedTo || "teamMember"
    );
    const requestedEscalationIndex = escalationOrder.indexOf(escalatedTo);

    if (requestedEscalationIndex !== currentEscalationIndex + 1) {
      return res.status(400).json({
        message:
          "Escalation must follow the sequence: teamMember → manager → admin",
      });
    }

    // Update the escalation details
    ticket.escalatedTo = escalatedTo;
    ticket.escalationTime = new Date(); // Set the escalation time
    await ticket.save();

    res.json({ message: "Ticket escalated successfully", ticket });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Close a ticket
const closeTicket = async (req, res) => {
  const { ticketId } = req.params;

  try {
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.status = "Closed";
    await ticket.save();

    res.json({ message: "Ticket closed successfully", ticket });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const sendSolutionToTicket = async (req, res) => {
  const { ticketId } = req.params;
  const { solutionText } = req.body;
  const providedBy = req.user.id;

  // Validate input
  if (!solutionText) {
    return res.status(400).json({ message: "Solution text is required" });
  }

  try {
    // Check if the ticket exists
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Add solution to the ticket
    ticket.solutions.push({ solutionText, providedBy, createdAt: new Date() });
    await ticket.save();

    // Send success message and return the updated ticket
    res.status(200).json({
      success: true,
      message: "Solution added successfully!",
      ticket: ticket,
    });
  } catch (error) {
    console.error("Error adding solution:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server Error" });
  }
};

const sendQuery = async (req, res) => {
  const { ticketId } = req.params;
  const { query } = req.body;

  console.log(ticketId, query);

  // Validate input
  if (!query) {
    return res.status(400).json({ message: "Query text is required" });
  }

  try {
    // Check if the ticket exists
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Add query to the ticket
    ticket.queries.push({ query, createdAt: new Date() });
    await ticket.save();

    // Send success message and return the updated ticket
    res.status(200).json({
      success: true,
      message: "Query added successfully!",
      ticket: ticket,
    });
  } catch (error) {
    console.error("Error adding query:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server Error" });
  }
};

module.exports = {
  createTicket,
  getUserTickets,
  getAllTickets,
  getTicketById,
  updateTicketStatus,
  escalateTicket,
  closeTicket,
  sendSolutionToTicket,
  sendQuery,
};

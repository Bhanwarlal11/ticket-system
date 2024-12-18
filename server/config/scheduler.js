const schedule = require("node-schedule");
const Ticket = require("../models/Ticket.js");

// Configuration constants
const ESCALATION_INTERVAL_MINUTES = 1;
const AUTO_CLOSE_INTERVAL_MINUTES = 1;

// Helper function to update ticket escalation
const escalateTickets = async (currentRole, nextRole, escalationDuration) => {
  try {
    const now = new Date();

    const ticketsToEscalate = await Ticket.find({
      status: { $nin: ["Closed", "Resolved"] },
      escalatedTo: currentRole,
      escalationTime: { $lte: new Date(now - escalationDuration) },
    });

    for (const ticket of ticketsToEscalate) {
      ticket.escalatedTo = nextRole;
      ticket.escalationTime = now;
      await ticket.save();
      console.log(`Ticket ${ticket._id} escalated to ${nextRole}`);
    }
  } catch (error) {
    console.error(
      `Error escalating tickets from ${currentRole} to ${nextRole}:`,
      error.message
    );
  }
};

// Escalation logic
const checkEscalations = async () => {
  console.log("Running escalation check...");

  // Escalate to Manager
  await escalateTickets(
    "teamMember",
    "manager",
    ESCALATION_INTERVAL_MINUTES * 60 * 1000
  );

  // Escalate to Admin
  await escalateTickets(
    "manager",
    "admin",
    ESCALATION_INTERVAL_MINUTES * 60 * 1000
  );

  console.log("Escalation check completed.");
};

// Auto-close tickets
const autoCloseTickets = async () => {
  console.log("Running auto-close check...");
  try {
    const now = new Date(); // Get current date/time

    // Query for tickets that are not closed or resolved and have been updated more than 5 minutes ago
    const ticketsToClose = await Ticket.find({
      status: { $nin: ["Closed", "Resolved"] }, // Exclude "Closed" and "Resolved" tickets
      updatedAt: {
        $lte: new Date(now - 5 * 60 * 1000), // Ticket must have been updated more than 5 minutes ago
      },
    });

    // Loop through the tickets to close them
    for (const ticket of ticketsToClose) {
      // Add condition to check if ticket is not "Resolved" or "Closed"
      if (ticket.status !== "Resolved" && ticket.status !== "Closed") {
        ticket.status = "Closed"; // Update ticket status to "Closed"
        await ticket.save(); // Save the updated ticket
        console.log(`Ticket ${ticket._id} auto-closed.`); // Log the ticket ID
      }
    }
  } catch (error) {
    console.error("Error auto-closing tickets:", error.message); // Catch and log any errors
  }

  console.log("Auto-close check completed.");
};

// Start schedulers
console.log("Initializing schedulers...");

// Run escalation logic every 5 minutes
schedule.scheduleJob(
  `*/${ESCALATION_INTERVAL_MINUTES} * * * *`,
  checkEscalations
);

// Run auto-close logic every 2 minutes
schedule.scheduleJob(
  `*/${AUTO_CLOSE_INTERVAL_MINUTES} * * * *`,
  autoCloseTickets
);

console.log("Schedulers initialized.");

// Export for manual testing or triggering
module.exports = { checkEscalations, autoCloseTickets };

// const schedule = require("node-schedule");
// const Ticket = require("../models/Ticket.js");

// const checkEscalations = async () => {
//   const now = new Date();

//   // Escalate to Manager
//   const toManager = await Ticket.find({
//     status: { $ne: "Closed" },
//     escalatedTo: "teamMember",
//     escalationTime: { $lte: new Date(now - 1 * 60 * 1000) }, // 5 minutes
//   });

//   for (const ticket of toManager) {
//     ticket.escalatedTo = "manager";
//     ticket.escalationTime = now;
//     await ticket.save();
//   }

//   // Escalate to Admin
//   const toAdmin = await Ticket.find({
//     status: { $ne: "Closed" },
//     escalatedTo: "manager",
//     escalationTime: { $lte: new Date(now - 1 * 60 * 1000) }, // 5 minutes
//   });

//   for (const ticket of toAdmin) {
//     ticket.escalatedTo = "admin";
//     ticket.escalationTime = now;
//     await ticket.save();
//   }
// };

// const autoCloseTickets = async () => {
//   const now = new Date();

//   const ticketsToClose = await Ticket.find({
//     status: { $ne: "Closed" },
//     "solutions.createdAt": { $lte: new Date(now - 60 * 60 * 1000) }, // 1 hour
//   });

//   for (const ticket of ticketsToClose) {
//     ticket.status = "Closed";
//     await ticket.save();
//   }
// };
// console.log("Scheduler started");

// // Schedule jobs
// // schedule.scheduleJob("* * * * *", checkEscalations); // Runs every minute
// // schedule.scheduleJob("*/5 * * * *", autoCloseTickets); // Runs every 5 minutes

// setInterval(checkEscalations, 5000); // 5000ms = 5 seconds
// schedule.scheduleJob("*/2 * * * *", autoCloseTickets);

// console.log("Jobs scheduled");

// module.exports = { checkEscalations, autoCloseTickets };

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
      status: { $ne: "Closed" },
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
    const now = new Date();

    const ticketsToClose = await Ticket.find({
      status: { $ne: "Closed" },
      // updatedAt: { $lte: new Date(now - 60 * 60 * 1000) }, // 1 hour
      updatedAt: { $lte: new Date(now - 5 * 60 * 1000) }, // 5 min
    });

    for (const ticket of ticketsToClose) {
      ticket.status = "Closed";
      await ticket.save();
      console.log(`Ticket ${ticket._id} auto-closed.`);
    }
  } catch (error) {
    console.error("Error auto-closing tickets:", error.message);
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

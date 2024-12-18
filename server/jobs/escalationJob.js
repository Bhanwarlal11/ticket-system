const cron = require("node-cron");
const Ticket = require("../models/Ticket");

const escalationJob = () => {
  cron.schedule("0 * * * *", async () => {
    // Runs every hour
    console.log("Running the ticket escalation job...");

    try {
      const tickets = await Ticket.find({
        status: { $ne: "Resolved" }, // Not resolved
        dueDate: { $lt: new Date() }, // Past due date
      });

      const escalationOrder = ["teamMember", "manager", "admin"];

      for (const ticket of tickets) {
        const currentEscalationIndex = escalationOrder.indexOf(ticket.escalatedTo || "teamMember");

        if (currentEscalationIndex < escalationOrder.length - 1) {
          // Escalate to the next level
          ticket.escalatedTo = escalationOrder[currentEscalationIndex + 1];
          ticket.escalationTime = new Date();
          await ticket.save();

          console.log(`Escalated ticket ID: ${ticket._id} to ${ticket.escalatedTo}`);
        }
      }
    } catch (error) {
      console.error("Error running escalation job:", error.message);
    }
  });
};

module.exports = {escalationJob};

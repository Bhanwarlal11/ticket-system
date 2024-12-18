const checkEscalation = async (req, res, next) => {
  const { ticketId } = req.params;

  try {
    const ticket = await Ticket.findById(ticketId).populate("assignedTo");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Define escalation order
    const escalationOrder = ["teamMember", "manager", "admin"];
    const currentRoleIndex = escalationOrder.indexOf(ticket.escalatedTo || "teamMember");

    // Check if the ticket needs escalation
    if (
      ticket.status !== "Resolved" && // Only escalate unresolved tickets
      ticket.dueDate < new Date() && // Escalate only if due date has passed
      currentRoleIndex < escalationOrder.length - 1 // Ensure there's a higher level to escalate to
    ) {
      ticket.escalatedTo = escalationOrder[currentRoleIndex + 1]; // Escalate to the next role
      ticket.escalationTime = new Date();
      await ticket.save();

      return res.status(200).json({ message: "Ticket automatically escalated", ticket });
    }

    next(); // Proceed to the next middleware or controller if no escalation is needed
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {checkEscalation};

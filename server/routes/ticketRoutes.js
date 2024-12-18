const express = require("express");
const router = express.Router();
// const { protectRoute } = require('../controllers/authController');
const { authenticateJWT } = require("../middlewares/auth.js");
// const {checkEscalation}  = require('../middlewares/escalateMiddleware.js')

const ticketController = require("../controllers/ticketController");

// Route to create a new ticket
router.post("/create", authenticateJWT, ticketController.createTicket);

// Route to get all tickets for the logged-in user
router.get("/", authenticateJWT, ticketController.getUserTickets);

// Route to get all tickets (admin can view all tickets)
router.get("/all", authenticateJWT, ticketController.getAllTickets);

// Route to get a specific ticket by its ID
router.get(
  "/:ticketId",
  authenticateJWT,
  //   checkEscalation,
  ticketController.getTicketById
);

// Route to update the status of a ticket
router.put(
  "/:ticketId/status",
  authenticateJWT,
  ticketController.updateTicketStatus
);

// Route to escalate a ticket
// router.put(
//   "/:ticketId/escalate",
//   authenticateJWT,
//   ticketController.escalateTicket
// );

// Route to close a ticket
router.put("/:ticketId/close", authenticateJWT, ticketController.closeTicket);

// 2. **sendSolutionRoute** - To add a solution to a ticket
router.post(
  "/:ticketId/solution",
  authenticateJWT,
  ticketController.sendSolutionToTicket
);

// 1. **sendQueryRoute** - To add a query to a ticket
router.post(
  "/:ticketId/query",
  authenticateJWT,
  ticketController.sendQuery
);

module.exports = router;

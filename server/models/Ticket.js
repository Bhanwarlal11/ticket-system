const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    queries: [
      {
        query: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    status: {
      type: String,
      enum: ["Open", "Awaited", "Resolved", "Closed"],
      default: "Open",
    },
    solutions: [
      {
        solutionText: {
          type: String,
          required: false, // You can decide if this should be required or not
        },
        providedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: false, // This is optional in case the solution doesn't come from a specific user
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    escalatedTo: {
      type: String,
      enum: ["teamMember", "manager", "admin"],
      default: "teamMember",
      required: false,
    },
    // escalationTime: {
    //   type: Date,
    //   required: false,
    // },
    escalationTime: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;

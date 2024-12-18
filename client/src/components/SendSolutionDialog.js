import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

const SendSolutionDialog = ({ open, onClose, onSubmit }) => {
  const [solution, setSolution] = useState("");

  const handleSolutionChange = (event) => {
    setSolution(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(solution); // Pass solution to the parent component
    onClose(); // Close dialog after submitting
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Send Solution</DialogTitle>
      <DialogContent>
        {/* Solution Input Field */}
        <TextField
          label="Solution"
          value={solution}
          onChange={handleSolutionChange}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "1rem" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SendSolutionDialog;

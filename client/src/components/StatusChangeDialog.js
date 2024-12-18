import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const StatusChangeDialog = ({ open, onClose, onSubmit, currentStatus }) => {
  const [status, setStatus] = useState(currentStatus || "");

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(status);
    onClose(); // Close dialog after submitting
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Change Status</DialogTitle>
      <DialogContent>
        {/* Status Select Field */}
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Status</InputLabel>
          <Select value={status} onChange={handleStatusChange} label="Status">
            <MenuItem value="Awaited">Awaited</MenuItem>
            <MenuItem value="Resolved">Resolved</MenuItem>
            <MenuItem value="Closed">Closed</MenuItem>
          </Select>
        </FormControl>
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

export default StatusChangeDialog;

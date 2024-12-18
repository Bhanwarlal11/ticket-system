import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

const CreateCategoryDialog = ({ open, onClose, onSubmit }) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    onSubmit(name);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Category</DialogTitle>
      <DialogContent>
        <TextField
          label="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

export default CreateCategoryDialog;



import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getCategories } from "../api/api.js"; // Assuming the API function is in this path

const CreateSubcategoryDialog = ({ open, onClose, onSubmit }) => {
  const [subcategoryName, setSubcategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Fetch categories when the dialog is opened
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data.categories); // Assuming response has a 'categories' key
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    if (open) {
      fetchCategories();
    }
  }, [open]); // Only run the effect when the dialog is opened

  const handleSubmit = () => {
    onSubmit(subcategoryName, selectedCategory, riskLevel);
    onClose(); // Close the dialog after submitting
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Subcategory</DialogTitle>
      <DialogContent>
        {/* Subcategory Name Input */}
        <TextField
          label="Subcategory Name"
          value={subcategoryName}
          onChange={(e) => setSubcategoryName(e.target.value)}
          fullWidth
          sx={{ marginBottom: "1rem" }}
        />

        {/* Category Dropdown */}
        <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Category"
            disabled={loading} // Disable while loading categories
          >
            {loading ? (
              <MenuItem disabled>
                <CircularProgress size={24} />
              </MenuItem>
            ) : (
              categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>

        {/* Risk Level Dropdown */}
        <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
          <InputLabel>Risk Level</InputLabel>
          <Select
            value={riskLevel}
            onChange={(e) => setRiskLevel(e.target.value)}
            label="Risk Level"
          >
          {/*  enum: ['Low', 'Medium', 'High'], */}
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
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

export default CreateSubcategoryDialog;

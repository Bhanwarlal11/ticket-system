import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Alert,
} from "@mui/material";
import { getCategories } from "../api/api"; // Assuming getCategories is defined in your API file

const CreateSolutionDialog = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    solutionText: "",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state for categories
  const [error, setError] = useState(""); // Track error state for form submission

  // Fetch categories and subcategories on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const categoryResponse = await getCategories(); // Fetch categories from API
        setCategories(categoryResponse.data.categories); // Assuming the data is in 'categories'
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories.");
      } finally {
        setLoading(false); // Stop loading even if there's an error
      }
    };

    if (open) {
      loadData();
    }
  }, [open]);

  // Handle form data changes (category, subcategory, and solution text)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission to create a new solution
  const validateFormData = () => {
    if (!formData.category || !formData.subcategory || !formData.solutionText) {
      setError("All fields are required.");
      return false;
    }
    return true;
  };

  // External submit (called by parent component or passed down as prop)
  const handleSubmit = () => {
    if (validateFormData()) {
      onSubmit(formData.subcategory, formData.solutionText); // Pass form data back to parent
      setFormData({ category: "", subcategory: "", solutionText: "" }); // Reset form
      onClose(); // Close the dialog
    }
  };

  // Helper function to render categories
  const renderCategories = () => {
    return categories.map((category) => (
      <MenuItem key={category._id} value={category._id}>
        {category.name}
      </MenuItem>
    ));
  };

  // Helper function to render subcategories based on selected category
  const renderSubcategories = () => {
    const selectedCategory = categories.find(
      (category) => category._id === formData.category
    );
    return selectedCategory
      ? selectedCategory.subcategories.map((subcategory) => (
          <MenuItem key={subcategory._id} value={subcategory._id}>
            {subcategory.name}
          </MenuItem>
        ))
      : [];
  };

  if (loading) {
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Loading Data...</DialogTitle>
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Solution</DialogTitle>
      <DialogContent>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Error Message */}
          {error && <Alert severity="error">{error}</Alert>}

          {/* Category Dropdown */}
          <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              label="Category"
              required
            >
              {renderCategories()}
            </Select>
          </FormControl>

          {/* Subcategory Dropdown */}
          <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
            <InputLabel>Subcategory</InputLabel>
            <Select
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              label="Subcategory"
              required
              disabled={!formData.category} // Disable until a category is selected
            >
              {renderSubcategories()}
            </Select>
          </FormControl>

          {/* Solution Input */}
          <TextField
            label="Solution Text"
            name="solutionText"
            value={formData.solutionText}
            onChange={handleChange}
            fullWidth
            required
            sx={{ marginBottom: "1rem" }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateSolutionDialog;

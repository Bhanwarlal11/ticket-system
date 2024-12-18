// import React, { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   MenuItem,
//   Button,
//   Box,
// } from "@mui/material";
// import { getCategories } from "../api/api";

// const AddNewTicket = ({ open, handleClose }) => {
//   const [formData, setFormData] = useState({
//     query: "",
//     category: "",
//     subcategory: "",
//   });

//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true); // Track loading state

//   // Fetch categories and subcategories on component mount
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         // Fetch categories (including subcategories) from the backend
//         const categoryResponse = await getCategories();
//         setCategories(categoryResponse.data.categories); // Assuming categories are under 'categories'

//         setLoading(false); // Set loading to false once data is loaded
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//         setLoading(false); // Stop loading even if there's an error
//       }
//     };

//     loadData();
//   }, []);
//   // const categories = [
//   //   { value: 'Authentication', label: 'Authentication' },
//   //   { value: 'Backend', label: 'Backend' },
//   //   { value: 'Frontend', label: 'Frontend' },
//   // ];

//   const subcategories = {
//     Authentication: [
//       "Login Issue",
//       "Password Reset",
//       "Two-Factor Authentication",
//     ],
//     Backend: ["Server Error", "Database Issue", "API Failure"],
//     Frontend: ["Design Issue", "Responsive Issue", "UI Bug"],
//   };

//   // handle category change
//   const handleCategoryChange = (event) => {
//     const selectedCategoryId = event.target.value;
//     setFormData((prev) => ({
//       ...prev,
//       category: selectedCategoryId,
//       subcategory: "", // Reset subcategory when category is changed
//     }));
//   };

//   // Handle subcategory change
//   const handleSubcategoryChange = (event) => {
//     const selectedSubcategoryId = event.target.value;
//     setFormData((prev) => ({
//       ...prev,
//       subcategory: selectedSubcategoryId,
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle form submission
//   const handleSubmit = () => {
//     handleAddTicket(formData); // Pass data to the parent component
//     setFormData({ query: "", category: "", subcategory: "" }); // Reset the form
//     handleClose(); // Close the dialog
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
//       <DialogTitle>Add New Ticket</DialogTitle>
//       <DialogContent>
//         <Box
//           sx={{ display: "flex", flexDirection: "column", gap: "1rem", mt: 1 }}
//         >
//           {/* Query Input */}
//           <TextField
//             label="Query"
//             name="query"
//             value={formData.query}
//             onChange={handleChange}
//             fullWidth
//             required
//           />

//           {/* Category Dropdown */}
//           <TextField
//             label="Category"
//             name="category"
//             select
//             value={formData.category}
//             onChange={handleChange}
//             fullWidth
//             required
//           >
//             {categories.map((option) => (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </TextField>

//           {/* Subcategory Dropdown */}
//           <TextField
//             label="Subcategory"
//             name="subcategory"
//             select
//             value={formData.subcategory}
//             onChange={handleChange}
//             fullWidth
//             required
//             disabled={!formData.category} // Disable until a category is selected
//           >
//             {(subcategories[formData.category] || []).map((option) => (
//               <MenuItem key={option} value={option}>
//                 {option}
//               </MenuItem>
//             ))}
//           </TextField>
//         </Box>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose} color="secondary">
//           Cancel
//         </Button>
//         <Button onClick={handleSubmit} variant="contained" color="primary">
//           Submit
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AddNewTicket;

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { getCategories } from "../api/api"; // Assuming getCategories is defined in your API file
import { createTicket } from "../api/api"; // Assuming createTicket is the API call function

const AddNewTicket = ({ open, handleClose, setSuccessMessage }) => {
  const [formData, setFormData] = useState({
    query: "",
    category: "",
    subcategory: "",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state for categories
  const [error, setError] = useState(""); // Track error state for form submission

  // Fetch categories and subcategories on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const categoryResponse = await getCategories(); // Fetch categories from API
        console.log(categoryResponse);

        setCategories(categoryResponse.data.categories); // Assuming the data is in 'categories'
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories.");
        setLoading(false); // Stop loading even if there's an error
      }
    };

    loadData();
  }, []);

  // Handle form data changes (both category and subcategory)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission to create a new ticket
  const handleNewTicket = async () => {
    if (!formData.query || !formData.category || !formData.subcategory) {
      setError("All fields are required.");
      return;
    }

    try {
      // Assuming `createTicket` is an API function to create a ticket
      await createTicket(
        formData.query,
        formData.category,
        formData.subcategory
      );
      setSuccessMessage("Ticket created successfully!");
      setFormData({ query: "", category: "", subcategory: "" }); // Reset form after successful submission
      handleClose(); // Close the dialog after submission
    } catch (error) {
      console.error("Error creating ticket:", error);
      setError("Failed to create ticket.");
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
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Loading Data...</DialogTitle>
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Ticket</DialogTitle>
      <DialogContent>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: "1rem", mt: 1 }}
        >
          {/* Error Message */}
          {error && <Alert severity="error">{error}</Alert>}

          {/* Query Input */}
          <TextField
            label="Query"
            name="query"
            value={formData.query}
            onChange={handleChange}
            fullWidth
            required
          />

          {/* Category Dropdown */}
          <TextField
            label="Category"
            name="category"
            select
            value={formData.category}
            onChange={handleChange}
            fullWidth
            required
          >
            {renderCategories()}
          </TextField>

          {/* Subcategory Dropdown */}
          <TextField
            label="Subcategory"
            name="subcategory"
            select
            value={formData.subcategory}
            onChange={handleChange}
            fullWidth
            required
            disabled={!formData.category} // Disable until a category is selected
          >
            {renderSubcategories()}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleNewTicket} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewTicket;

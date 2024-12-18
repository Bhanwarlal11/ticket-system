// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Button,
//   TextField,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
// } from "@mui/material";

// const QuerySendDialog = ({ open, onClose, onSubmit }) => {
//   const [query, setQuery] = useState("");
//   const [status, setStatus] = useState("");

//   const handleQueryChange = (event) => {
//     setQuery(event.target.value);
//   };

//   const handleStatusChange = (event) => {
//     setStatus(event.target.value);
//   };

//   const handleSubmit = () => {
//     onSubmit(query, status);
//     onClose(); // Close dialog after submitting
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Send Query</DialogTitle>
//       <DialogContent>
//         {/* Query Input Field */}
//         <TextField
//           label="Query"
//           value={query}
//           onChange={handleQueryChange}
//           variant="outlined"
//           fullWidth
//           sx={{ marginBottom: "1rem" }}
//         />

//         {/* Status Select Field */}
//         <FormControl variant="outlined" fullWidth>
//           <InputLabel>Status</InputLabel>
//           <Select value={status} onChange={handleStatusChange} label="Status">
//             <MenuItem value="Pending">Pending</MenuItem>
//             <MenuItem value="Resolved">Resolved</MenuItem>
//             <MenuItem value="In Progress">In Progress</MenuItem>
//           </Select>
//         </FormControl>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="secondary">
//           Cancel
//         </Button>
//         <Button onClick={handleSubmit} color="primary">
//           Submit
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default QuerySendDialog;




import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField
} from "@mui/material";

const QuerySendDialog = ({ open, onClose, onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };



  const handleSubmit = () => {
    onSubmit(query);
    onClose(); // Close dialog after submitting
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Send Query</DialogTitle>
      <DialogContent>
        {/* Query Input Field */}
        <TextField
          label="Query"
          value={query}
          onChange={handleQueryChange}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "1rem" }}
        />

        {/* Status Select Field */}
    
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

export default QuerySendDialog;

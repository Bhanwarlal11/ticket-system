import { Container, Grid, Paper } from "@mui/material";
import React from "react";
import UserRegistrationLineChart from "./UserRegistrationLineChart";
import TicketStatusPieChart from "./TicketStatusPieChart";
import RolePieChart from "./RolePieChart";
import TicketBarChart from "./TicketBarChart";

const Charts = () => {
  return (
    <Container maxWidth="lg" sx={{display:"flex", flexDirection:"column", gap:"3rem"}}>
      {/* First Row: Bar Chart & Pie Charts */}
      <Grid
        container
        spacing={3}
        sx={{
          width: "100%",
          margin: "0 auto",
          justifyContent: "space-between",
          
        }}
      >
        {/* Ticket Bar Chart (60% width) */}
        <Grid item xs={12} sm={6} md={6} lg={8}>

            <TicketBarChart />
        </Grid>

        {/* Ticket Status Pie Chart (20% width) */}
        <Grid item xs={12} sm={6} md={6} lg={4}>
       
            <TicketStatusPieChart />
        </Grid>
      </Grid>

      {/* Second Row: Line Chart & Pie Chart */}
      <Grid
        container
        spacing={3}
        sx={{
          width: "100%",
          margin: "0 auto",
          justifyContent: "space-between",
        }}
      >
        {/* User Registration Line Chart (60% width) */}
        <Grid item xs={12} sm={6} md={6} lg={8}>
 
            <UserRegistrationLineChart />
        </Grid>

        {/* Ticket Status Pie Chart (20% width) */}
        <Grid item xs={12} sm={6} md={6} lg={4}>
       
            <RolePieChart />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Charts;

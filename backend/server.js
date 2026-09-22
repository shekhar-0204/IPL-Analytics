const express = require("express");
const cors = require("cors");

const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

const PORT = 5000;


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api", analyticsRoutes);


// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "IPL Analytics API is running"
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
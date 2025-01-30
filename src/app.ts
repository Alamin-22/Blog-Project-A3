import express from "express";
import cors from "cors";

const app = express();

const mollik = "mollik";


// Middleware
app.use(cors());
app.use(express.json());

// Application routes

// for Products Routs
// app.use("/api/products", productsRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("StorySync Server is running");
});

export default app;

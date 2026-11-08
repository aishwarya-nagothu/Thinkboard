import express from "express";
import notesRoutes from "./notesRoutes.js";
import {connectDB} from "../config/db.js";
import dotenv from "dotenv";
import rateLimiter from "../middleware/rateLimiter.js";
import cors from "cors";
dotenv.config();
//console.log(process.env.MONGO_URI);
const app = express();
const PORT = process.env.PORT || 5001;
// allows Express to read JSON sent by frontend
app.use(express.json());
app.use(rateLimiter); // Apply rate limiting middleware to all routes
app.use(cors({
  origin : "http://localhost:5173", // Allow requests from this origin
}));
app.use((req, res, next) => {
  console.log(`Req method is ${req.method} and req url is ${req.url}`);
  next();
});
app.use("/api/notes", notesRoutes);

connectDB().then(()=>{ // Connect to MongoDB
app.listen(PORT, () => {
  console.log("server started on PORT :" + PORT);
})
});

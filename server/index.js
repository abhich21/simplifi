import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {connectDB} from "./utils/db.js"
import UserRoutes from "./routes/User.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user/", UserRoutes);

// error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong"; // for form data
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });


  const startServer = async () => {
    try {
      connectDB();
      app.listen(8080, () => console.log("Server started on port 8080"));
    } catch (error) {
      console.log(error);
    }
  };

  startServer();
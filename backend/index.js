import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import barberRoutes from "./routes/barber.js";
import serviceRoutes from "./routes/servise.js";
import appointmentRoutes from "./routes/appointment.js";
import pool from "./db/db.js"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/barber", barberRoutes);
app.use("/service", serviceRoutes);
app.use("/appointment", appointmentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

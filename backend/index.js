import express from "express";
import serverless from "serverless-http";
import dotenv from "dotenv";
import cors from "cors";

import barberRoutes from "./routes/barber.js";
import serviceRoutes from "./routes/service.js";
import appointmentRoutes from "./routes/appointment.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Подключаем роуты
app.use("/barber", barberRoutes);
app.use("/service", serviceRoutes);
app.use("/appointment", appointmentRoutes);

// 🔹 Если локально
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// 🔹 Если на Vercel (serverless)
export default serverless(app);

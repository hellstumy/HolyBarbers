import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import barberRoutes from "./routes/barber.js";
import serviceRoutes from "./routes/servise.js"; // исправил опечатку "servise"
import appointmentRoutes from "./routes/appointment.js";
import pool, { initDb } from "./db/db.js"; // импортируем initDb

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

(async () => {
  try {
    // Инициализация таблиц перед стартом сервера
    await initDb();

    // Роуты
    app.use("/barber", barberRoutes);
    app.use("/service", serviceRoutes);
    app.use("/appointment", appointmentRoutes);

    // Старт сервера
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err);
  }
})();

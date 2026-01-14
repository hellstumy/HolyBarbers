import express from 'express';
import barberRoutes from './routes/barber.js';  
import serviceRoutes from './routes/servise.js';  
import appointmentRoutes from './routes/appointment.js';
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// TODO : Import and use user routes
// app.use('/user', _)  

app.use('/barber', barberRoutes)  

app.use("/servise", serviceRoutes);  

app.use("/appointment", appointmentRoutes);  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
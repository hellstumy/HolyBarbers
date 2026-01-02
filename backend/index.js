import express from 'express';
import barberRoutes from './routes/barber.js';  
import serviceRoutes from './routes/servise.js';  

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// TODO : Import and use user routes
// app.use('/user', _)  

app.use('/barber', barberRoutes)  

app.use("/servise", serviceRoutes);  // TODO : Import and use service routes

// app.use('/appointment', _)  // TODO : Import and use appointment routes

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
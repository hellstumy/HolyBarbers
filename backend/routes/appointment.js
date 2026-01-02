import express from 'express';
import appointments from '../fakeDataBase/appointments.js';
import barbers from '../fakeDataBase/barbers.js';
import services from '../fakeDataBase/servise.js';

const router = express.Router();
const DateNow = new Date();

// Get All Appointments
router.get('/', (req, res) => {
  res.json(appointments);
}); 

// Create a New Appointment
router.post('/createAppointment', (req, res) => {
  res.send('Create a new appointment');
}); // TODO : Implement appointment routes here

// Update an Appointment
router.put('/:id', (req, res) => {
  res.send(`Update appointment with ID ${req.params.id}`);
}); // TODO : Implement appointment routes here

// Delete an Appointment
router.delete('/:id', (req, res) => {
  res.send(`Delete appointment with ID ${req.params.id}`);
}); // TODO : Implement appointment routes here

export default router;// TODO : Implement appointment routes here
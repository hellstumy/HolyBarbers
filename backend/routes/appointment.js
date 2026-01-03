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
router.post("/createAppointment", (req, res) => {
  const { barberId, serviceId, appointmentDate, name, contact } = req.body;

  

  const barber = barbers.find((b) => b.id === barberId);
  const service = services.find((s) => s.id === serviceId);
  const appointmentDateObj = new Date(appointmentDate);
  const now = new Date();

  if (!barber) {
    return res.status(400).json({ error: "Invalid barber ID" });
  }

  if (!service) {
    return res.status(400).json({ error: "Invalid service ID" });
  }

  if (isNaN(appointmentDateObj.getTime()) || appointmentDateObj < now) {
    return res.status(400).json({ error: "Invalid appointment date" });
  }

  if (!name || !contact) {
    return res.status(400).json({ error: "User data is required" });
  }

  const newAppointment = {
    id: appointments.at(-1)?.id + 1 || 1,
    barberId,
    serviceId,
    userData: { name, contact },
    dateTime: appointmentDateObj.toISOString(),
    status: "confirmed",
  };
  barber.appointments.push(newAppointment);
  appointments.push(newAppointment);
  res.status(201).json(newAppointment);
});

// Update an Appointment
router.put('/:id', (req, res) => {
  const appointmentId = parseInt(req.params.id);
  const appointmentIndex = appointments.findIndex(a => a.id === appointmentId);
  if (appointmentIndex !== -1) {
    appointments[appointmentIndex] = { ...appointments[appointmentIndex], ...req.body };
    res.send('Appointment updated successfully');
  } else {
    res.status(404).send('Appointment not found');
  }

  // AUTODELETE status 'cancelled' and 'completed' after 10 sec by setTimeout
  const appointment = appointments[appointmentIndex];
  if (appointment.status === 'cancelled' || appointment.status === 'completed') {
    setTimeout(() => {
      const index = appointments.findIndex(a => a.id === appointment.id);
      if (index !== -1) {
        appointments.splice(index, 1);
      }
    }, 10000);
  }
}); 

// Delete an Appointment
router.delete('/:id', (req, res) => {
  const appointmentId = parseInt(req.params.id);
  const appointmentIndex = appointments.findIndex(a => a.id === appointmentId);
  if (appointmentIndex !== -1) {
    appointments.splice(appointmentIndex, 1);
    res.send('Appointment deleted successfully');
  } else {
    res.status(404).send('Appointment not found');
  }
}); 

export default router;
import express from 'express';
import pool from '../db/db.js';

const router = express.Router();

// Get All Appointments
router.get('/', async(req, res) => {
    const appointments = await pool.query("SELECT * FROM appointments");
    res.json(appointments.rows);
});
// Get Appointment by Phone Number //JOIN with barber, client and service tables to get names
router.get('/byContact/:contact', async(req, res) => {
    const contact = req.params.contact;
    const appointments = await pool.query(
        `SELECT a.*, b.name AS barber_name, s.name AS service_name 
         FROM appointments a
         JOIN barbers b ON a.barber_id = b.id
         JOIN service s ON a.service_id = s.id
         WHERE a.client_contact = $1`, 
        [contact]
    );
    res.json(appointments.rows);
});

// Get Appointment by Barber ID //JOIN with barber and service tables to get names
router.get('/byBarber/:barberId', async(req, res) => {
    const barberId = req.params.barberId;
    const appointments = await pool.query(
        `SELECT a.*, b.name AS barber_name, s.name AS service_name 
         FROM appointments a
         JOIN barbers b ON a.barber_id = b.id
         JOIN service s ON a.service_id = s.id
         WHERE a.barber_id = $1`, 
        [barberId]
    );
    res.json(appointments.rows);
});

// Create a New Appointment 
router.post("/createAppointment", async(req, res) => {
    const { barberId, serviceId, appointmentDate, appointment_time, name, contact } = req.body;
    const newAppointment = await pool.query(
        "INSERT INTO appointments (barber_id, service_id, appointment_date, appointment_time, client_name, client_contact) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [barberId, serviceId, appointmentDate, appointment_time, name, contact]
    );
    res.json(newAppointment.rows[0]);
});

// Update an Appointment
router.put("/:id", async (req, res) => {
  const appointmentId = Number(req.params.id);
  const {
    barberId,
    serviceId,
    appointmentDate,
    appointment_time,
    name,
    contact,
    status,
  } = req.body;

  // логируем для дебага
  console.log("Updating appointment ID:", appointmentId);
  console.log("Body:", req.body);

  try {
    const result = await pool.query(
      `UPDATE appointments
       SET barber_id = $1,
           service_id = $2,
           appointment_date = $3,
           appointment_time = $4,
           client_name = $5,
           client_contact = $6,
           status = COALESCE($7, status)
       WHERE id = $8
       RETURNING *`,
      [
        barberId,
        serviceId,
        appointmentDate,
        appointment_time,
        name,
        contact,
        status, // если не передан, останется прежним
        appointmentId,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const appointment = result.rows[0];
    res.json(appointment);

    // автoудаление через 10 секунд, если статус завершён или отменён
    if (
      appointment.status === "cancelled" ||
      appointment.status === "completed"
    ) {
      setTimeout(async () => {
        try {
          await pool.query("DELETE FROM appointments WHERE id = $1", [
            appointmentId,
          ]);
          console.log(`Appointment ${appointmentId} deleted automatically`);
        } catch (err) {
          console.error("Auto-delete error:", err.message);
        }
      }, 86400 * 1000); // 24 часа
    }
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete an Appointment
router.delete('/:id', async (req, res) => {
  const appointmentId = parseInt(req.params.id);
  const deletedAppointment = await pool.query(
    "DELETE FROM appointments WHERE id = $1 RETURNING *",
    [appointmentId]
  );
  if (deletedAppointment.rows.length === 0) {
    res.status(404).json({ message: "Appointment not found" });
  } else {
    res.json({ message: "Appointment deleted successfully" });
  }
});

export default router;
import express from "express";
import pool from "../db/db.js";

const router = express.Router();

// GET all appointments with barber and service names
router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT
        a.id,
        a.appointment_date::date AS appointment_date,
        a.appointment_time,
        a.client_name,
        a.client_contact,
        a.status,
        b.name AS barber_name,
        s.name AS service_name
      FROM appointments a
      JOIN barber b ON a.barber_id = b.id
      JOIN service s ON a.service_id = s.id
      ORDER BY a.appointment_date, a.appointment_time
    `);
    res.json(rows);
  } catch (err) {
    console.error("GET /appointment error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// GET appointments by contact
router.get("/byContact/:contact", async (req, res) => {
  try {
    const { contact } = req.params;
    const { rows } = await pool.query(
      `
      SELECT
        a.id,
        a.appointment_date::date AS appointment_date,
        a.appointment_time,
        a.client_name,
        a.client_contact,
        a.status,
        b.name AS barber_name,
        s.name AS service_name
      FROM appointments a
      JOIN barber b ON a.barber_id = b.id
      JOIN service s ON a.service_id = s.id
      WHERE a.client_contact = $1
      ORDER BY a.appointment_date, a.appointment_time
    `,
      [contact]
    );
    res.json(rows);
  } catch (err) {
    console.error("GET /appointment/byContact error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// GET appointments by barber ID
router.get("/byBarber/:barberId", async (req, res) => {
  try {
    const barberId = Number(req.params.barberId);
    const { rows } = await pool.query(
      `
      SELECT
        a.id,
        a.appointment_date::date AS appointment_date,
        a.appointment_time,
        a.client_name,
        a.client_contact,
        a.status,
        b.name AS barber_name,
        s.name AS service_name
      FROM appointments a
      JOIN barber b ON a.barber_id = b.id
      JOIN service s ON a.service_id = s.id
      WHERE a.barber_id = $1
      ORDER BY a.appointment_date, a.appointment_time
    `,
      [barberId]
    );
    res.json(rows);
  } catch (err) {
    console.error("GET /appointment/byBarber error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// POST create new appointment
router.post("/createAppointment", async (req, res) => {
  try {
    const {
      barberId,
      serviceId,
      appointmentDate,
      appointmentTime,
      name,
      contact,
    } = req.body;
    const { rows } = await pool.query(
      `
      INSERT INTO appointments (barber_id, service_id, appointment_date, appointment_time, client_name, client_contact)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *`,
      [barberId, serviceId, appointmentDate, appointmentTime, name, contact]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error("POST /appointment error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT update appointment
router.put("/:id", async (req, res) => {
  try {
    const appointmentId = Number(req.params.id);
    const {
      barberId,
      serviceId,
      appointmentDate,
      appointmentTime,
      name,
      contact,
      status,
    } = req.body;

    const { rows } = await pool.query(
      `
      UPDATE appointments
SET barber_id = COALESCE($1, barber_id),
    service_id = COALESCE($2, service_id),
    appointment_date = COALESCE($3, appointment_date),
    appointment_time = COALESCE($4, appointment_time),
    client_name = COALESCE($5, client_name),
    client_contact = COALESCE($6, client_contact),
    status = COALESCE($7, status)
WHERE id = $8
RETURNING *`,
      [
        barberId,
        serviceId,
        appointmentDate,
        appointmentTime,
        name,
        contact,
        status,
        appointmentId,
      ],
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Not found" });

    const appointment = rows[0];
    res.json(appointment);
  } catch (err) {
    console.error("PUT /appointment/:id error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE appointment
router.delete("/:id", async (req, res) => {
  try {
    const appointmentId = Number(req.params.id);
    const { rows } = await pool.query(
      "DELETE FROM appointments WHERE id=$1 RETURNING *",
      [appointmentId]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Not found" });
    res.json({ message: "Appointment deleted successfully" });
  } catch (err) {
    console.error("DELETE /appointment/:id error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

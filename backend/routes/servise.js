import express from "express";
import pool from "../db/db.js";

const router = express.Router();

// GET all services
router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM service");
    res.json(rows);
  } catch (err) {
    console.error("GET /service error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// GET service by ID
router.get("/:id", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM service WHERE id = $1", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("GET /service/:id error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// POST new service
router.post("/createService", async (req, res) => {
  try {
    const { name, price, duration, is_active } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO service (name, price, duration, is_active) VALUES ($1,$2,$3,$4) RETURNING *`,
      [name, price, duration, is_active]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error("POST /service error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT update service
router.put("/:id", async (req, res) => {
  try {
    const serviceId = Number(req.params.id);
    const { name, price, duration, is_active } = req.body;

    const { rows } = await pool.query(
      `UPDATE service
       SET name = $1,
           price = $2,
           duration = $3,
           is_active = $4
       WHERE id = $5
       RETURNING *`,
      [name, price, duration, is_active, serviceId]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("PUT /service/:id error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE service
router.delete("/:id", async (req, res) => {
  try {
    const serviceId = Number(req.params.id);
    const { rows } = await pool.query(
      "DELETE FROM service WHERE id = $1 RETURNING *",
      [serviceId]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Not found" });
    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    console.error("DELETE /service/:id error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

import express from "express";
import pool from "../db/db.js";

const router = express.Router();

// GET all barbers
router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM barber");
    res.json(rows);
  } catch (err) {
    console.error("GET /barber error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// GET barber by ID
router.get("/:id", async (req, res) => {
  try {
    const barberId = Number(req.params.id);
    const { rows } = await pool.query("SELECT * FROM barber WHERE id = $1", [
      barberId,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Barber not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("GET /barber/:id error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// POST new barber
router.post("/createBarber", async (req, res) => {
  try {
    const { name, experiance, is_active = true, img_url = "" } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO barber (name, experiance, is_active, img_url)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [name, experiance, is_active, img_url]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error("POST /barber/createBarber error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT update barber
router.put("/:id", async (req, res) => {
  try {
    const barberId = Number(req.params.id);
    const { name, experiance, is_active, img_url } = req.body;

    const { rows } = await pool.query(
      `UPDATE barber
       SET name = $1,
           experiance = $2,
           is_active = $3,
           img_url = $4
       WHERE id = $5
       RETURNING *`,
      [name, experiance, is_active, img_url, barberId]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Barber not found" });

    res.json(rows[0]);
  } catch (err) {
    console.error("PUT /barber/:id error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE barber
router.delete("/:id", async (req, res) => {
  try {
    const barberId = Number(req.params.id);
    const { rows } = await pool.query(
      "DELETE FROM barber WHERE id = $1 RETURNING *",
      [barberId]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Barber not found" });

    res.json({ message: "Barber deleted successfully", barber: rows[0] });
  } catch (err) {
    console.error("DELETE /barber/:id error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

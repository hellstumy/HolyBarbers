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
    const { rows } = await pool.query("SELECT * FROM barber WHERE id = $1", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("GET /barber/:id error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// POST new barber
router.post("/createBarber", async (req, res) => {
  try {
    const { name, experiance, is_active, img_url } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO barber (name, experiance, is_active, img_url) VALUES ($1,$2,$3,$4) RETURNING *`,
      [name, experiance, is_active, img_url]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error("POST /barber error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

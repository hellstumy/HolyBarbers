import express from "express";
import pool from "../db/db.js";

const router = express.Router();

// GET barbers
router.get("/", async(req, res) => {
  const barbers = await pool.query("SELECT * FROM barbers");
  res.json(barbers.rows);
});

// GET a specific barber by ID
router.get("/:id", async(req, res) => {
    const barber = await pool.query("SELECT * FROM barbers WHERE id = $1", [req.params.id]);
    if (barber.rows.length === 0) {
        res.status(404).send("Barber not found");
    } else {
        res.json(barber.rows[0]);
    }
});

// POST a new barber
router.post("/createBarber", async(req, res) => {
    const { name, experiance, rating } = req.body;
    const newBarber = await pool.query(
      "INSERT INTO barbers (name, experiance, rating) VALUES ($1, $2, $3) RETURNING *",
      [name, experiance, rating]
    );
    res.json(newBarber.rows[0]);
});

//  PUT update a barber
router.put("/:id", async(req, res) => {
    const barberId = parseInt(req.params.id);
    const { name, experiance, rating, is_active } = req.body;
    const updatedBarber = await pool.query(
      "UPDATE barbers SET name = $1, experiance = $2, rating = $3, is_active = $4 WHERE id = $5 RETURNING *",
      [name, experiance, rating, is_active, barberId]
    );
    res.json(updatedBarber.rows[0]);
});

// DELETE a barber
router.delete("/:id", async(req, res) => {
    const barberId = parseInt(req.params.id);
    await pool.query("DELETE FROM barbers WHERE id = $1", [barberId]);
    res.send("Barber deleted successfully");
});

export default router;

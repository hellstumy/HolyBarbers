import express from "express";
import pool from "../db/db.js";

const router = express.Router();

// GET barbers
router.get("/", async (req, res) => {
  try {
    const barbers = await pool.query("SELECT * FROM barbers");
    res.json(barbers.rows);
  } catch (err) {
    res.status(500).send("Server error");
  }
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
// POST a new barber
router.post("/createBarber", async (req, res) => {
  try {
    const { name, experiance, is_active, img_url } = req.body;

    const newBarber = await pool.query(
      `INSERT INTO barbers (name, experiance, is_active, "img_url")
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, experiance, is_active, img_url]
    );

    res.json(newBarber.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// PUT update a barber
router.put("/:id", async (req, res) => {
  try {
    const barberId = Number(req.params.id);
    const { name, experiance, is_active, img_url } = req.body;

    const updatedBarber = await pool.query(
      `UPDATE barbers
       SET name = $1,
           experiance = $2,
           is_active = $3,
           "img_url" = $4
       WHERE id = $5
       RETURNING *`,
      [name, experiance, is_active, img_url, barberId]
    );

    if (updatedBarber.rows.length === 0) {
      return res.status(404).send("Barber not found");
    }

    res.json(updatedBarber.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// DELETE a barber
router.delete("/:id", async (req, res) => {
  try {
    const barberId = Number(req.params.id);

    const result = await pool.query(
      "DELETE FROM barbers WHERE id = $1 RETURNING *",
      [barberId]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Barber not found");
    }

    res.send("Barber deleted successfully");
  } catch (err) {
    res.status(500).send("Server error");
  }
});


export default router;

import express from 'express';
import pool from '../db/db.js';

const router = express.Router();

// GET services
router.get('/', async (req, res) => {
  const services = await pool.query("SELECT * FROM service");
  res.json(services.rows);
});

// Create a new service
router.post('/createService', async(req, res) => {
    const { name, duration, price} = req.body;
    const newService =  await pool.query(
      "INSERT INTO service (name, duration, price) VALUES ($1, $2, $3) RETURNING *",
      [name, duration, price]
    );
    res.json(newService.rows[0]);
});

// Update a service
router.put("/:id", async(req, res) => {
    const serviceId = parseInt(req.params.id);
    const { name, duration, price } = req.body;
    const updatedService = await pool.query(
      "UPDATE service SET name = $1, duration = $2, price = $3 WHERE id = $4 RETURNING *",
      [name, duration, price, serviceId]
    );
    res.json(updatedService.rows[0]);
});


// Delete a service
router.delete('/:id', async(req, res) => {
    const serviceId = parseInt(req.params.id);
    await pool.query("DELETE FROM service WHERE id = $1", [serviceId]);
    res.send("Service deleted successfully");
});

export default router;
import express from "express";
import barbers from "../fakeDataBase/barbers.js";

const router = express.Router();

// GET barbers
router.get("/", (req, res) => {
  res.json(barbers);
});

// GET a specific barber by ID
router.get("/:id", (req, res) => {
    const barberId = parseInt(req.params.id);
    const barber = barbers.find(b => b.id === barberId);
    if (barber) {
        res.json(barber);
    } else {
        res.status(404).send("Barber not found");
    }
});

// POST a new barber
router.post("/createBarber", (req, res) => {
    const id = barbers.length ? barbers[barbers.length - 1].id + 1 : 1;
    const newBarber = {id, ...req.body};
    barbers.push(newBarber);
  res.send("Create a new barber").status(201);
});

//  PUT update a barber
router.put("/:id", (req, res) => {
    const barberId = parseInt(req.params.id);
    const barberIndex = barbers.findIndex(b => b.id === barberId);
    if (barberIndex !== -1) {
        barbers[barberIndex] = { ...barbers[barberIndex], ...req.body };
        res.send("Barber updated successfully");
    } else {
        res.status(404).send("Barber not found");
    }
});

// DELETE a barber
router.delete("/:id", (req, res) => {
    const barberId = parseInt(req.params.id);
    const barberIndex = barbers.findIndex(b => b.id === barberId);
    if (barberIndex !== -1) {
        barbers.splice(barberIndex, 1);
        res.send("Barber deleted successfully");
    } else {
        res.status(404).send("Barber not found");
    } 
});

export default router;

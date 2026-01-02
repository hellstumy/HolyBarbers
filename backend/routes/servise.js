import express from 'express';
import services from '../fakeDataBase/servise.js';

const router = express.Router();

// GET services
router.get('/', (req, res) => {
  res.json(services);
});

// Create a new service
router.post('/createService', (req, res) => {
  const id = services.length ? services[services.length - 1].id + 1 : 1;
    const newService = { id, ...req.body };
    services.push(newService);
  res.status(201).send('Create a new service');
});

export default router;
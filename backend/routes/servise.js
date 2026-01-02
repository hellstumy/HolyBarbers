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
    const newService = { id, ...req.body, isActive: true };
    services.push(newService);
  res.status(201).send('Create a new service');
});

// Update a service
router.put('/:id', (req, res) => {
    const serviceId = parseInt(req.params.id);
    const serviceIndex = services.findIndex(s => s.id === serviceId);
    if (serviceIndex !== -1) {
        services[serviceIndex] = { ...services[serviceIndex], ...req.body };
        res.send('Service updated successfully');
    } else {
        res.status(404).send('Service not found');
    }
});

// Delete a service
router.delete('/:id', (req, res) => {
    const serviceId = parseInt(req.params.id);
    const serviceIndex = services.findIndex(s => s.id === serviceId);   
    if (serviceIndex !== -1) {
        services.splice(serviceIndex, 1);
        res.send('Service deleted successfully');
    } else {
        res.status(404).send('Service not found');
    }
});

export default router;
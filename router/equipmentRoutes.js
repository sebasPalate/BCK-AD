const express = require('express');
const router = express.Router();

// Ruta para obtener todos los equipos
const Equipment = require('../models/equipment');
const equipment = new Equipment();

router.get('/equipments', async (req, res) => {
    try {
        const equipments = await equipment.getAll();
        res.json(equipments);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta para obtener un equipo por su id
router.get('/equipments/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const equipments = await equipment.getOne(id);
        res.json(equipments);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
})

// Ruta para crear un equipo
router.post('/equipments', async (req, res) => {
    const { nombre, descripcion, cantidad } = req.body;

    try {
        await equipment.create(nombre, descripcion, cantidad);
        res.json({ message: 'Equipo creado' });
    } catch (error) {
        console.error('Error en la creación:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta para actualizar un equipo
router.put('/equipments/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, cantidad } = req.body;

    try {
        await equipment.update(id, nombre, descripcion, cantidad);
        res.json({ message: 'Equipo actualizado' });
    } catch (error) {
        console.error('Error en la actualización:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta para eliminar un equipo
router.delete('/equipments/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await equipment.delete(id);
        res.json({ message: 'Equipo eliminado' });
    } catch (error) {
        console.error('Error en la eliminación:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});
const express = require('express');
const router = express.Router();

const Equipment = require('../models/equipment');
const equipment = new Equipment();

// Ruta para obtener todos los equipos
router.get('/equipments', async (req, res) => {
    try {
        const equipments = await equipment.getAll();
        res.json(equipments);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Obtener Equipos Disponibles
router.get('/equipmentsAvailable', async (req, res) => {
    try {
        const equipments = await equipment.equipmentsAvailable();
        res.json(equipments);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta para obtener un equipo por su id
router.get('/equipments/:id_equipo', async (req, res) => {
    const { id_equipo } = req.params;

    try {
        const equipments = await equipment.getOne(id_equipo);
        res.json(equipments);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
})

// Ruta para crear un equipo
router.post('/equipments', async (req, res) => {
    const { nombre, marca, caracteristicas, estado } = req.body;

    try {
        await equipment.create(nombre, marca, caracteristicas, estado);
        res.json({ message: 'Equipo añadido' });
    } catch (error) {
        console.error('Error en la creación:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta para actualizar un equipo
router.put('/equipments/:id_equipo', async (req, res) => {
    const { id_equipo } = req.params;
    const { nombre, marca, caracteristicas, estado } = req.body;

    try {
        await equipment.update(id_equipo, nombre, marca, caracteristicas, estado);
        res.json({ message: 'Equipo actualizado' });
    } catch (error) {
        console.error('Error en la actualización:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta para eliminar un equipo
router.delete('/equipments/:id_equipo', async (req, res) => {
    const { id_equipo } = req.params;

    try {
        await equipment.delete(id_equipo);
        res.json({ message: 'Equipo eliminado' });
    } catch (error) {
        console.error('Error en la eliminación:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

module.exports = router;
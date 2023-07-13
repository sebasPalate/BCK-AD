const express = require('express');
const router = express.Router();

const Equipment = require('../models/equipment');
const equipment = new Equipment();

// ---------- GETS ----------

// Ruta Obtener Equipos
router.get('/equipments', async (req, res) => {
    try {
        const equipments = await equipment.getAll();
        res.json(equipments);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta Obtener Equipos Disponibles
router.get('/equipmentsAvailable', async (req, res) => {
    try {
        const equipments = await equipment.equipmentsAvailable();
        res.json(equipments);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta Obtener Equipos Disponiblles Funcionales
router.get('/equipmentsAvailableFunctional', async (req, res) => {
    try {
        const equipments = await equipment.equipmentsAvailableFunctional();
        res.json(equipments);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta Obtener Equipo ID
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


// ---------- POSTS ----------

// Ruta Crear Equipo
router.post('/equipments', async (req, res) => {
    const { nombre_equipo, marca, caracteristicas, estado } = req.body;

    try {
        await equipment.create(nombre_equipo, marca, caracteristicas, estado);
        res.json({ message: 'Equipo Añadido!' });
    } catch (error) {
        console.error('Error en la creación:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});


// ---------- PUTS ----------

// Ruta Actualizar Equipo
router.put('/equipments/:id_equipo', async (req, res) => {
    const { id_equipo } = req.params;
    const { nombre_equipo, marca, caracteristicas, estado } = req.body;

    try {
        await equipment.update(id_equipo, nombre_equipo, marca, caracteristicas, estado);
        res.json({ message: 'Equipo Actualizado!' });
    } catch (error) {
        console.error('Error en la actualización:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// ---------- DELETE ----------

// Ruta Eliminar Equipo ID
router.delete('/equipments/:id_equipo', async (req, res) => {
    const { id_equipo } = req.params;

    try {
        await equipment.delete(id_equipo);
        res.json({ message: 'Equipo Eliminado!' });
    } catch (error) {
        console.error('Error en la eliminación:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

module.exports = router;
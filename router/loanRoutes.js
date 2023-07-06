const express = require('express');
const router = express.Router();

const Loan = require('../models/loan');
const loan = new Loan();

// Ruta para obtener todos los prestamos
router.get('/loans', async (req, res) => {
    try {
        const loans = await loan.getAll();
        res.json(loans);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta para obtener un prestamo por su id
router.get('/loans/:id_prestamo', async (req, res) => {
    const { id_prestamo } = req.params;

    try {
        const loan = await equipment.getOne(id_prestamo);
        res.json(loan);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
})

// Ruta para crear un prestamo
router.post('/loans', async (req, res) => {
    const { id_equipo_per, fecha_prestamo, fecha_devolucion, id_usuario_presta_per, id_usuario_solicita_per, observaciones, estado_equipo, estado } = req.body;

    try {
        await equipment.create(id_equipo_per, fecha_prestamo, fecha_devolucion, id_usuario_presta_per, id_usuario_solicita_per, observaciones, estado_equipo, estado);
        res.json({ message: 'Prestamo añadido' });
    } catch (error) {
        console.error('Error en la creación:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta para actualizar un prestamo
router.put('/loans/:id_prestamo', async (req, res) => {
    const { id_prestamo } = req.params;
    const { id_equipo_per, fecha_prestamo, fecha_devolucion, id_usuario_presta_per, id_usuario_solicita_per, observaciones, estado_equipo, estado } = req.body;

    try {
        await equipment.update(id_equipo_per, fecha_prestamo, fecha_devolucion, id_usuario_presta_per, id_usuario_solicita_per, observaciones, estado_equipo, estado, id_prestamo);
        res.json({ message: 'Prestamo actualizado' });
    } catch (error) {
        console.error('Error en la actualización:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta para eliminar un prestamo
router.delete('/loans/:id_prestamo', async (req, res) => {
    const { id_prestamo } = req.params;

    try {
        await equipment.delete(id_prestamo);
        res.json({ message: 'Prestamo eliminado' });
    } catch (error) {
        console.error('Error en la eliminación:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

module.exports = router;
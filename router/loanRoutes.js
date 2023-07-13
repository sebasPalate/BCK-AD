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

// Ruta para obtener todos los prestamos con el nombre del equipo y el nombre del usuario
router.get('/loans/names', async (req, res) => {
    try {
        const loans = await loan.getAllWithNames();
        res.json(loans);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta para obtener todos los prestamos pendientes
router.get('/loans/pendientes', async (req, res) => {
    try {
        const loans = await loan.getAllPendientes();
        res.json(loans);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta para aprobar un prestamo
router.put('/loans/aprobar/:id_prestamo', async (req, res) => {
    const { id_prestamo } = req.params;
    const { id_usuario_presta_per } = req.body;

    try {
        await loan.approve(id_prestamo, id_usuario_presta_per);
        res.json({ message: 'Prestamo Aprobado!' });
    } catch (error) {
        console.error('Error en la actualización:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta para rechazar un prestamo
router.put('/loans/rechazar/:id_prestamo', async (req, res) => {
    const { id_prestamo } = req.params;

    try {
        await loan.reject(id_prestamo);
        res.json({ message: 'Prestamo Rechazado!' });
    } catch (error) {
        console.error('Error en la actualización:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta para devolver un prestamo
router.put('/loans/devolver/:id_prestamo', async (req, res) => {
    const { id_prestamo } = req.params;
    const { observaciones } = req.body;

    try {
        await loan.return(id_prestamo, observaciones);
        res.json({ message: 'Prestamo Devuelto!' });
    } catch (error) {
        console.error('Error en la actualización:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta para obtener un prestamo por su id
router.get('/loans/:id_prestamo', async (req, res) => {
    const { id_prestamo } = req.params;

    try {
        const loans = await loan.getOne(id_prestamo);
        res.json(loans);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
})

// Ruta para crear un prestamo
router.post('/loans', async (req, res) => {
    const { id_equipo_per, id_usuario_solicita_per } = req.body;

    try {
        await loan.create(id_equipo_per, id_usuario_solicita_per);
        res.json({ message: 'Prestamo Solicitado!' });
    } catch (error) {
        console.error('Error en la creación:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta para actualizar un prestamo
router.put('/loans/:id_prestamo', async (req, res) => {
    const { id_prestamo } = req.params;
    const { id_equipo_per, fecha_prestamo, fecha_devolucion, id_usuario_presta_per, id_usuario_solicita_per, observaciones, estado } = req.body;

    try {
        await loan.update(id_prestamo, id_equipo_per, fecha_prestamo, fecha_devolucion, id_usuario_presta_per, id_usuario_solicita_per, observaciones, estado);
        res.json({ message: 'Prestamo Actualizado!' });
    } catch (error) {
        console.error('Error en la actualización:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta para eliminar un prestamo
router.delete('/loans/:id_prestamo', async (req, res) => {
    const { id_prestamo } = req.params;

    try {
        await loan.delete(id_prestamo);
        res.json({ message: 'Prestamo Eliminado!' });
    } catch (error) {
        console.error('Error en la eliminación:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

module.exports = router;
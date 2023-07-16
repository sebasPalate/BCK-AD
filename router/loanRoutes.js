const express = require('express');
const router = express.Router();

const Loan = require('../models/loan');
const loan = new Loan();

// ---------- GETS ----------


// Ruta Obtener Prestamos
router.get('/loans', async (req, res) => {
    try {
        const loans = await loan.getAll();
        res.json(loans);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta Obtener Prestamos Pendientes
router.get('/loans/pendientes', async (req, res) => {
    try {
        const loans = await loan.getAllPendientes();
        res.json(loans);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta Obtener Prestamos con el Nombre del Equipo y el Nombre del Usuario
router.get('/loans/names', async (req, res) => {
    try {
        const loans = await loan.getAllWithNames();
        res.json(loans);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta Obtener Prestamo por su ID
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


// ---------- POSTS ----------

// Ruta Crear una Solicitud Prestamo
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


// ---------- PUTS ----------

// Ruta Aprobar Prestamo ID
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

// Ruta Rechazar Prestamo ID
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

// Ruta Devolver Prestamo ID
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

// Ruta Cancelar Prestamo ID
router.put('/loans/cancelar/:id_prestamo', async (req, res) => {
    const { id_prestamo } = req.params;

    try {
        await loan.cancel(id_prestamo);
        res.json({ message: 'Prestamo Cancelado!' });
    } catch (error) {
        console.error('Error en la actualización:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta Actualizar Prestamo
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


// ---------- DELETES ----------

// Ruta Eliminar Prestamo ID
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


// Ruta Obtener Equipos de un Usuario
router.get('/loans/user/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;

    try {
        const loans = await loan.getAllByUser(id_usuario);
        res.json(loans);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
})


module.exports = router;
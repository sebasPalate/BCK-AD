const express = require('express');
const router = express.Router();

const User = require('../models/user');
const user = new User();

// Ruta de registro
router.post('/register', async (req, res) => {
  const { cedula, nombre, apellido, correo, contraseña } = req.body;

  try {
    await user.register(cedula, nombre, apellido, correo, contraseña);
    res.json({ message: 'Registro exitoso' });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
  const { cedula, contraseña } = req.body;

  try {
    const isAuthenticated = await user.authenticate(cedula, contraseña);
    if (isAuthenticated) {
      res.json({ message: 'Inicio de sesión exitoso' });
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;

// Ruta para obtener todos los usuarios
router.get('/users', async (req, res) => {
  try {
    const users = await user.getAll();
    res.json(users);
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Ruta para obtener un usuario por su cédula
router.get('/users/:cedula', async (req, res) => {
  const { cedula } = req.params;

  try {
    const users = await user.getOne(cedula);
    res.json(users);
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Ruta para actualizar un usuario
router.put('/users/:cedula', async (req, res) => {
  const { cedula } = req.params;
  const { nombre, apellido, correo, contraseña } = req.body;

  try {
    await user.update(cedula, nombre, apellido, correo, contraseña);
    res.json({ message: 'Usuario actualizado' });
  } catch (error) {
    console.error('Error en la actualización:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Ruta para eliminar un usuario
router.delete('/users/:cedula', async (req, res) => {
  const { cedula } = req.params;

  try {
    await user.delete(cedula);
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    console.error('Error en la eliminación:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
})
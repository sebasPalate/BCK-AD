// user.js
const mysql = require('mysql2');

const DB = require('../DB');
const db = new DB();


class User {
  constructor() {
    this.connection = db.connection;
  }

  // ---------- GETS ----------

  // Obtener Usuarios
  getAll() {
    const sql = 'SELECT * FROM usuario';

    return new Promise((resolve, reject) => {
      this.connection.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.length > 0 ? result : null);
        }
      });
    });
  }

  // Obtener Usuario Cédula
  getOne(cedula) {
    const sql = 'SELECT * FROM usuario WHERE cedula = ?';
    const values = [cedula];

    return new Promise((resolve, reject) => {
      this.connection.query(sql, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.length > 0 ? result[0] : null);
        }
      });
    });
  }

  // ---------- POST ----------

  // Crear Usuario
  register(cedula, nombre, apellido, rol, correo, contrasena) {
    const sql = `
      INSERT INTO usuario (cedula, nombre, apellido, rol, correo, contrasena)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [cedula, nombre, apellido, rol, correo, contrasena];

    return new Promise((resolve, reject) => {
      this.connection.query(sql, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.insertId);
        }
      });
    });
  }

  // Inicio Sesión
  authenticate(correo, contrasena) {
    const sql = 'SELECT * FROM usuario WHERE correo = ? AND contrasena = ?';
    const values = [correo, contrasena];

    return new Promise((resolve, reject) => {
      this.connection.query(sql, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.length > 0 ? result : null);
        }
      });
    });
  }


  // ---------- PUT ----------

  // Actualizar Usuario
  update(cedula, nombre, apellido, rol, correo, contrasena) {
    const sql = `
      UPDATE usuario SET nombre = ?, apellido = ?, rol = ?, correo = ?, contrasena = ?
      WHERE cedula = ?
    `;
    const values = [nombre, apellido, rol, correo, contrasena, cedula];

    return new Promise((resolve, reject) => {
      this.connection.query(sql, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }


  // ---------- DELETE ----------

  // Eliminar Usuario
  delete(cedula) {
    const sql = 'DELETE FROM usuario WHERE cedula = ?';
    const values = [cedula];

    return new Promise((resolve, reject) => {
      this.connection.query(sql, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }
}

module.exports = User;

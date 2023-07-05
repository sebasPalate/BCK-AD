// user.js
const mysql = require('mysql2');

const DB = require('../DB');
const db = new DB();


class User {
  constructor() {
    this.connection = db.connection;
  }

  createEquipment(nombre_equipo, descripcion_equipo, caracteristica, estado) {
    const sql = `
      INSERT INTO usuarios (nombre_equipo, descripcion_equipo, caracteristica, estado)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [nombre_equipo, descripcion_equipo, caracteristica, estado];

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

  getAll() {
    const sql = 'SELECT * FROM equipo';

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

  getOne(nombre) {
    const sql = 'SELECT * FROM usuarios WHERE nombre_equipo = ?';
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

  update(cedula, nombre, apellido, correo, contraseña) {
    const sql = `
      UPDATE usuarios SET nombre = ?, apellido = ?, correo = ?, contraseña = ?
      WHERE cedula = ?
    `;
    const values = [nombre, apellido, correo, contraseña, cedula];

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

  delete(cedula) {
    const sql = 'DELETE FROM usuarios WHERE cedula = ?';
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

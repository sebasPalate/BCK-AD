// user.js
const mysql = require('mysql2');

const DB = require('../DB');
const db = new DB();


class User {
  constructor() {
    this.connection = db.connection;
  }

  register(cedula, nombre, apellido, correo, contrasena, rol) {
    const sql = `
      INSERT INTO usuario (cedula, nombre, apellido, correo, contrasena, rol)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [cedula, nombre, apellido, correo, contrasena, rol];

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

  authenticate(cedula, contrasena) {
    const sql = 'SELECT id FROM usuarios WHERE cedula = ? AND contrasena = ?';
    const values = [cedula, contrasena];

    return new Promise((resolve, reject) => {
      this.connection.query(sql, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.length > 0);
        }
      });
    });
  }

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

  update(cedula, nombre, apellido, correo, contrasena, rol) {
    const sql = `
      UPDATE usuarios SET nombre = ?, apellido = ?, correo = ?, contrasena = ?, rol = ?
      WHERE cedula = ?
    `;
    const values = [nombre, apellido, correo, contrasena, cedula, rol];

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

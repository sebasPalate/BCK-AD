// equipment.js
const mysql = require('mysql2');

const DB = require('../DB');
const db = new DB();


class User {
  constructor() {
    this.connection = db.connection;
  }

  create(nombre, descripcion, caracteristicas, estado) {
    const sql = `
      INSERT INTO equipo (nombre, descripcion, caracteristicas, estado)
      VALUES (?, ?, ?, ?)
    `;
    const values = [nombre, descripcion, caracteristicas, estado];

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

  getOne(id_equipo) {
    const sql = 'SELECT * FROM equipo WHERE id_equipo = ?';
    const values = [id_equipo];

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

  update(id_equipo, nombre, descripcion, caracteristicas, estado) {
    const sql = `
      UPDATE equipo SET nombre = ?, descripcion = ?, caracteristicas = ?, estado = ?
      WHERE id_equipo = ?
    `;
    const values = [nombre, descripcion, caracteristicas, estado, id_equipo];

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

  delete(id_equipo) {
    const sql = 'DELETE FROM equipo WHERE id_equipo = ?';
    const values = [id_equipo];

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
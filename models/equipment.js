// equipment.js
const mysql = require('mysql2');

const DB = require('../DB');
const db = new DB();


class Equipment {
  constructor() {
    this.connection = db.connection;
  }

  create(nombre, marca, caracteristicas, estado) {
    const sql = `
      INSERT INTO equipo (nombre, marca, caracteristicas, estado)
      VALUES (?, ?, ?, ?)
    `;
    const values = [nombre, marca, caracteristicas, estado];

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

  equipmentsAvailable() {
    const sql = 'SELECT * FROM equipo WHERE estado = "DISPONIBLE" ';

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

  update(id_equipo, nombre, marca, caracteristicas, estado) {
    const sql = `
      UPDATE equipo SET nombre = ?, marca = ?, caracteristicas = ?, estado = ?
      WHERE id_equipo = ?
    `;
    const values = [nombre, marca, caracteristicas, estado, id_equipo];

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

module.exports = Equipment;

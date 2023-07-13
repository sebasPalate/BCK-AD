// equipment.js
const mysql = require('mysql2');

const DB = require('../DB');
const db = new DB();


class Equipment {
  constructor() {
    this.connection = db.connection;
  }

  // ---------- GETS ----------

  // Obtener Equipos
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

  // Obtener Equipos Disponibles
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

  // Obtener Equipos Disponibles Funcionales
  equipmentsAvailableFunctional() {
    const sql = 'SELECT * FROM equipo WHERE estado = "DISPONIBLE" AND caracteristicas = "FUNCIONAL" ';

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

  // Obtener Equipo ID
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


  // ---------- POSTS ----------
  // Crear Equipo
  create(nombre_equipo, marca, caracteristicas, estado) {
    const sql = `
      INSERT INTO equipo (nombre_equipo, marca, caracteristicas, estado)
      VALUES (?, ?, ?, ?)
    `;
    const values = [nombre_equipo, marca, caracteristicas, estado];

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


  // ---------- PUTS ----------

  // Actualizar Equipo
  update(id_equipo, nombre_equipo, marca, caracteristicas, estado) {
    const sql = `
      UPDATE equipo SET nombre_equipo = ?, marca = ?, caracteristicas = ?, estado = ?
      WHERE id_equipo = ?
    `;
    const values = [nombre_equipo, marca, caracteristicas, estado, id_equipo];

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
  // Eliminar Equipo
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

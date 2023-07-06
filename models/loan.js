// loan.js
const mysql = require('mysql2');

const DB = require('../DB');
const db = new DB();

class Loan {
    constructor() {
        this.connection = db.connection;
    }


    // Crear Prestamo
    create(id_equipo_per, fecha_prestamo, fecha_devolucion, id_usuario_presta_per, id_usuario_solicita_per, observaciones, estado_equipo, estado) {
        const sql = `
      INSERT INTO prestamo (id_equipo_per, fecha_prestamo, fecha_devolucion, id_usuario_presta_per, id_usuario_solicita_per, observaciones, estado_equipo, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

        const values = [id_equipo_per, fecha_prestamo, fecha_devolucion, id_usuario_presta_per, id_usuario_solicita_per, observaciones, estado_equipo, estado];

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

    // Obtener todos los prestamos
    getAll() {
        const sql = 'SELECT * FROM prestamo';

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

    // Obtener un prestamo
    getOne(id_prestamo) {
        const sql = 'SELECT * FROM prestamo WHERE id_prestamo = ?';
        const values = [id_prestamo];

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

    // Actualizar un prestamo
    update(id_prestamo, id_equipo_per, fecha_prestamo, fecha_devolucion, id_usuario_presta_per, id_usuario_solicita_per, observaciones, estado_equipo, estado) {
        const sql = `
        UPDATE prestamo SET id_equipo_per = ?, fecha_prestamo = ?, fecha_devolucion = ?, id_usuario_presta_per = ?, id_usuario_solicita_per = ?, observaciones = ?, estado_equipo = ?, estado = ?
        WHERE id_prestamo = ?
        `;
        const values = [id_equipo_per, fecha_prestamo, fecha_devolucion, id_usuario_presta_per, id_usuario_solicita_per, observaciones, estado_equipo, estado, id_prestamo];

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

    // Eliminar un prestamo
    delete(id_prestamo) {
        const sql = 'DELETE FROM prestamo WHERE id_prestamo = ?';
        const values = [id_prestamo];

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

module.exports = Loan;


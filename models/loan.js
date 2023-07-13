// loan.js
const mysql = require('mysql2');

const DB = require('../DB');
const db = new DB();

class Loan {
    constructor() {
        this.connection = db.connection;
    }

    // ---------- GETS ----------

    // Obtener Prestamos
    getAll() {
        const sql = 'SELECT * FROM prestamo';

        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.length > 0 ? result : { message: 'No hay Prestamos' });
                }
            });
        });
    }

    // Obtener Prestamos Pendientes
    getAllPendientes() {
        const sql = `SELECT
                        id_prestamo,
                        id_equipo_per,
                        id_usuario_solicita_per
                    FROM
                        prestamo
                    WHERE estado = "Pendiente"`;

        const values = ["Pendiente"];

        return new Promise((resolve, reject) => {
            this.connection.query(sql, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.length > 0 ? result : { "message": "No hay Prestamos Pendientes" });
                }
            });
        });
    }

    // Obtener Prestamos con el Nombre del Equipo y el Nombre del Usuario
    getAllWithNames() {
        const sql = `
            SELECT
                p.id_prestamo,
                e.nombre_equipo,
                e.marca,
                p.fecha_prestamo,
                u.nombre,
                u.apellido,
                p.fecha_devolucion,
                p.observaciones,
                p.estado
            FROM
                prestamo p
            INNER JOIN
                equipo e
            ON
                p.id_equipo_per = e.id_equipo
            INNER JOIN
                usuario u
            ON
                p.id_usuario_solicita_per = u.id_usuario
        `;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.length > 0 ? result : { "message": "No hay Prestamos" });
                }
            });
        });
    }

    // Obtener Prestamo ID
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

    


    // ---------- POSTS ----------

    // Crear Prestamo
    create(id_equipo_per, id_usuario_solicita_per) {
        const estado = "PENDIENTE";
        const id_usuario_presta_per = 1;

        const sql = `
            INSERT INTO prestamo (id_equipo_per, id_usuario_presta_per, id_usuario_solicita_per, estado) VALUES (?, ?, ?, ?)
        `;

        //const sql = `
        //  INSERT INTO prestamo (id_equipo_per, id_usuario_solicita_per, estado) VALUES (?, ?, ?)
        //`;

        const values = [id_equipo_per, id_usuario_presta_per, id_usuario_solicita_per, estado];

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

    // Aprobar Prestamo ID
    approve(id_prestamo, id_usuario_presta_per) {
        const fecha_prestamo = new Date().toDateString();
        const estado = "APROBADO";

        const sql = `
            UPDATE
                prestamo
            SET
                fecha_prestamo = ?, id_usuario_presta_per = ?,  estado = ?
            WHERE
                id_prestamo = ?
        `;

        const sql2 = `
            UPDATE
                equipo
            SET
                estado = 'PRESTADO'
            WHERE
                id_equipo = (SELECT id_equipo_per FROM prestamo WHERE id_prestamo = ?)
        `;

        const values = [fecha_prestamo, id_usuario_presta_per, estado, id_prestamo];
        const values2 = [id_prestamo];

        return new Promise((resolve, reject) => {
            this.connection.query(sql, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    this.connection.query(sql2, values2, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                }
            });
        });
    }

    // Rechazar Prestamo ID
    reject(id_prestamo) {
        const estado = "RECHAZADO";

        const sql = `
            UPDATE
                prestamo
            SET
                estado = ?
            WHERE
                id_prestamo = ?
        `;

        const values = [estado, id_prestamo];

        return new Promise((resolve, reject) => {
            this.connection.query(sql, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    // Devolver Prestamo ID
    return(id_prestamo, observaciones) {
        const fecha_devolucion = new Date().toDateString();

        const sql = `
            UPDATE
                prestamo
            SET
                fecha_devolucion = ?, observaciones = ?
            WHERE
                id_prestamo = ?
        `;

        const sql2 = `
            UPDATE
                equipo
            SET
                estado = 'DISPONIBLE'
            WHERE
                id_equipo = (SELECT id_equipo_per FROM prestamo WHERE id_prestamo = ?)
        `;
        const values = [fecha_devolucion, observaciones, id_prestamo];
        const values2 = [id_prestamo];

        return new Promise((resolve, reject) => {
            this.connection.query(sql, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    this.connection.query(sql2, values2, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                }
            });
        });
    }

    // Actualizar Prestamo
    update(id_prestamo, id_equipo_per, fecha_prestamo, fecha_devolucion, id_usuario_presta_per, id_usuario_solicita_per, observaciones, estado) {
        const sql = `
        UPDATE prestamo SET id_equipo_per = ?, fecha_prestamo = ?, fecha_devolucion = ?, id_usuario_presta_per = ?, id_usuario_solicita_per = ?, observaciones = ?, estado = ?
        WHERE id_prestamo = ?
        `;
        const values = [id_equipo_per, fecha_prestamo, fecha_devolucion, id_usuario_presta_per, id_usuario_solicita_per, observaciones, estado, id_prestamo];

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


    // ---------- DELETES ----------

    // Eliminar Prestamo ID
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


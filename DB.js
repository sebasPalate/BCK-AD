// db.js
const mysql = require('mysql2');

class DB {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'sebas1105',
      database: 'bck-ad'
    });
  }

  connect() {
    this.connection.connect((err) => {
      if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
      }

      console.log('Conexión exitosa a la base de datos MySQL');
    });
  }
}

module.exports = DB;
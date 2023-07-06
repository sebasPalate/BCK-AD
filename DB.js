// db.js
const mysql = require('mysql2');

class DB {
  constructor() {
    this.connection = mysql.createConnection({
      host: '34.151.203.189',
      user: 'bck-ad',
      password: 'bck-ad',
      database: 'bck-ad-data'
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
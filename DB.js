// db.js
const mysql = require('mysql2');

class DB {
  constructor() {
    this.connection = mysql.createConnection({
      //host: '34.151.203.189',
      //host: 'localhost',
      host: '34.172.141.114',
      port: '3306',
      //user: 'bck-ad',
      user: 'root',
      //password: 'bck-ad',
      //password: 'sebas1105',
      password: 'Distribuidas12345',
      database: 'bck-ad-bd'
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
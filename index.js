const express = require('express');
const app = express();
const port = 3000;

const DB = require('./DB');
const db = new DB();

db.connect();

// Configurar middlewares
app.use(express.json());

// Usar las rutas del usuario
const userRoutes = require('./router/userRoutes');
const equipmentRoutes = require('./router/equipmentRoutes');

app.use(equipmentRoutes);
app.use(userRoutes); 


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo correctamente`);
});

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

  
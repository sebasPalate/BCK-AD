const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

const DB = require('./DB');
const db = new DB();

db.connect();

// Configurar middlewares
app.use(cors());
app.use(express.json());

// Usar las rutas del usuario
const userRoutes = require('./router/userRoutes');
const equipmentRoutes = require('./router/equipmentRoutes');
const loanRoutes = require('./router/loanRoutes');

app.use(equipmentRoutes);
app.use(userRoutes); 
app.use(loanRoutes); 


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo correctamente`);
});

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

  
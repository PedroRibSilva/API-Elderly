require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./Routes/userRoutes');
const consultaRoutes = require('./Routes/consultaRoutes'); // Importar as rotas de consultas
const authRoutes = require('./Routes/authRoutes'); // Importar as rotas de autenticação

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB');
});

// Rotas básicas
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


// Usar rotas
app.use('/api', userRoutes);
app.use('/api/consultas', consultaRoutes); // Adicionando rotas de consultas
app.use('/api/auth', authRoutes)

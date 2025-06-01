const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pessoaRoutes = require('./routes/pessoaRoutes');
const formacaoRoutes = require('./routes/formacaoRoutes');
const experienciaRoutes = require('./routes/experienciaRoutes');
const habilidadeRoutes = require('./routes/habilidadeRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/pessoas', pessoaRoutes);
app.use('/formacoes', formacaoRoutes);
app.use('/experiencias', experienciaRoutes);
app.use('/habilidades', habilidadeRoutes);

app.get('/', (req, res) => {
  res.send('API do Currículo está no ar!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

module.exports = app;

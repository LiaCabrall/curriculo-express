const express = require('express');
const cors = require('cors');
const pool = require('../db');
require('dotenv').config();

const serverless = require('serverless-http');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API do Currículo está no ar!');
});

app.get('/pessoas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pessoa');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/pessoas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pessoa = await pool.query('SELECT * FROM pessoa WHERE id = $1', [id]);
    const formacao = await pool.query('SELECT * FROM formacao WHERE pessoa_id = $1', [id]);
    const experiencia = await pool.query('SELECT * FROM experiencia WHERE pessoa_id = $1', [id]);
    const habilidades = await pool.query('SELECT * FROM habilidade WHERE pessoa_id = $1', [id]);

    res.json({
      pessoa: pessoa.rows[0],
      formacao: formacao.rows,
      experiencia: experiencia.rows,
      habilidades: habilidades.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/pessoas', async (req, res) => {
  const { nome, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO pessoa (nome, email) VALUES ($1, $2) RETURNING *',
      [nome, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/pessoas/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;

  try {
    const result = await pool.query(
      'UPDATE pessoa SET nome = $1, email = $2 WHERE id = $3 RETURNING *',
      [nome, email, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Pessoa não encontrada' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/pessoas/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM formacao WHERE pessoa_id = $1', [id]);
    await pool.query('DELETE FROM experiencia WHERE pessoa_id = $1', [id]);
    await pool.query('DELETE FROM habilidade WHERE pessoa_id = $1', [id]);
    const result = await pool.query('DELETE FROM pessoa WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Pessoa não encontrada' });
    }

    res.json({ mensagem: 'Pessoa excluída com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports.handler = serverless(app);

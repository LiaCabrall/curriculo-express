const pool = require('../db');

exports.getAllPessoas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pessoa');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPessoaById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM pessoa WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Pessoa não encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPessoa = async (req, res) => {
  const { nome, email, telefone } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO pessoa (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, telefone]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePessoa = async (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone } = req.body;
  try {
    const result = await pool.query(
      'UPDATE pessoa SET nome = $1, email = $2, telefone = $3 WHERE id = $4 RETURNING *',
      [nome, email, telefone, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Pessoa não encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePessoa = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM pessoa WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Pessoa não encontrada' });
    }
    res.json({ mensagem: 'Pessoa excluída com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const pool = require('../db');

exports.getAllHabilidades = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM habilidade');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHabilidadeById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM habilidade WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Habilidade não encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createHabilidade = async (req, res) => {
  const { pessoa_id, nome, nivel } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO habilidade (pessoa_id, nome, nivel) VALUES ($1, $2, $3) RETURNING *',
      [pessoa_id, nome, nivel]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateHabilidade = async (req, res) => {
  const { id } = req.params;
  const { nome, nivel } = req.body;
  try {
    const result = await pool.query(
      'UPDATE habilidade SET nome = $1, nivel = $2 WHERE id = $3 RETURNING *',
      [nome, nivel, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Habilidade não encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteHabilidade = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM habilidade WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Habilidade não encontrada' });
    }
    res.json({ mensagem: 'Habilidade excluída com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

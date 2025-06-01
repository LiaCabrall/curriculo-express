const pool = require('../db');

exports.getAllFormacoes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM formacao');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFormacaoById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM formacao WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Formação não encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createFormacao = async (req, res) => {
  const { pessoa_id, curso, instituicao, ano_conclusao } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO formacao (pessoa_id, curso, instituicao, ano_conclusao) VALUES ($1, $2, $3, $4) RETURNING *',
      [pessoa_id, curso, instituicao, ano_conclusao]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFormacao = async (req, res) => {
  const { id } = req.params;
  const { curso, instituicao, ano_conclusao } = req.body;
  try {
    const result = await pool.query(
      'UPDATE formacao SET curso = $1, instituicao = $2, ano_conclusao = $3 WHERE id = $4 RETURNING *',
      [curso, instituicao, ano_conclusao, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Formação não encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFormacao = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM formacao WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Formação não encontrada' });
    }
    res.json({ mensagem: 'Formação excluída com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

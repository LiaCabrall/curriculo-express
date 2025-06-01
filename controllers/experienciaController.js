const pool = require('../db');

exports.getAllExperiencias = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM experiencia');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getExperienciaById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM experiencia WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Experiência não encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createExperiencia = async (req, res) => {
  const { pessoa_id, empresa, cargo, tempo } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO experiencia (pessoa_id, empresa, cargo, tempo) VALUES ($1, $2, $3, $4) RETURNING *',
      [pessoa_id, empresa, cargo, tempo]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateExperiencia = async (req, res) => {
  const { id } = req.params;
  const { empresa, cargo, tempo } = req.body;
  try {
    const result = await pool.query(
      'UPDATE experiencia SET empresa = $1, cargo = $2, tempo = $3 WHERE id = $4 RETURNING *',
      [empresa, cargo, tempo, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Experiência não encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteExperiencia = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM experiencia WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Experiência não encontrada' });
    }
    res.json({ mensagem: 'Experiência excluída com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

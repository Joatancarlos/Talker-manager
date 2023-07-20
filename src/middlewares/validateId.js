const readTalkers = require('../utils/readTalkers');

const validateId = async (req, res, next) => {
  const talkers = await readTalkers();
  const id = Number(req.params.id);
  const hasId = talkers.some((team) => team.id === id);
  if (!hasId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  next();
};

module.exports = validateId;
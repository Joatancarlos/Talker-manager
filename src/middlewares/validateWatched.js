const validateWatchedBody = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  if (!watchedAt || watchedAt === '') {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  const isFormatDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (!isFormatDate.test(watchedAt)) {
    return res.status(400).json(
      { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
    );
  }
  next();
};

const validateWatchedQuery = (req, res, next) => {
  const { date } = req.query;
  if (!date || date.length === 0) return next();
  const isFormatDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (!isFormatDate.test(date)) {
    return res.status(400).json(
      {
        message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"',
      },
    );
  }
  next();
};

module.exports = { validateWatchedBody, validateWatchedQuery };
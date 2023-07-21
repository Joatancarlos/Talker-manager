const readTalker = require('../utils/readTalkers');

const filterQuery = async (req, _res, next) => {
  const { q } = req.query;
  const talkers = await readTalker();
  const filteredByQ = talkers.filter((tk) => tk.name.includes(q));
  req.filteredTalkers = q ? filteredByQ : talkers;
  next();
};

const filterRate = (req, _res, next) => {
  const { rate } = req.query;
  const { filteredTalkers } = req;
  const filteredByRate = filteredTalkers.filter((tk) => tk.talk.rate === Number(rate));
  req.filteredTalkers = rate ? filteredByRate : filteredTalkers;
  next();
};

const filterDate = (req, res, next) => {
  const { date } = req.query;
  const { filteredTalkers } = req;
  const filteredByDate = filteredTalkers.filter((tk) => tk.talk.watchedAt === date);
  req.filteredTalkers = date ? filteredByDate : filteredTalkers;
  next();
};

module.exports = { filterQuery, filterRate, filterDate };
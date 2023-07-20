const express = require('express');
const readTalker = require('./utils/readTalkers');
const existId = require('./middlewares/existId');
const validateLogin = require('./middlewares/validateLogin');
const generateToken = require('./utils/generateToken');

// require('express-async-errors');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talkers = await readTalker();
  res.status(200).json(talkers);
});

app.get('/talker/:id', existId, async (req, res) => {
  const id = Number(req.params.id);
  const talkers = await readTalker();
  const talker = talkers.find((tk) => tk.id === id);
  res.status(200).json(talker);
});

app.post('/login', validateLogin, (req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});

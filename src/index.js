const express = require('express');
const fs = require('fs').promises;
const readTalker = require('./utils/readTalkers');
const generateToken = require('./utils/generateToken');

const validateId = require('./middlewares/validateId');
const validateLogin = require('./middlewares/validateLogin');
const validateToken = require('./middlewares/validateToken');
const validateName = require('./middlewares/validateName');
const validateAge = require('./middlewares/validateAge');
const validateTalk = require('./middlewares/validateTalk');
const validateWatched = require('./middlewares/validateWatched');
const validateRate = require('./middlewares/validateRate');

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

app.get('/talker/:id', validateId, async (req, res) => {
  const id = Number(req.params.id);
  const talkers = await readTalker();
  const talker = talkers.find((tk) => tk.id === id);
  res.status(200).json(talker);
});

app.post('/login', validateLogin, (req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

app.post('/talker', 
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatched,
  validateRate,
  async (req, res) => {
  try {
      const talkers = await readTalker();
      const id = talkers.length + 1;
      const { name, age, talk } = req.body;
      const newTalker = {
        name,
        age,
        id,
        talk,
      };
      const newTalkers = JSON.stringify([...talkers, newTalker]);
      await fs.writeFile('./src/talker.json', newTalkers);
      res.status(201).json(newTalker);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.put('/talker/:id', 
  validateToken,
  validateId,
  validateName,
  validateAge,
  validateTalk,
  validateWatched,
  validateRate,
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const talkers = await readTalker();
      const { name, age, talk } = req.body;
      const index = talkers.findIndex((tk) => tk.id === id);
      talkers[index] = { name, age, id, talk };
      console.log(talkers);
      const newTalkers = JSON.stringify(talkers);
      await fs.writeFile('./src/talker.json', newTalkers);
      res.status(200).json(talkers[index]);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
});

app.delete('/talker/:id', validateToken, validateId, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const talkers = await readTalker();
    const deleted = talkers.filter((tk) => tk.id !== id);
    const newTalkers = JSON.stringify(deleted);
    await fs.writeFile('./src/talker.json', newTalkers);
    res.status(204).end();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});

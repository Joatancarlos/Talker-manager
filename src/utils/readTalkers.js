const fs = require('fs').promises;

async function readTalker() {
  try {
    const content = await fs.readFile('./src/talker.json', 'utf-8');
    return content.length !== 0 ? JSON.parse(content) : [];
  } catch (error) {
    console.log(`Deu erro na leiura do arquivo: ${error.message}`);
  } 
}

module.exports = readTalker;
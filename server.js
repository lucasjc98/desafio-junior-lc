import express from 'express';
import path from 'path';
import axios from 'axios';
import open from 'open';

import calculateStatistics from './src/exercicio8/calculadoraEstatisticas.js'

const app = express();

app.use(express.urlencoded({ extended: true }));

const hostname = "localhost";
const port = 3000;

const publicDirectoryPath = path.join('.', 'src');
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(publicDirectoryPath, 'index.html'));
});

app.get('/exercicio1', (req, res) => {
  res.sendFile(path.resolve(publicDirectoryPath, 'exercicio1', 'exercicio1.html'));
});

app.get('/exercicio2', (req, res) => {
  res.sendFile(path.resolve(publicDirectoryPath, 'exercicio2', 'exercicio2.html'));
});

app.get('/exercicio3', (req, res) => {
  res.sendFile(path.resolve(publicDirectoryPath, 'exercicio3', 'exercicio3.html'));
});

app.get('/exercicio4', (req, res) => {
  res.sendFile(path.resolve(publicDirectoryPath, 'exercicio4', 'exercicio4.html'));
});

app.get('/exercicio5', (req, res) => {
  res.sendFile(path.resolve(publicDirectoryPath, 'exercicio5', 'exercicio5.html'));
});

app.get('/exercicio6', (req, res) => {
  res.sendFile(path.resolve(publicDirectoryPath, 'exercicio6', 'exercicio6.html'));
});

app.get('/exercicio7', (req, res) => {
  res.sendFile(path.resolve(publicDirectoryPath, 'exercicio7', 'exercicio7.html'));
});

app.get('/exercicio8', (req, res) => {
  res.sendFile(path.resolve(publicDirectoryPath, 'exercicio8', 'exercicio8.html'));
});

app.get('/exercicio9', (req, res) => {
  res.sendFile(path.resolve(publicDirectoryPath, 'exercicio9', 'exercicio9.html'));
});

app.get('/exercicio10', (req, res) => {
  res.sendFile(path.resolve(publicDirectoryPath, 'exercicio10', 'exercicio10.html'));
});

app.get('/repositorios', async (req, res) => {
  const username = req.query.username;
  if (!username) {
    return res.status(400).json({ error: 'Por favor, informe o nome de usuário do GitHub!' });
  }

  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    const repositories = response.data.map(repo => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stargazers_count: repo.stargazers_count
    }));
    res.json(repositories);
  } catch (error) {
    console.error('Erro ao obter os repositórios:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Erro ao obter os repositórios. Por favor, tente novamente.' });
  }
});

app.get('/estatisticas-vendas', async (req, res) => {
  try {
      const statistics = await calculateStatistics();
      res.json(statistics);
  } catch (error) {
      res.status(500).json({ error: 'Erro ao calcular estatísticas' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
  open(`http://${hostname}:${port}`);
});

# Manipulação de API
- Utilizando a API REST do GitHub, desenvolva um script que faça uma requisição para obter os repositórios de um usuário e exiba as informações na tela.
- O usuário deve informar o nome do usuário do GitHub.
- O script deve exibir o nome, descrição, linguagem e quantidade de estrelas de cada repositório.

## exercicio10.js
```javascript
async function getRepositories() {
  const username = document.getElementById('username').value.trim();
  if (!username) {
    alert('Por favor, informe o nome de usuário do GitHub!');
    return;
  }

  try {
    const response = await fetch(`/repositorios?username=${username}`);
    const data = await response.json();

    const repositoriesDiv = document.getElementById('repositories');
    repositoriesDiv.innerHTML = '';

    if (data && data.length > 0) {
      data.map(repo => {
        const repoInfo = document.createElement('div');
        repoInfo.innerHTML = `
                  <h3>${repo.name}</h3>
                  <p><strong>Descrição:</strong> ${repo.description || 'Nenhuma descrição fornecida'}</p>
                  <p><strong>Linguagem:</strong> ${repo.language || 'Nenhuma linguagem especificada'}</p>
                  <p><strong>Estrelas:</strong> ${repo.stargazers_count}</p>
                  <hr>
              `;
        repositoriesDiv.appendChild(repoInfo);
      });
    } else {
      repositoriesDiv.innerHTML = '<p>Nenhum repositório encontrado para este usuário.</p>';
    }
  } catch (error) {
    console.error('Erro ao obter os repositórios:', error);
    alert('Erro ao obter os repositórios. Por favor, tente novamente!');
  }
}
```

## Rota "/repositorios" no arquivo 'server.js'
```javascript
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
```
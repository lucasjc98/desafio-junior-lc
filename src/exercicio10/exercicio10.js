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
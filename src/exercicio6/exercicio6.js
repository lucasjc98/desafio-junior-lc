class Tarefa {
  constructor(descricao, prioridade, valorPriopridade) {
    this._id = seq; // atributo privado
    this._descricao = descricao; // atributo privado
    this._prioridade = prioridade; // atributo privado
    this._valorPriopridade = valorPriopridade;
    this._status = "pendente"; // atributo privado
  }

  // Getter para a propriedade "id"
  get id() {
    return this._id;
  }

  // Getter para a propriedade "descricao"
  get descricao() {
    return this._descricao;
  }

  // Setter para a propriedade "descricao"
  set descricao(novaDescricao) {
    this._descricao = novaDescricao;
  }

  // Getter para a propriedade "prioridade"
  get prioridade() {
    return this._prioridade;
  }

  // Setter para a propriedade "prioridade"
  set prioridade(novaPrioridade) {
    this._prioridade = novaPrioridade;
  }

  // Getter para a propriedade "valorPriopridade"
  get valorPriopridade() {
    return this._valorPriopridade;
  }

  // Setter para a propriedade "valorPriopridade"
  set valorPriopridade(novoValorPriopridade) {
    this._valorPriopridade = novoValorPriopridade;
  }

  // Getter para a propriedade "status"
  get status() {
    return this._status;
  }

  // Setter para a propriedade "status"
  set status(novoStatus) {
    this._status = novoStatus;
  }
}

// Array para armazenar as tarefas
let tarefas = [];

// Variável para guardar a sequência dos IDs.
let seq = 1;

// Função para adicionar nova tarefa
function adicionarTarefa() {
  // Verifica se a descrição está vazia
  if (document.getElementById("txt-descricao").value === "") {
    alert("Informe a descrição da tarefa!");
    return;
  }

  // Obtém os dados da tarefa
  const selPrioridade = document.getElementById("sel-prioridade");

  const descricao = document.getElementById("txt-descricao").value;
  const valorPrioridade = parseInt(selPrioridade.value);
  const prioridade = selPrioridade.options[valorPrioridade-1].text;

  // Cria um objeto para a nova tarefa
  const novaTarefa = new Tarefa(descricao, prioridade, valorPrioridade);

  // Adiciona a nova tarefa ao array
  tarefas.push(novaTarefa);

  // Atualiza a interface com a nova lista de tarefas
  atualizarListaTarefas();

  // Atualiza o sequência para os IDs
  seq++;

  //Limpa o campo descrição
  document.getElementById("txt-descricao").value = "";
}

// Função para remover tarefa
function removerTarefa(indice) {
  // Remove a tarefa do array
  let novasTarefas = tarefas.filter(t => t.id !== indice);

  tarefas = novasTarefas;

  // Atualiza a interface com a nova lista de tarefas
  atualizarListaTarefas();
}

// Função para editar tarefa
function editarTarefa(indice) {
  document.getElementById("criar-tarefa").style.display = "none";
  // Obtém os dados da tarefa
  const tarefa = tarefas.find(t => t.id === indice );

  // Exibe o modal com os dados da tarefa para edição
  const modalEditar = document.getElementById("modal-editar-tarefa");
  modalEditar.style.display = "block";

  // Preenche os campos do modal com os dados da tarefa
  document.getElementById("tarefa-id").value = tarefa.id;

  document.getElementById("txt-descricao-editar").value = tarefa.descricao;

  document.getElementById("sel-prioridade-editar").value = tarefa.valorPriopridade;

  document.getElementById("sel-status-editar").value = tarefa.status; 
}

// Fechar o modal
function fecharModal() {
  document.getElementById("modal-editar-tarefa").style.display = "none";
  document.getElementById("criar-tarefa").style.display = "block";
}

// Salvar as alterações da tarefa
function salvarAlteracao() {

  // Verifica se a descrição está vazia
  if (document.getElementById("txt-descricao-editar").value === "") {
    alert("Informe a descrição da tarefa!");
    return;
  }

  // Obtém os dados editados da tarefa
  const selPrioridadeEditar = document.getElementById("sel-prioridade-editar");

  const valorPrioridade = parseInt(selPrioridadeEditar.value);

  let id = parseInt(document.getElementById("tarefa-id").value);
  let tarefa = tarefas.find(t => t.id === id);
  tarefa.descricao = document.getElementById("txt-descricao-editar").value;
  tarefa.prioridade = selPrioridadeEditar.options[valorPrioridade-1].text;
  tarefa.valorPriopridade = valorPrioridade;
  tarefa.status = document.getElementById("sel-status-editar").value;

  // Atualiza a tarefa no array
  let index = tarefas.findIndex(t => t.id === id);
  tarefas[index] = tarefa;

  // Fecha o modal
  fecharModal();

  // Atualiza a interface com a nova lista de tarefas
  atualizarListaTarefas();

  //Limpa o campo descrição
  document.getElementById("txt-descricao-editar").value = "";
}

// Função para atualizar a interface com a lista de tarefas
function atualizarListaTarefas() {
  // Limpa a lista de tarefas na interface
  const tbody = document.getElementById("lista-tarefas").getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";

  // Percorre as tarefas e cria uma linha para cada uma
  for (let i = 0; i < tarefas.length; i++) {
    let tarefa = tarefas[i];

    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${tarefa.descricao}</td>
      <td>${tarefa.prioridade}</td>
      <td>${tarefa.status}</td>
      <td>
        <button onclick="editarTarefa(${tarefa.id})">Editar</button>
        <button onclick="removerTarefa(${tarefa.id})">Remover</button>
      </td>
    `;

    tbody.appendChild(linha);
  }
}

// Adiciona eventos aos botões
document.getElementById("btn-adicionar").addEventListener("click", adicionarTarefa);

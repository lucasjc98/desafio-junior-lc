# Manipulação e Comunicação de Objetos

- Crie um programa que conecte controles de marcas diferentes (LG, Samsung, Sony, etc) a uma ou mais TVs.
- O programa deve permitir a seleção de um controle e a comunicação com a TV para ligar e desligar;
- As TVs e controles devem ser representados por objetos, e a comunicação entre eles deve ser feita por métodos.
- O programa deve exibir na tela as ações realizadas e o estado atual da TV.
Caso o controle selecionado não seja compatível com a TV, o programa deve exibir uma mensagem de erro.

```javascript
class TV {
  constructor(marca, modelo) {
    this.marca = marca;
    this.modelo = modelo;
    this.ligada = false;
  }

  ligar() {
    this.ligada = true;
  }

  desligar() {
    this.ligada = false;
  }

  getEstado() {
    return this.ligada ? "Ligada" : "Desligada";
  }
}

class Controle {
  constructor(marca) {
    this.marca = marca;
  }

  ligarTV(tv) {
    if (this.marca === tv.marca) {
      tv.ligar();
    } else {
      alert(`Controle ${this.marca} não compatível com a TV ${tv.marca} ${tv.modelo}`);
    }
  }

  desligarTV(tv) {
    if (this.marca === tv.marca) {
      tv.desligar();
    } else {
      alert(`Controle ${this.marca} não compatível com a TV ${tv.marca} ${tv.modelo}`);
    }
  }
}

// Cria os objetos e insere nos arrays de "controle" e "televisores"
const controles = [];
controles.push(new Controle("LG"));
controles.push(new Controle("Sony"));
controles.push(new Controle("Samsung"));
controles.push(new Controle("Philco"));

const televisores = [];
televisores.push(new TV("LG", "32LB550B"));
televisores.push(new TV("LG", "32LB560B"));
televisores.push(new TV("Sony", "KDL-32W655D"));
televisores.push(new TV("Samsung", "UN32J4300AG"));
televisores.push(new TV("Samsung", "UN43T5300AG"));
televisores.push(new TV("Philco", "RTD298X_TV001"));

window.onload = function(){
  // Cria os dropdowns da TV e controle
  let dropdownControle = document.getElementById("controle");

  controles.forEach(function(controle) {
    let option = document.createElement("option");
    option.text = controle.marca;
    option.value = controle.marca;
    dropdownControle.add(option);
  });

  let dropdownTV= document.getElementById("tv");

  televisores.forEach(function(tv) {
    let option = document.createElement("option");
    option.text = tv.marca + " " + tv.modelo;
    option.value = tv.marca;
    dropdownTV.add(option);
  });

  dropdownTV.addEventListener("change", function() {
    atualizarTela();
  });

  atualizarTela();
}

function ligarDesligar() {
  const dropdownTV = document.getElementById("tv");

  const controleSelecionado = document.getElementById("controle").value;
  const tvMarca = dropdownTV.value;
  const tvModelo = dropdownTV.options[dropdownTV.selectedIndex].text.split(" ");

  const controle = controles.find(c => c.marca === controleSelecionado);
  const tv = televisores.find(t => t.marca === tvMarca && t.modelo === tvModelo[1]);

  if (tv.ligada) {
    controle.desligarTV(tv);
  } else {
    controle.ligarTV(tv);
  }

  atualizarTela();
}

function atualizarTela() {
  const tela = document.getElementById("tela");

  const dropdownTV = document.getElementById("tv");
  const tvMarca = dropdownTV.value;
  const tvModelo = dropdownTV.options[dropdownTV.selectedIndex].text.split(" ");

  const tv = televisores.find(t => t.marca === tvMarca && t.modelo === tvModelo[1]);
  
  let mensagem = `TV ${tv.marca} ${tv.modelo}: ${tv.getEstado()}`;
  tela.innerHTML = `<p>${mensagem}</p>`;
}
```
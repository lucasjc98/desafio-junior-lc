const calcularArea = () => {
  const forma = document.getElementById("forma").value;
  const inputs = document.getElementById("inputs-forma").getElementsByTagName("input");
  const valores = Array.from(inputs).map(input => input.value);

  let area;

  // Dispara a função de acordo a forma selecionado.
  switch (forma) {
    case "quadrado":
      area = calcularAreaQuadrado(valores[0]);
      break;
    case "retangulo":
      area = calcularAreaRetangulo(valores[0], valores[1]);
      break;
    case "triangulo":
      area = calcularAreaTriangulo(valores[0], valores[1]);
      break;
    case "circulo":
      area = calcularAreaCirculo(valores[0]);
      break;
  }

  document.getElementById("result").innerHTML = `Área: ${area}`;
};

// Funções para calcular cada forma
const calcularAreaQuadrado = lado => lado * lado;

const calcularAreaRetangulo = (base, altura) => base * altura;

const calcularAreaTriangulo = (base, altura) => (base * altura) / 2;

const calcularAreaCirculo = raio => Math.PI * raio * raio;

// Mostrar as infos na tela
const mostrarInputsForma = forma => {
  const inputsForma = document.getElementById("inputs-forma");
  inputsForma.innerHTML = "";

  switch (forma) {
    case "quadrado":
      inputsForma.innerHTML += `
        <label for="lado">Lado:</label>
        <input type="number" id="lado" name="lado" required>
      `;
      break;
    case "retangulo":
      inputsForma.innerHTML += `
        <label for="base">Base:</label>
        <input type="number" id="base" name="base" required>
        <br>
        <label for="altura">Altura:</label>
        <input type="number" id="altura" name="altura" required>
      `;
      break;
    case "triangulo":
      inputsForma.innerHTML += `
        <label for="base">Base:</label>
        <input type="number" id="base" name="base" required>
        <br>
        <label for="altura">Altura:</label>
        <input type="number" id="altura" name="altura" required>
      `;
      break;
    case "circulo":
      inputsForma.innerHTML += `
        <label for="raio">Raio:</label>
        <input type="number" id="raio" name="raio" required>
      `;
      break;
  }
};

document.getElementById("forma").addEventListener("change", () => {
  document.getElementById("result").innerHTML = "";
  const formaSelecionada = document.getElementById("forma").value;
  mostrarInputsForma(formaSelecionada);
});

//Inicializar o formulário.
mostrarInputsForma("quadrado");
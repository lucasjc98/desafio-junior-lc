# Calculadora Básica

- Crie uma calculadora que realize as operações básicas: soma, subtração, multiplicação e divisão.
- Permita a entrada de dois números e a escolha da operação.
- Exiba o resultado da operação na tela.

```javascript
class Calculadora {
  constructor(numero1, numero2) {
    this.numero1 = numero1;
    this.numero2 = numero2;
    this.resultado = null;
  }

  soma() {
    this.resultado = this.numero1 + this.numero2;
  }

  subtracao() {
    this.resultado = this.numero1 - this.numero2;
  }

  multiplicacao() {
    this.resultado = this.numero1 * this.numero2;
  }

  divisao() {
    this.resultado = this.numero1 / this.numero2;
  }

  obterResultado() {
    return this.resultado;
  }
}

const calcular = document.getElementById('calcular');
const resultadoValor = document.getElementById('resultado-valor');

calcular.addEventListener('click', () => {
  const numero1 = parseFloat(document.getElementById('numero1').value);
  const numero2 = parseFloat(document.getElementById('numero2').value);
  const operacao = document.getElementById('operacao').value;

  //Validar se os números foram informados
  if (Number.isNaN(numero1)) {
    resultadoValor.textContent = 'Informe o primeiro número!';
    return;
  }

  if (Number.isNaN(numero2)) {
    resultadoValor.textContent = 'Informe o segundo número!';
    return;
  }

  // Exibe mensagem de erro se a divisão for por zero
  if (operacao === 'divisao' && numero2 === 0) {
    resultadoValor.textContent = 'Divisão por zero não é permitida!';
    return;
  }

  const calculadora = new Calculadora(numero1, numero2);

  // Dispara o método de acordo com a operação aritmética
  switch (operacao) {
    case 'soma':
      calculadora.soma();
      break;
    case 'subtracao':
      calculadora.subtracao();
      break;
    case 'multiplicacao':
      calculadora.multiplicacao();
      break;
    case 'divisao':
      calculadora.divisao();
      break;
  }

  resultadoValor.textContent = calculadora.obterResultado();
});
```
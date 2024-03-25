# Maior e Menor entre Três Números

- Escreva um programa que peça ao usuário três números.
- Determine o maior e o menor número entre os três e exiba-os na tela.

```javascript
function encontrar() {
  // Obter os valores dos inputs
  const numero1 = parseFloat(document.getElementById("numero1").value);
  const numero2 = parseFloat(document.getElementById("numero2").value);
  const numero3 = parseFloat(document.getElementById("numero3").value);
  const resultado = document.getElementById("result");

  //Validar se os números foram informados
  if (Number.isNaN(numero1)) {
    resultado.innerHTML = 'Informe o primeiro número!';
    return;
  }

  if (Number.isNaN(numero2)) {
    resultado.innerHTML = 'Informe o segundo número!';
    return;
  }

  if (Number.isNaN(numero3)) {
    resultado.innerHTML = 'Informe o terceiro número!';
    return;
  }

  // Verificar se os números são iguais
  if (numero1 === numero2 && numero2 === numero3) {
    resultado.innerHTML = "Os números informados são iguais!";
    return;
  }

  // Definir variáveis para o maior e menor número
  let maior = numero1;
  let menor = numero1;

  // Comparar o segundo número
  if (numero2 > maior) {
    maior = numero2;
  } else if (numero2 < menor) {
    menor = numero2;
  }

  // Comparar o terceiro número
  if (numero3 > maior) {
    maior = numero3;
  } else if (numero3 < menor) {
    menor = numero3;
  }

  // Exibir o resultado
  resultado.innerHTML = `O maior número é ${maior} e o menor número é ${menor}!`;
}
```

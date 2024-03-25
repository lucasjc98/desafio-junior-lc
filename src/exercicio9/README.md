# Simulador de Financiamento

- Crie um programa que simule o calculo de financiamento de um imóvel ou veículo, baseado na tabela PRICE.
- O programa deve solicitar o valor total do financiamento, a quantidade de parcelas e a taxa nominal de juros anual.
- O programa deve exibir o valor da parcela, o valor total a ser pago, o custo efetivo total do financiamento e a taxa efetiva mensal.
- O programa deve permitir a simulação de diferentes cenários de financiamento.

Para este exercício utilize as seguintes fórmulas:
- Valor da parcela: `PMT = PV * (i / (1 - (1 + i)^-n))`, onde `PMT` é o valor da parcela, `PV` é o valor total financiado, `i` é a taxa de juros mensal efetiva e `n` é a quantidade de parcelas.
- Custo efetivo total: `CET = (PMT * n) - PV`, onde `CET` é o custo efetivo total, `PMT` é o valor da parcela e `PV` é o valor total financiado.
- Taxa efetiva mensal: `im = (1 + i)^(1/12) - 1`, onde `im` é a taxa de juros mensal efetiva e `i` é a taxa de juros nominal anual.

```javascript
function calcular() {
  var total = parseFloat(document.getElementById('total').value);
  var parcelas = parseInt(document.getElementById('parcelas').value);
  var juros = parseFloat(document.getElementById('juros').value);

  var i = juros / 100 / 12; // Taxa de juros mensal efetiva
  var im = Math.pow(1 + i, 1/12) - 1; // Taxa de juros mensal efetiva
  var PMT = total * (i / (1 - Math.pow((1 + i), -parcelas))); // Valor da parcela
  var CET = (PMT * parcelas) - total; // Custo efetivo total

  document.getElementById('result').innerHTML = `
      <h3>Resultado</h3>
      <p>Valor da Parcela: R$ ${PMT.toFixed(2)}</p>
      <p>Valor Total a ser Pago: R$ ${(PMT * parcelas).toFixed(2)}</p>
      <p>Custo Efetivo Total do Financiamento: R$ ${CET.toFixed(2)}</p>
      <p>Taxa Efetiva Mensal: ${(im * 100).toFixed(2)}%</p>
  `;
}
```
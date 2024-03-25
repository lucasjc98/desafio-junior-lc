function calcular() {
  var total = parseFloat(document.getElementById('total').value);
  var parcelas = parseInt(document.getElementById('parcelas').value);
  var juros = parseFloat(document.getElementById('juros').value);

  var i = juros / 100 / 12; // Taxa de juros nominal anual
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

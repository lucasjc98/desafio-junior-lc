async function carregarEstatisticas() {
  const response = await fetch('/estatisticas-vendas');
  const statistics = await response.json();
  const statisticsDiv = document.getElementById('statistics');
  statisticsDiv.innerHTML = generateStatisticsTable(statistics);
}

// Converte o valor formatado para dólares
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function generateStatisticsTable(statistics) {
  let tableHtml = '<table>';
  tableHtml += '<tr><th>Estatísticas Gerais</th><th>Valor</th></tr>';
  tableHtml += `<tr><td>Total de unidades vendidas</td><td>${statistics.totalSales.unitsSold}</td></tr>`;
  tableHtml += `<tr><td>Total de receita</td><td>${formatCurrency(statistics.totalSales.totalRevenue)}</td></tr>`;
  tableHtml += `<tr><td>Custo total</td><td>${formatCurrency(statistics.totalSales.totalCost)}</td></tr>`;
  tableHtml += `<tr><td>Lucro total</td><td>${formatCurrency(statistics.totalSales.totalProfit)}</td></tr>`;
  tableHtml += '</table>';

  tableHtml += '<br>';

  tableHtml += '<table>';
  tableHtml += '<tr><th>Tipo de Produto</th><th>Unidades Vendidas</th><th>Receita</th><th>Custo</th><th>Lucro</th></tr>';
  for (const productType in statistics.salesByProductType) {
    const stats = statistics.salesByProductType[productType];
    tableHtml += `<tr><td>${productType}</td><td>${stats.unitsSold}</td><td>${formatCurrency(stats.totalRevenue)}</td><td>${formatCurrency(stats.totalCost)}</td><td>${formatCurrency(stats.totalProfit)}</td></tr>`;
  }
  tableHtml += '</table>';

  tableHtml += '<br>';

  tableHtml += '<table>';
  tableHtml += '<tr><th>Tipo de Produto / Região</th><th>Unidades Vendidas</th><th>Receita</th></tr>';
  for (const key in statistics.salesByProductTypeAndRegion) {
    const [productType, region] = key.split('-');
    const stats = statistics.salesByProductTypeAndRegion[key];
    tableHtml += `<tr><td>${productType} / ${region}</td><td>${stats.unitsSold}</td><td>${formatCurrency(stats.totalRevenue)}</td></tr>`;
  }
  tableHtml += '</table>';

  tableHtml += '<br>';

  tableHtml += '<table>';
  tableHtml += '<tr><th>País</th><th>Tipo de Produto com Maior Receita</th><th>Receita</th></tr>';
  for (const country in statistics.productWithHighestRevenueByCountry) {
    const { productType, totalRevenue } = statistics.productWithHighestRevenueByCountry[country];
    tableHtml += `<tr><td>${country}</td><td>${productType}</td><td>${formatCurrency(totalRevenue)}</td></tr>`;
  }
  tableHtml += '</table>';

  return tableHtml;
}

carregarEstatisticas();

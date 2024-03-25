# Estatísticas de Vendas

- Leia o arquivo em anexo "sales.csv" que contém dados de vendas agrupados por tipo e país.
- Crie um programa que calcule e exiba as seguintes estatísticas:
  - Vendas (total de unidades vendidas, total de receita, custo total, lucro total) por - tipo de produto.
  - Vendas por tipo de produto e região.
  - Tipo de produto com maior receita de cada país.

## calculadoraEstatisticas.js
```javascript
import fs from 'fs';
import csv from 'csv-parser';

async function calculateStatistics() {
  return new Promise((resolve, reject) => {
    const statistics = {
      totalSales: {
        unitsSold: 0,
        totalRevenue: 0,
        totalCost: 0,
        totalProfit: 0
      },
      salesByProductType: {},
      salesByProductTypeAndRegion: {},
      productWithHighestRevenueByCountry: {}
    };

    fs.createReadStream('src/exercicio8/sales.csv')
      .pipe(csv())
      .on('data', (row) => {
        // Processando cada linha do CSV
        const country = row.country;
        const productType = row.item_type;
        const unitsSold = parseInt(row.units_sold);
        const totalRevenue = parseFloat(row.total_revenue);
        const totalCost = parseFloat(row.total_cost);
        const totalProfit = parseFloat(row.total_profit);

        // Atualizando estatísticas gerais
        statistics.totalSales.unitsSold += unitsSold;
        statistics.totalSales.totalRevenue += totalRevenue;
        statistics.totalSales.totalCost += totalCost;
        statistics.totalSales.totalProfit += totalProfit;

        // Atualizando estatísticas por tipo de produto
        if (!statistics.salesByProductType[productType]) {
          statistics.salesByProductType[productType] = {
            unitsSold: 0,
            totalRevenue: 0,
            totalCost: 0,
            totalProfit: 0
          };
        }
        statistics.salesByProductType[productType].unitsSold += unitsSold;
        statistics.salesByProductType[productType].totalRevenue += totalRevenue;
        statistics.salesByProductType[productType].totalCost += totalCost;
        statistics.salesByProductType[productType].totalProfit += totalProfit;

        // Atualizando estatísticas por tipo de produto e região
        const region = row.region;
        const productRegionKey = `${productType}-${region}`;
        if (!statistics.salesByProductTypeAndRegion[productRegionKey]) {
          statistics.salesByProductTypeAndRegion[productRegionKey] = {
            unitsSold: 0,
            totalRevenue: 0
          };
        }
        statistics.salesByProductTypeAndRegion[productRegionKey].unitsSold += unitsSold;
        statistics.salesByProductTypeAndRegion[productRegionKey].totalRevenue += totalRevenue;

        // Atualizando tipo de produto com maior receita de cada país
        if (!statistics.productWithHighestRevenueByCountry[country] || totalRevenue > statistics.productWithHighestRevenueByCountry[country].totalRevenue) {
          statistics.productWithHighestRevenueByCountry[country] = {
            productType: productType,
            totalRevenue: totalRevenue
          };
        }
      })
      .on('end', () => {
        resolve(statistics);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

export default calculateStatistics;
```

## exercicio8.js
```javascript
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
```

## Rota "/estatisticas-vendas" no arquivo 'server.js'
```javascript
app.get('/estatisticas-vendas', async (req, res) => {
  try {
      const statistics = await calculateStatistics();
      res.json(statistics);
  } catch (error) {
      res.status(500).json({ error: 'Erro ao calcular estatísticas' });
  }
});
```
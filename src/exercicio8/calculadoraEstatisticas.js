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

import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import data from '../../assets/Manufac _ India_Agro.json';

const BarChartComponent: React.FC = () => {
  useEffect(() => {
    const cropData: Record<string, number[]> = {};

    data.forEach((entry: any) => {
      const cropName = entry['Crop Name'];
      const yieldValue = parseFloat(
        entry['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))']
      );

      const validYield = isNaN(yieldValue) ? 0 : yieldValue;

      if (!cropData[cropName]) {
        cropData[cropName] = [];
      }
      cropData[cropName].push(validYield);
    });

    const crops = Object.keys(cropData);
    const averageYields = crops.map((crop) => {
      const totalYield = cropData[crop].reduce((avg, val) => avg + val, 0);
      const numberOfEntries = cropData[crop].length;
      return (totalYield / numberOfEntries).toFixed(2);
    });

    const chartElement = document.getElementById('chart') as HTMLDivElement;
    const chart = echarts.init(chartElement);

    const options = {
      title: {
        text: 'Average Yield of Crops (1950-2020)',
        left: 'center',
      },
      tooltip: {
        formatter: (params: any) => {
          return `${params.value} Kg/Ha`;
        },
      },
      xAxis: {
        type: 'category',
        data: crops,
        name: 'Crops',
        nameLocation: 'middle',
        nameGap: 45,
        axisLabel: { rotate: 35 },
      },
      yAxis: {
        type: 'value',
        name: 'Average Yield (Kg/Ha)',
        nameLocation: 'middle',
        nameGap: 60,
      },
      series: [
        {
          type: 'bar',
          data: averageYields,
          itemStyle: { color: '#0077b6' },
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(122, 177, 237, 0.2)'
          }
        },
      ],
    };

    chart.setOption(options);

    return () => {
      chart.dispose();
    };
  }, []);

  return <div id="chart" style={{ width: '95vw', height: '50vh' }} />;
};

export default BarChartComponent;

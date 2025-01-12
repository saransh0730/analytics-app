import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import data from '../../assets/Manufac _ India_Agro.json';

const BarChartComponent: React.FC = () => {
  useEffect(() => {
    // Creating an object using Record to store data for each crop and their average yield values
    const cropData: Record<string, number[]> = {};

    // Loop through the JSON data and organize it by crop name
    data.forEach((entry: any) => {
      const cropName = entry['Crop Name'];
      const yieldValue = parseFloat(
        entry['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))']
      ); 
      
      // If the yield value is not a number, default it to 0
      const validYield = isNaN(yieldValue) ? 0 : yieldValue;

      // If this crop hasn't been added to cropData, initialize an empty array
      if (!cropData[cropName]) {
        cropData[cropName] = [];
      }
      // Add the yield value to the crop's array
      cropData[cropName].push(validYield);
    });

    // Get all the crop names (keys from cropData object)
    const crops = Object.keys(cropData);

    // Calculate the average yield for each crop
    const averageYields = crops.map((crop) => {
      // Sum all the yield values for the crops
      const totalYield = cropData[crop].reduce((avg, val) => avg + val, 0);

      // Finding the count of total years
      const numberOfEntries = cropData[crop].length;
      // Calculate the average yield and round it to 2 decimal places
      return (totalYield / numberOfEntries).toFixed(2);
    });

    // Get the chart container from the DOM
    const chartElement = document.getElementById('chart') as HTMLDivElement;

    const chart = echarts.init(chartElement);

    const options = {
      title: {
        text: 'Average Yield of Crops (1950-2020)', 
        left: 'center',
      },
      tooltip: {
        formatter: (params: any) => {
          return `${params.value} Kg/Ha`; // Show yield value (in Kg/Ha) in tooltip
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
            color: 'rgba(122, 177, 237, 0.2)', 
          },
        },
      ],
    };

    chart.setOption(options);

    // Using dispose function for cleanUp
    return () => {
      chart.dispose(); 
    };
  }, []);

  return <div id="chart" style={{ width: '95vw', height: '50vh' }} />;
};

export default BarChartComponent;

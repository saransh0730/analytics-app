import React from 'react';
import { MantineProvider } from '@mantine/core';
import TableComponent from './components/TableComponent';
import BarChartComponent from './components/BarChartComponent';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <MantineProvider>
      <h2>Indian Agricultural Data Visualization</h2>
      <p>The table displays the crops with the highest and lowest production for each year.</p>
      <TableComponent />
      <p>The bar chart shows the average yield of crops over the years.</p>
      <BarChartComponent />
    </MantineProvider>
  );
};

export default App;

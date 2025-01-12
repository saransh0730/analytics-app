import React from 'react';
import { MantineProvider } from '@mantine/core';
import TableComponent from './components/TableComponent';
import BarChartComponent from './components/BarChartComponent';

const App: React.FC = () => {
  return (
    <MantineProvider>
      <h2 style={{color: '#0077b6', fontFamily:'sans-serif'}}>Indian Agricultural Data Visualization</h2>
      <TableComponent />
      <BarChartComponent />
    </MantineProvider>
  );
};

export default App;

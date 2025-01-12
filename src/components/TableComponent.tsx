import React from 'react';
import { Table } from '@mantine/core';
import data from '../../assets/Manufac _ India_Agro.json';
import '../styles/TableComponent.css'

interface CropData {
  Year: number;
  CropName: string;
  ProductionQuantity: number;
}

const extractYear = (yearString: string): number => {
  const match = yearString.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : 0;
};

const TableComponent: React.FC = () => {
  const cropData: CropData[] = (data as any[]).map((entry) => ({
    Year: extractYear(entry.Year),
    CropName: entry["Crop Name"],
    ProductionQuantity: (entry["Crop Production (UOM:t(Tonnes))"]) || 0,
  }));

  const groupedData: { [key: string]: CropData[] } = {};
  cropData.forEach(({ Year, CropName, ProductionQuantity }) => {
    if (!groupedData[Year]) groupedData[Year] = [];
    groupedData[Year].push({ Year, CropName, ProductionQuantity });
  });

  const result = Object.entries(groupedData).map(([year, crops]) => {
    let maxCrop = crops[0];
    let minCrop = crops[0];

    crops.forEach((crop) => {
      if (crop.ProductionQuantity > maxCrop.ProductionQuantity) {
        maxCrop = crop;
      }
      if (crop.ProductionQuantity < minCrop.ProductionQuantity) {
        minCrop = crop;
      }
    });

    return {
      year,
      maxiCrop: maxCrop.CropName,
      miniCrop: minCrop.CropName,
    };
  });

  return (
    <div className='table-container'>
    <Table>
      <thead>
        <tr>
          <th>Year</th>
          <th>Max Production Crop</th>
          <th>Min Production Crop</th>
        </tr>
      </thead>
      <tbody>
        {result.map((row, index) => (
          <tr key={index}>
            <td>{row.year}</td>
            <td>{row.maxiCrop}</td>
            <td>{row.miniCrop}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  );
};

export default TableComponent;


import React from 'react';
import { Table } from '@mantine/core'; 
import data from '../../assets/Manufac _ India_Agro.json'; 
import '../styles/TableComponent.css'; 

// Using an interface to structure the crop data
interface CropData {
  Year: number;
  CropName: string; 
  ProductionQuantity: number;
}

// Function to extract the year from the "Year" field in the data
const extractYear = (yearString: string): number => {
  const match = yearString.match(/\d{4}/); // Passing year string through a Regex (regular expression) to extract 4-digit numeric year
  return match ? parseInt(match[0], 10) : 0; // Returns the year as a number or 0 if no match is found
};

const TableComponent: React.FC = () => {
  // Transforing the raw data into a structured array of CropData
  const cropData: CropData[] = (data as any[]).map((entry) => ({
    Year: extractYear(entry.Year), // Extract the year using the helper function
    CropName: entry["Crop Name"], 
    ProductionQuantity: entry["Crop Production (UOM:t(Tonnes))"] || 0, // Getting the production quantity, defaulting to 0 if missing
  }));

  // Grouping the data by year
  const groupedData: { [key: string]: CropData[] } = {};
  cropData.forEach(({ Year, CropName, ProductionQuantity }) => {
    if (!groupedData[Year]) groupedData[Year] = []; // Initialize the group for the year if it doesn't exist
    groupedData[Year].push({ Year, CropName, ProductionQuantity }); // Add the crop data to the corresponding year
  });

  // Calculating the crop with maximum and minimum production for each year
  const result = Object.entries(groupedData).map(([year, crops]) => {
    let maxCrop = crops[0]; // Starting the first crop as max
    let minCrop = crops[0]; // Starting the first crop as min

    // Compare each crop's production quantity to find max and min
    crops.forEach((crop) => {
      if (crop.ProductionQuantity > maxCrop.ProductionQuantity) {
        maxCrop = crop; // Updating maxCrop if current crop has higher production
      }
      if (crop.ProductionQuantity < minCrop.ProductionQuantity) {
        minCrop = crop; // Updating minCrop if current crop has lower production
      }
    });

    return {
      year,
      maxiCrop: maxCrop.CropName, // Crop with maximum production
      miniCrop: minCrop.CropName, // Crop with minimum production
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
          {result.map((row, index) => ( // Mapping over result for setting data in rows
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

# Indian Agricultural Data Visualization

This project visualizes Indian agricultural data by providing a table and a bar chart to showcase critical insights.

## Overview:
1. **Table**: Displays the crops with the highest and lowest production for each year.
2. **Bar Chart**: Illustrates the average yield of crops over the years.

Both visualizations are built using React and styled with the Mantine UI library. The data used in the project is sourced from Indian Agriculture dataset (made available by National Data and Analytics Platform, NITI Aayog).

## Project Structure

### Components:
- **TableComponent**: Generates a table highlighting crops with the maximum and minimum production for each year.
- **BarChartComponent**: Creates a bar chart showing the average yield of crops across the years.

### Styling:
- Custom CSS styling is used for responsiveness and readability.

### Libraries:
- **Mantine** for styling and UI components.
- **Apache ECharts** for creating data visualizations.

## Setup Instructions

Follow these steps to run the project locally:

1. Clone the repository:
   ```bash
   git clone <repository-url>
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
3. Install dependencies:
   ```bash
   yarn install
4. Start the development server:
   ```bash
   yarn dev
## Screenshots
### Table: Maximum and Minimum Crop Production by Year
#### This table lists the crops with the highest and lowest production for each year.
![image](https://github.com/user-attachments/assets/f9a30514-6e34-4f2e-a862-66ab1ae9bfc4)
### Bar Chart: Average Yield of Crops Over the Years
#### This bar chart highlights the average yield of crops over the years.
![image](https://github.com/user-attachments/assets/c1a32da2-071f-4015-ad21-3f50799bc566)

## Folder Structure
### src/
#### ├── components/
##### │   ├── TableComponent.tsx   # Table displaying max and min crop production
##### │   ├── BarChartComponent.tsx # Bar chart showing average crop yields
#### ├── assets/
##### │   └── Manufac_India_Agro.json  # Input dataset
### ├── styles/
#### │   ├── App.css              # Global styles
#### │   ├── TableComponent.css   # Styles for the table
### ├── App.tsx                  # Main app component
### ├── main.tsx                 # Entry point



## Technologies Used

- **React**: Component-based library for building the user interface.
- **ECharts**: For data visualization and rendering the bar chart.
- **Mantine**: For table components and styling.
- **Vite**: For faster development and build processes.

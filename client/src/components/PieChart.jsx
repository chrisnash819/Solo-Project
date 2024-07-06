import React from 'react';
import {PieChart, Pie, Cell, Tooltip, Legend} from 'recharts';

const COLORS = [
  '#C0392B', // crimson
  '#8E44AD', // purple
  '#2471A3', // blue
  '#229954', // green
  '#E74C3C', // lighter crimson
  '#c76ded', // darker purple
  '#4b83f2', // lighter blue
  '#117319', // lighter green
  '#851208', // dark crimson
  '#d96111', // dark purple
  '#ed85da'  // dark blue
];

const formatValue = (value, total) => {
  const percentage = ((value / total) * 100).toFixed(2);
  return `$${value.toLocaleString()} (${percentage}%)`;
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
        <p className="label">{`${name} : $${value.toLocaleString()}`}</p>
      </div>
    );
  }

  return null;
};

const renderLabel = ({ name }) => name;

function TaxPieChart({data})  {
  const allocationData = data.allocationData  
  const totalIncome = allocationData.percentTaxed.reduce((acc, entry) => acc + entry.value, 0);
    
    
    return (
      <>
      {/* Income Pie Chart */}
      <h2 className="centered-title">Income</h2>
      <PieChart width={1200} height={350}>
        <Pie
          data={allocationData.percentTaxed}
          dataKey="value"
          cx={750}
          cy={150}
          outerRadius={100}
          label={({ value }) => formatValue(value, totalIncome)}
          fill="#8884d8"
        >
          {allocationData.percentTaxed.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend align="center"/>
      </PieChart>

      {/* Federal Fund Allocation Pie Chart */}
      <h2 className="centered-title">Federal Fund Allocation</h2>
      <PieChart width={1200} height={400}>
        <Pie
          data={allocationData.federal}
          dataKey="value"
          cx={750}
          cy={150}
          outerRadius={120}
          labelLine
          label={renderLabel}
          fill="#8884d8"
        >
          {allocationData.federal.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>

      {/* State Fund Allocation Pie Chart */}
      <h2 className="centered-title">State Fund Allocation</h2>
      <PieChart width={1200} height={400}>
        <Pie
          data={allocationData.stateAndLocal}
          dataKey="value"
          cx={750}
          cy={150}
          outerRadius={120}
          labelLine
          label={renderLabel}
          fill="#82ca9d"
        >
          {allocationData.stateAndLocal.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </>
  );


}
export default TaxPieChart
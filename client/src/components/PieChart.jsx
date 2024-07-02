import React from 'react';
import {PieChart, Pie, Cell, Tooltip, Legend} from 'recharts';

const COLORS = ['#C0392B', '#8E44AD', '#2471A3', '#229954'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value }) => {
    if (value === 0) return null;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const lightenColor = (color, amount) => {
  const usePound = color[0] === "#";
  const num = parseInt(color.slice(1), 16);

  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00FF) + amount;
  let b = (num & 0x0000FF) + amount;

  r = r > 255 ? 255 : r;
  g = g > 255 ? 255 : g;
  b = b > 255 ? 255 : b;

  return (usePound ? "#" : "") + (0x1000000 + (r * 0x10000) + (g * 0x100) + b).toString(16).slice(1).toUpperCase();
};

const generateShades = (color, numShades) => {
  const shades = [];
  for (let i = 2; i <= numShades; i++) { // Start from 1 to skip the first shade
    shades.push(lightenColor(color, i * 30)); // Increase by 30 for each shade
  }
  return shades;
};





function TaxPieChart({data})  {
    const outerPieColors = data.stateAndLocal.map((entry, index) => {
        const innerColorIndex = Math.floor(index / 3); // Adjust this based on your grouping logic
        return generateShades(COLORS[innerColorIndex], 4)[index % 3]; // Generate 4 shades and skip the first one
    });
    
    
    return (
        <PieChart width={1000} height={500}>
            <Pie
                data={data.percentTaxed}
                dataKey="value"
                cx={300}
                cy={200}
                outerRadius={60}
                labelLine={false}
                label
                fill="#8884d8"
                
            >
                {data.percentTaxed.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
            </Pie>
            <Pie
                data={data.federal}
                dataKey="value"
                cx={600}
                cy={200}
                outerRadius={60}
                labelLine={false}
                label={renderCustomizedLabel}
                fill="#8884d8"
                
            >
                {data.federal.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
            </Pie>
            <Pie
                data={data.stateAndLocal}
                dataKey="value"
                cx={600}
                cy={200}
                innerRadius={70}
                outerRadius={90}
                labelLine
                label
                fill="#82ca9d"
                >
                {data.stateAndLocal.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={outerPieColors[index]} />
                    ))}
            </Pie>
      <Tooltip/>
      <Legend/>
    </PieChart>
    );


}
export default TaxPieChart
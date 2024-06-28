import React from 'react';
import {PieChart, Pie, Cell, Tooltip, Legend} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'purple'];

function TaxPieChart({data}) {
    // const chartData = [
    //     //example data
    //     {name: 'Education', value: 30},
    //     {name: 'infrastructure', value: 30},
    //     {name: 'Healthcare', value: 30},
    //     {name: 'Military', value: 30},
    // ];
    return (
        <PieChart width={400} height={400}>
            {data.map((entry, index) => (
                <Pie
                key={`pie-${index}`}
                    data={entry.subcategories} // Use subcategories as data for nested Pie
                    cx={200}
                    cy={200}
                    labelLine={false}
                    outerRadius={80 + index * 20} // Adjust outerRadius to control nesting
                    fill={COLORS[index % COLORS.length]} // Assign color to main category
                    dataKey="value"
                    nameKey="name"
                    label={({ name }) => name}
                >
                    {/* Render subcategory cells */}
                    {entry.subcategories.map((subEntry, subIndex) => (
                        <Cell key={`cell-${subIndex}`} fill={COLORS[subIndex % COLORS.length]} />
                    ))}
            </Pie>
            ))}
            <Tooltip />
            <Legend />
        </PieChart>
    );


}
export default TaxPieChart
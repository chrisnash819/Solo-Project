import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
        <p className="label">{`${payload[0].name}`}</p>
        <p className="intro"><strong>Percent Revenue:</strong> {`${payload[0].value}%`}</p>
        <p className="intro"><strong>National Average:</strong> {`${payload[1].value}%`}</p>
      </div>
    );
  }

  return null;
};


function allocationBarGraph({data}) {
    const stateRanking = data.stateRanking
    return (
        <>
        <h2 className="centered-title">State Rankings</h2>
        <BarChart
          width={1500}
          height={550}
          data={stateRanking}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend formatter={(value) => (
              value === 'percentRevenue' ? 'Percent of State Revenue' : 'National Average'
            )} 
          />
          <Bar dataKey="percentRevenue" fill="#C0392B" activeBar={<Rectangle fill="#C0392B" stroke="blue" />} />
          <Bar dataKey="natAvgPercentRevenue" fill="#2471A3" activeBar={<Rectangle fill="#2471A3" stroke="purple" />} />
        </BarChart>
        </>
    )
}

export default allocationBarGraph
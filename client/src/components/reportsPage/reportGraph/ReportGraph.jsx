import React from 'react';
import './reportGraph.css';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
} from 'recharts';
import PropTypes from 'prop-types';
import { reportTypes } from '../../../common/models/prop-types';

export default function ReportGraph(props) {
  const { report } = props;

  let bars = [];

  const getSectionData = (title, columns = [], rows = []) => {
    const sectionData = { name: title };

    // eslint-disable-next-line no-unused-expressions
    columns.forEach((col) => { // Maps table structure to graph data
      rows.forEach((row, index) => {
        Object.assign(sectionData, { [`${col.class} ${row.name}`]: col.result[index] })
      });
    });

    if (!bars.length) {
      bars = Object.keys(sectionData)
        .map((x, index) => {
          const colors = ['#007bff', '#8884d8', '#d8391f'];

          return <Bar key={x} dataKey={x} stackId={x.split(' ')[0]} fill={colors[index % rows.length]} />
        })
        .slice(1);
    }

    return sectionData;
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const data = Array.isArray(report.data)
    ? report.data.map((perMonthReport, index) => getSectionData(monthNames[index], perMonthReport.columns, perMonthReport.rows))
    : [getSectionData('month', report.data.columns, report.data.rows)];

  return (
    <BarChart
      width={1020}
      height={300}
      data={data}
      margin={{
        top: 5, right: 5, left: 0, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <ReferenceLine y={0} stroke="#000" />
      {bars}
    </BarChart>
  );
}

ReportGraph.propTypes = {
  report: PropTypes.shape(reportTypes).isRequired,
};

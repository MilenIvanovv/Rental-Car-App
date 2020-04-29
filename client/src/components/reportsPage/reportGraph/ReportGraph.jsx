import React, { useState } from 'react';
import './reportGraph.css';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
} from 'recharts';
import PropTypes from 'prop-types';
import { reportTypes } from '../../../common/models/prop-types';

export default function ReportGraph(props) {
  const { report } = props;

  let bars = [];
  const mapReportTypeToColor = ['expense', 'income', 'revenue'];
  const classColorPalet = [['#d20012', '#0974f0', '#194108'], ['#a08486', '#99c8fb', '#4ec530'], ['#9e6166', '#61a1ec', '#47a526'], ['#9a343d', '#5097ea', '#36811c'], ['#9c1e29', '#2b84ec', '#265c11']];
  const colors = ['#007bff', '#8884d8', '#d8391f'];

  const getSectionData = (title, columns = [], rows = []) => {
    const sectionData = { name: title };

    // eslint-disable-next-line no-unused-expressions
    columns.forEach((col) => { // Maps table structure to graph data
      rows.forEach((row, index) => {
        Object.assign(sectionData, { [`${col.class} ${row.name}`]: col.result[index] });
      });
    });

    if (!bars.length) {
      const keys = Object.keys(sectionData);
      const classes = (keys.length - 1) / rows.length;
      let count = 0;

      bars = keys
        .map((x, index) => {
          const c = index % rows.length ? count : count++;
          // const color = classColorPalet[c % classes][index % rows.length];

          const typeIndex = mapReportTypeToColor.indexOf(mapReportTypeToColor.find((t) => x.includes(t)));
          const color = classColorPalet[c % classes][typeIndex];

          return <Bar key={x} dataKey={x} stackId={x.split(' ')[0]} fill={color} />;
        })
        .slice(1);
    }

    return sectionData;
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const data = report.data.length && (Array.isArray(report.data)
    ? report.data.map((perMonthReport, index) => getSectionData(monthNames[index], perMonthReport.columns, perMonthReport.rows))
    : [getSectionData('month', report.data.columns, report.data.rows)]);

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
      <Tooltip cursor={{ stroke: '#007bff', fill: '#00000021', strokeWidth: 1 }} offset={40} />
      <Legend />
      <ReferenceLine y={0} stroke="#000" />
      {bars}
    </BarChart>
  );
}

ReportGraph.propTypes = {
  report: PropTypes.shape(reportTypes).isRequired,
};

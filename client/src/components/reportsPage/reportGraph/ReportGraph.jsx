import React from 'react';
import './reportGraph.css';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
} from 'recharts';
import PropTypes from 'prop-types';

export default function ReportGraph(props) {
  const { report } = props;

  const getSectionData = (title, columns) => {
    const sectionData = { name: title };

    // eslint-disable-next-line no-unused-expressions
    columns && columns
      .forEach((col) => Object.assign(sectionData, { [col.class]: col.result[0] }));

    return sectionData;
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const data = Array.isArray(report.data)
    ? report.data.map((perMonthReport, index) => getSectionData(monthNames[index], perMonthReport.columns))
    : [getSectionData('month', report.data.columns)];

  const bars = Object.keys(data[0]).map((key) => <Bar dataKey={key} fill="#8884d8" />).slice(1);

  // const rows = report.data.rows && report.data.rows.map((x, index) => <span key={index}>{x.name}</span>);

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
  report: PropTypes.shape({
    reportId: PropTypes.number.isRequired,
    data: PropTypes.shape({
      rows: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        dataType: PropTypes.string.isRequired,
      })),
      columns: PropTypes.arrayOf(PropTypes.shape({
        class: PropTypes.string.isRequired,
        result: PropTypes.arrayOf(PropTypes.number.isRequired),
      })),
    }).isRequired,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
};

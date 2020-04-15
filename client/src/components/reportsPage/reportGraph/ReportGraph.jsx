import React from 'react';
import './reportGraph.css';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
} from 'recharts';
import PropTypes from 'prop-types';

export default function ReportGraph(props) {
  const { report } = props;

  const bars = [];
  const oneMonth = { name: 'Month' };
  const data = [oneMonth];
  // eslint-disable-next-line no-unused-expressions
  report.data.columns && report.data.columns.forEach((col) => {
    bars.push(<Bar dataKey={col.class} label fill="#8884d8" />);
    Object.assign(oneMonth, { [col.class]: col.result[0] });
  });

  const rows = report.data.rows && report.data.rows.map((x, index) => <span key={index}>{x.name}</span>);

  return (
    <BarChart
      width={900}
      height={300}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
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

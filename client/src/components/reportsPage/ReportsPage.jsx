import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Report from './report/Report';
import Section from '../shared/section/Section';
import reportData from './common/reports';

// eslint-disable-next-line react/prefer-stateless-function
export default function ReportsPage(props) {
  const { reportFilter } = props;

  const transformedReports = reportData
    .filter(reportFilter)
    .map((report) => (
      <Col key={report.reportId} xs={12}>
        <Report reportData={report} />
      </Col>
    ));

  return (
    <Container>
      <Section header="Reports">
        <Row className="mb-3">
          {transformedReports}
        </Row>
      </Section>
    </Container>
  );
}

ReportsPage.propTypes = {
  reportFilter: PropTypes.func.isRequired,
};

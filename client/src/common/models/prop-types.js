import PropTypes from 'prop-types';
// eslint-disable-next-line import/prefer-default-export
export const carTypes = {
  id: PropTypes.number.isRequired,
  model: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  class: PropTypes.string.isRequired,
  price: PropTypes.any.isRequired,
  picture: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  insuranceFeePerYear: PropTypes.number.isRequired,
  monthlyExpences: PropTypes.number.isRequired,
};

export const clientTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
};

export const rentalTypes = {
  id: PropTypes.number,
  car: PropTypes.shape(carTypes),
  client: PropTypes.shape(clientTypes),
  dateFrom: PropTypes.string,
  estimatedDate: PropTypes.string,
  estimatedDays: PropTypes.number,
  estimatedPricePerDay: PropTypes.number,
  curDaysRented: PropTypes.number,
  curPricePerDay: PropTypes.number,
  curTotalPrice: PropTypes.number,
  status: PropTypes.oneOf(['open', 'returned']),
};

const reportTableData = PropTypes.shape({
  rows: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    dataType: PropTypes.string.isRequired,
  })),
  columns: PropTypes.arrayOf(PropTypes.shape({
    class: PropTypes.string.isRequired,
    result: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])),
  })),
}).isRequired;

const reportGraphData = PropTypes.arrayOf(reportTableData);

export const reportTypes = {
  reportId: PropTypes.number.isRequired,
  data: PropTypes.oneOfType([
    reportTableData,
    reportGraphData,
  ]),
  loading: PropTypes.bool.isRequired,
  date: PropTypes.date,
};

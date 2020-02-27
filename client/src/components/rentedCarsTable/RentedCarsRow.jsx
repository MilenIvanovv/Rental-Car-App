import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

export default function RentedCarsRow(props) {
  const { rental } = props;


  return (
    <tr>
      <td>{rental.car.model}</td>
      <td>{`${rental.firstName} ${rental.lastName}`}</td>
      <td><Moment format="YYYY/MM/DD HH:mm">{rental.dateFrom}</Moment></td>
      <td><Moment format="YYYY/MM/DD HH:mm">{rental.estimatedDate}</Moment></td>
      <td>{rental.estimatedDays}</td>
      <td>
        {rental.estimatedPricePerDay}
        {' $'}
      </td>
      <td>{rental.curDaysRented}</td>
      <td>
        {rental.curPricePerDay}
        {' $'}
      </td>
      <td>
        {rental.curTotalPrice}
        {' $'}
      </td>
      <td><button type="button" onClick={(ev) => props.returnCar(ev, rental.id)}>Return car</button></td>
    </tr>
  );
}

RentedCarsRow.propTypes = {
  rental: PropTypes.exact({
    id: PropTypes.number,
    car: PropTypes.shape({
      id: PropTypes.number,
      model: PropTypes.string,
      picture: PropTypes.string,
    }),
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.number,
    dateFrom: PropTypes.string,
    estimatedDate: PropTypes.string,

    returnDate: PropTypes.string,
    estimatedDays: PropTypes.number,
    estimatedPricePerDay: PropTypes.number,
    curDaysRented: PropTypes.number,
    curPricePerDay: PropTypes.number,
    curTotalPrice: PropTypes.number,
    status: PropTypes.oneOf(['open', 'returned']),
  }).isRequired,

  returnCar: PropTypes.func.isRequired,
};

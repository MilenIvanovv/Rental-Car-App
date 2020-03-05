import React, { useState } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

export default function RentedCarsRow(props) {
  const { rental } = props;
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <tr>
      <td data="current_rentals_model">{rental.car.model}</td>
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
      <td className={rental.hasPenalty ? 'red-penalty' : ''}>
        {rental.curTotalPrice}
        {' $'}
      </td>
      <td><button type="button" disabled={isDisabled} onClick={(ev) => {
        setIsDisabled(true);
        props.returnCar(ev, rental.id)
          .catch(() => setIsDisabled(false))
      }}>Return car</button></td>
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
    hasPenalty: PropTypes.bool,
  }).isRequired,

  returnCar: PropTypes.func.isRequired,
};

import React, { useState } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { warnings } from '../../constants/warning-levels';
import CarCard from '../shared/carCard/CarCard';

export default function RentedCarsRow(props) {
  const { rental } = props;
  const [isDisabled, setIsDisabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const warning = warnings[rental.warning];

  return (
    <tr className={`${warning}`} onMouseLeave={() => setIsOpen(false)}>
      <td data="current_rentals_model" className="cell-container" onMouseEnter={() => setIsOpen(true)} >
        <b>{rental.car.brand} {rental.car.model}</b>
        {isOpen && (
          <div className="car-card-container">
            <CarCard car={rental.car} noBody />
          </div>
        )}
      </td>
      <td>{`${rental.client.firstName} ${rental.client.lastName}`}</td>
      <td><Moment format="YYYY/MM/DD HH:mm">{rental.dateFrom}</Moment></td>
      <td><Moment format="YYYY/MM/DD HH:mm">{rental.estimatedDate}</Moment></td>
      <td>{rental.estimatedDays}</td>
      <td>
        ${rental.estimatedPricePerDay}
      </td>
      <td>
        {rental.curDaysRented}
      </td>
      <td>
        ${rental.curPricePerDay}
      </td>
      <td>
        ${rental.curTotalPrice}
      </td>
      <td>
        <button
          type="button"
          className="btn btn-primary"
          disabled={isDisabled}
          onClick={(ev) => {
            setIsDisabled(true);
            props.returnCar(ev, rental.id)
              .catch(() => setIsDisabled(false));
          }}
        >Return car
        </button>
      </td>
    </tr>
  );
}

RentedCarsRow.propTypes = {
  rental: PropTypes.exact({
    id: PropTypes.number,
    car: PropTypes.shape({
      id: PropTypes.number.isRequired,
      model: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      picture: PropTypes.any.isRequired,
    }),
    client: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      age: PropTypes.number,
    }),
    dateFrom: PropTypes.string,
    estimatedDate: PropTypes.string,

    returnDate: PropTypes.string,
    estimatedDays: PropTypes.number,
    estimatedPricePerDay: PropTypes.number,
    curDaysRented: PropTypes.number,
    curPricePerDay: PropTypes.number,
    curTotalPrice: PropTypes.number,
    status: PropTypes.oneOf(['open', 'returned']),
    warning: PropTypes.number,
  }).isRequired,

  returnCar: PropTypes.func.isRequired,
};

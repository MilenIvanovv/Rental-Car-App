import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import './carCard.css';
import classA from '../../../assets/class-a.png';
import classB from '../../../assets/class-b.png';
import classC from '../../../assets/class-c.png';
import classD from '../../../assets/class-d.png';
import classE from '../../../assets/class-e.png';

const stickers = [{
  name: 'A',
  img: classA,
},
{
  name: 'B',
  img: classB,
},
{
  name: 'C',
  img: classC,
},
{
  name: 'D',
  img: classD,
},
{
  name: 'E',
  img: classE,
}];


export default function CarCard(props) {
  const match = useRouteMatch();

  const { car, noButton } = props;

  if (!car) {
    return <h1>Loading car...</h1>;
  }

  const checkoutBtn = () => !noButton && (
    <Link to={`${match.url}/${car.id}`} className="btn btn-primary" data="card_checkout">
      <FontAwesomeIcon icon={faShoppingCart} />
    </Link>
  );

  let sticker = stickers.find((x) => x.name === car.class);
  sticker = sticker && <img src={sticker.img} className="sticker" alt="..." />;

  return (
    <div className="card">
      <Link to={`${match.url}/${car.id}`}>
        <img src={car.picture} className="card-img-top" alt="..." />
        {sticker}
      </Link>
      <div className="card-body align-card-text">
        <div className="card-text">
          <div>
            <span><b data="model">{car.model}</b></span>
            <span className="price">{`$${car.price}`}</span>
          </div>
          {checkoutBtn()}
        </div>
        {/* <div className="d-flex justify-content-center">
        </div> */}
      </div>
    </div>
  );
}

CarCard.propTypes = {
  car: PropTypes.exact({
    id: PropTypes.number,
    model: PropTypes.string,
    class: PropTypes.string,
    price: PropTypes.number,
    picture: PropTypes.string,
    status: PropTypes.string,
    insuranceFeePerYear: PropTypes.number,
    monthlyExpences: PropTypes.number,
  }),
  noButton: PropTypes.bool,
};

CarCard.defaultProps = {
  car: null,
  noButton: false,
};

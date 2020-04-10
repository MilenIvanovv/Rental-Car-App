import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Lightbox from 'react-image-lightbox';
import axios from 'axios';
import LoadingIdicator from '../loadingIndicator/LoadingIdicator';
import { stickers } from './index';
import { API_ROOT } from '../../../constants/constants';
import './carCard.css';

export default function CarCard(props) {
  const match = useRouteMatch();
  const [isOpen, setIsOpen] = useState(false);
  const [bigCarImage, setBigCarImage] = useState(undefined);

  const { car, noButton } = props;

  if (!car) {
    return <LoadingIdicator text="cars" />;
  }

  const checkoutBtn = () => !noButton && (
    <Link to={`${match.url}/${car.id}`} className="btn btn-primary" data="card_checkout">
      <FontAwesomeIcon icon={faShoppingCart} />
    </Link>
  );

  const imageClickHandler = async () => {
    try {
      const imageBuffer = await axios.get(`${API_ROOT}/cars/${car.id}/image`);
      setBigCarImage(`data:image/jpg;base64, ${Buffer.from(imageBuffer.data).toString('base64')}`);
    } catch (error) {
      console.log(error);
    }
    setIsOpen(true);
  };

  let sticker = stickers.find((x) => x.name === car.class);
  sticker = sticker && <img src={sticker.img} className="sticker" alt="..." />;

  const img = `data:image/jpg;base64, ${Buffer.from(car.picture.data).toString('base64')}`;

  return (
    <div className="car-card card">
      {isOpen && (
        <Lightbox
          mainSrc={bigCarImage}
          onCloseRequest={() => setIsOpen(false)}
        />
      )}

      <img src={img} className="card-img-top" alt="..." onClick={imageClickHandler.bind(this)} />
      {/* {carImg} */}
      {sticker}

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

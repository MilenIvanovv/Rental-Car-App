import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Lightbox from 'react-image-lightbox';
import axios from 'axios';
import LoadingIdicator from '../loadingIndicator/LoadingIdicator';
import { API_ROOT } from '../../../constants/constants';
import corner from '../../../assets/Class-corner.png';
import { carTypes } from '../../../common/models/prop-types';

import './carCard.css';

export default function CarCard(props) {
  const match = useRouteMatch();
  const [isOpen, setIsOpen] = useState(false);
  const [bigCarImage, setBigCarImage] = useState(undefined);

  const { car, noButton, noBody } = props;

  if (!car) {
    return <LoadingIdicator />;
  }

  const checkoutBtn = () => !noButton && (
    <Link to={`${match.url}/${car.id}`} className="btn btn-primary" data="card_checkout">
      <FontAwesomeIcon icon={faShoppingCart} />
    </Link>
  );

  const imageClickHandler = async () => {
    try {
      const imageBuffer = await axios.get(`${API_ROOT}/cars/${car.id}/image?width=1920&height=1080`);
      setBigCarImage(`data:image/jpg;base64, ${Buffer.from(imageBuffer.data).toString('base64')}`);
    } catch (error) {
      console.log(error);
    }
    setIsOpen(true);
  };

  const img = `data:image/jpg;base64, ${Buffer.from(car.picture.data).toString('base64')}`;

  return (
    <div className="card">
      {isOpen && (
        <Lightbox
          mainSrc={bigCarImage}
          onCloseRequest={() => setIsOpen(false)}
        />
      )}
      <div className="image-container" onClick={imageClickHandler.bind(this)}>
        <img src={img} className="card-img-top" alt="..." />
        <div className="sticker">
          <img src={corner} alt="..." />
          <span className="class-letter">{car.class}</span>
        </div>
      </div>
      {!noBody && (
        <div className="card-body align-card-text">
          <div className="card-text">
            <div>
              <span><b data="model">{car.brand} {car.model}</b></span>
              <span className="price">{`$${car.price}`}</span>
            </div>
            {checkoutBtn()}
          </div>
        </div>
      )}
    </div>
  );
}

CarCard.propTypes = {
  car: PropTypes.exact(carTypes),
  noButton: PropTypes.bool,
  noBody: PropTypes.bool,
};

CarCard.defaultProps = {
  car: null,
  noButton: false,
  noBody: false,
};

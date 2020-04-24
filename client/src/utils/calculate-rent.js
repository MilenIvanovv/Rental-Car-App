export const days = (from, to) => {
  const timeInMs = to - from;
  const timeInDays = timeInMs / (1000 * 3600 * 24);

  return Math.ceil(timeInDays);
};

export const totalPrice = (price, daysRented) => Math.floor(price * daysRented * 100) / 100;

export const applyDaysToPrice = (price, daysRented) => {
  let newPrice;

  if (daysRented < 2) {
    newPrice = price;
  } else if (daysRented >= 2 && daysRented < 7) {
    newPrice = (price - ((price * 15) / 100));
  } else {
    newPrice = (price - ((price * 25) / 100));
  }

  return Math.floor(newPrice * 100) / 100;
};

export const applyAgeToPrice = (price, age) => {
  let newPrice;

  if (age <= 25) {
    newPrice = (price + ((price * 25) / 100));
  } else {
    newPrice = price;
  }

  return Math.floor(newPrice * 100) / 100;
};

export const penalty = (price, penaltyDays) => {
  let newPrice;

  if (penaltyDays <= 2) {
    newPrice = (price * 20) / 100;
  } else if (penaltyDays < 6) {
    newPrice = (price * 50) / 100;
  } else if (penaltyDays >= 6) {
    newPrice = (price * 100) / 100;
  }

  newPrice = (Math.floor(newPrice * 100) / 100);

  return { pricePerDayPenalty: newPrice, totalPenalty: newPrice * penaltyDays };
};

export const applyAllToPrice = (price, daysRented, age) => {
  const changeFromDays = applyDaysToPrice(price, daysRented) - price;
  const changeFromAge = applyAgeToPrice(price, age) - price;

  return (price + changeFromDays + changeFromAge);
};

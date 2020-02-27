export const days = (from, to) => {
  if (!(from instanceof Date) || from.toString() === 'Invalid Date') {
    throw new Error('Invalid date');
  }

  if (!(to instanceof Date) || to.toString() === 'Invalid Date') {
    throw new Error('Invalid date');
  }

  const timeInMs = to - from;
  const timeInDays = timeInMs / (1000 * 3600 * 24);

  return Math.ceil(timeInDays);
};

export const totalPrice = (price, daysRented) => price * daysRented;

export const applyDaysToPrice = (price, daysRented) => {
  if (price < 0) {
    throw new Error('Invalid price');
  }

  if (daysRented < 0) {
    throw new Error('Invalid days');
  }

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
  if (price <= 0) {
    throw new Error('Invalid price');
  }

  if (age <= 0) {
    throw new Error('Invalid age');
  }

  let newPrice;

  if (age <= 25) {
    newPrice = (price + ((price * 25) / 100));
  } else {
    newPrice = price;
  }

  return Math.floor(newPrice * 100) / 100;
};

export const applyAllToPrice = (price, daysRented, age) => {
  const tempPrice = applyDaysToPrice(price, daysRented);
  return applyAgeToPrice(tempPrice, age);
};

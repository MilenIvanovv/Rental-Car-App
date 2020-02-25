// class - price per day
// dates => days (estimated, now)
// days => days * price per day = price
// days => modify price
// age => modify price

// input - price per day, from date, estimated date, current date, age


// output - estimated per day, cur per day, cur total


export const days = (from, to) => {
  if (!from instanceof Date  || from == 'Invalid Date') {
    throw new Error('Invalid date');
  }

  if (!to instanceof Date || to == 'Invalid Date') {
    throw new Error('Invalid date');
  }

  const timeInMs = to - from;
  const timeInDays = timeInMs / (1000 * 3600 * 24);
  
  console.log(timeInMs, timeInDays, Math.ceil(timeInDays));

  return Math.ceil(timeInDays);
} 

export const totalPrice = (price, days) => {

}

export const applyDaysToPrice = (price, days) => {

}

export const applyAgeToPrice = (price, days) => {
  
}
import * as calucalte from './calculate-rent';

describe('calculate days', () => {
  it('should should throw if 1st day is invalid', () => {
    const date1 = new Date('test');
    const date2 = new Date(2020, 1, 13, 10);
  
    expect(() => calucalte.days(date1, date2)).toThrow();
  });

  it('should should throw if 2nd day is invalid', () => {
    const date1 = new Date(2020, 1, 12, 10);
    const date2 = new Date('test');
  
    expect(() => calucalte.days(date1, date2)).toThrow();
  });

  it('should calculate correct on 1 day diff', () => {
    const date1 = new Date(2020, 1, 12, 10);
    const date2 = new Date(2020, 1, 13, 10);
  
    const result = calucalte.days(date1, date2);
  
    expect(result).toEqual(1);
  });

  it('should calculate correct on 1 day 1min diff', () => {
    const date1 = new Date(2020, 1, 12, 10);
    const date2 = new Date(2020, 1, 13, 10, 1);
  
    const result = calucalte.days(date1, date2);
  
    expect(result).toEqual(2);
  });

  it('should calculate correct on 23h diff', () => {
    const date1 = new Date(2020, 1, 12, 10);
    const date2 = new Date(2020, 1, 13, 9);
  
    const result = calucalte.days(date1, date2);
  
    expect(result).toEqual(1);
  });
});

describe('calculate applyDaysToPrice', () => {
  it('should throw if price is 0', () => {
    const days = 1;
    const price = 0;

    expect(() => calucalte.applyDaysToPrice(price, days)).toThrow();
  });

  it('should throw if price is negative', () => {
    const days = 1;
    const price = -3;

    expect(() => calucalte.applyDaysToPrice(price, days)).toThrow();
  });

  it('should throw if days is less then 0', () => {
    const days = -1;
    const price = 3;

    expect(() => calucalte.applyDaysToPrice(price, days)).toThrow();
  });

  it('should not change the price if days are less then 2', () => {
    const days = 1;
    const price = -3;

    const result = calucalte.applyDaysToPrice(price, days);

    expect(result).toEqual(price);
  });

  it('should reduced the price with 15% if days are between 2 and 6', () => {
    const days = 3;
    const price = 100;

    const result = calucalte.applyDaysToPrice(price, days);

    expect(result).toEqual(85);
  });

  it('should reduced the price with 25% if days are >= 7', () => {
    const days = 9;
    const price = 100;

    const result = calucalte.applyDaysToPrice(price, days);

    expect(result).toEqual(75);
  });
});

describe('calculate applyAgeToPrice', () => {
  it('should throw if age is nagavite', () => {
    const age = -3;
    const price = 100;

    expect(() => calucalte.applyAgeToPrice(price, age)).toThrow();
  });

  it('should throw if price is nagavite', () => {
    const age = 3;
    const price = -100;

    expect(() => calucalte.applyAgeToPrice(price, age)).toThrow();
  });

  it('should increase if age is <=25', () => {
    const age = 22;
    const price = 100;

    const result = calucalte.applyAgeToPrice(price, age);

    expect(result).toEqual(125);
  });

  it('should not change the price if age is > 25', () => {
    const age = 26;
    const price = 100;

    const result = calucalte.applyAgeToPrice(price, age);

    expect(result).toEqual(price);
  });
});
// export const days = (from, to) => {
  
  // (1000 * 3600 * 24)
// } 

// export const pricePerDay = (classPrice, days) => {

// }

// export const applyDaysToPrice = (price, days) => {

// }

// export const applyAgeToPrice = (price, days) => {
  
// }

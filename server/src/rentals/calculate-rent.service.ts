import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculateRentService {

  days(from: Date, to: Date) {
    const timeInMs = to as any - (from as any);
    const timeInDays = timeInMs / (1000 * 3600 * 24);

    return Math.ceil(timeInDays);
  };

  totalPrice(price: number, daysRented: number) {
    return Math.floor(price * daysRented * 100) / 100;
  }

  applyDaysToPrice(price: number, daysRented: number) {
    let newPrice: number;

    if (daysRented < 2) {
      newPrice = price;
    } else if (daysRented >= 2 && daysRented < 7) {
      newPrice = (price - ((price * 15) / 100));
    } else {
      newPrice = (price - ((price * 25) / 100));
    }

    return Math.floor(newPrice * 100) / 100;
  };

  applyAgeToPrice(price: number, age: number) {
    let newPrice: number;

    if (age <= 25) {
      newPrice = (price + ((price * 25) / 100));
    } else {
      newPrice = price;
    }

    return Math.floor(newPrice * 100) / 100;
  };

  penalty(price: number, penaltyDays: number) {
    let newPrice: number;

    if (penaltyDays <= 2) {
      newPrice = (price * 20) / 100;
    } else if (penaltyDays < 6) {
      newPrice = (price * 50) / 100;
    } else if (penaltyDays >= 6) {
      newPrice = (price * 100) / 100;
    }

    return (Math.floor(newPrice * 100) / 100) * penaltyDays;
  };

  applyAllToPrice(price: number, daysRented: number, age: number) {
    const changeFromDays = this.applyDaysToPrice(price, daysRented) - price;
    const changeFromAge = this.applyAgeToPrice(price, age) - price;

    return (price + changeFromDays + changeFromAge);
  };
}

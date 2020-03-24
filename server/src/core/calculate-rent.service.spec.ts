import { Test, TestingModule } from '@nestjs/testing';
import { CalculateRentService } from './calculate-rent.service';

describe('CalculateRentService', () => {
  let calucalate: CalculateRentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculateRentService],
    }).compile();

    calucalate = module.get<CalculateRentService>(CalculateRentService);
  });

  it('should be defined', () => {
    expect(calucalate).toBeDefined();
  });

  describe('calculate days', () => {
    it('should calculate correct on 1 day diff', () => {
      const date1 = new Date(2020, 1, 12, 10);
      const date2 = new Date(2020, 1, 13, 10);
    
      const result = calucalate.days(date1, date2);
    
      expect(result).toEqual(1);
    });
  
    it('should calculate correct on 1 day 1min diff', () => {
      const date1 = new Date(2020, 1, 12, 10);
      const date2 = new Date(2020, 1, 13, 10, 1);
    
      const result = calucalate.days(date1, date2);
    
      expect(result).toEqual(2);
    });
  
    it('should calculate correct on 23h diff', () => {
      const date1 = new Date(2020, 1, 12, 10);
      const date2 = new Date(2020, 1, 13, 9);
    
      const result = calucalate.days(date1, date2);
    
      expect(result).toEqual(1);
    });
  });
  
  describe('calculate applyDaysToPrice', () => {
    it('should not change the price if days are less then 2', () => {
      const days = 1;
      const price = 3;
  
      const result = calucalate.applyDaysToPrice(price, days);
  
      expect(result).toEqual(price);
    });
  
    it('should reduced the price with 15% if days are between 2 and 6', () => {
      const days = 3;
      const price = 100;
  
      const result = calucalate.applyDaysToPrice(price, days);
  
      expect(result).toEqual(85);
    });
  
    it('should reduced the price with 25% if days are >= 7', () => {
      const days = 9;
      const price = 100;
  
      const result = calucalate.applyDaysToPrice(price, days);
  
      expect(result).toEqual(75);
    });
  });
  
  describe('calculate applyAgeToPrice', () => {
    it('should increase if age is <=25', () => {
      const age = 22;
      const price = 100;
  
      const result = calucalate.applyAgeToPrice(price, age);
  
      expect(result).toEqual(125);
    });
  
    it('should not change the price if age is > 25', () => {
      const age = 26;
      const price = 100;
  
      const result = calucalate.applyAgeToPrice(price, age);
  
      expect(result).toEqual(price);
    });
  });
  
  describe('calculate penalty', () => {
    it('should increase if penalty days is 1 or 2 with 20%', () => {
      const penaltyDays = 2;
      const price = 100;
  
      const result = calucalate.penalty(price, penaltyDays);
  
      expect(result).toEqual(40);
    });
  
    it('should increase if penalty days is between 2 and 6 with 50%', () => {
      const penaltyDays = 3;
      const price = 100;
  
      const result = calucalate.penalty(price, penaltyDays);
  
      expect(result).toEqual(150);
    });
  
    it('should increase if penalty days is >= 6 with 100%', () => {
      const penaltyDays = 7;
      const price = 100;
  
      const result = calucalate.penalty(price, penaltyDays);
  
      expect(result).toEqual(700);
    });
  });
});



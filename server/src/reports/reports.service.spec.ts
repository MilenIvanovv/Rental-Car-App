import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { RentedCar } from '../database/entities/rentals.entity';
import { CarClass } from '../database/entities/class.entity';
import { Car } from '../database/entities/cars.entity';
import { CalculateRentService } from '../core/calculate-rent.service';
import { CarStatus } from '../common/car-status.enum';

describe('ReportsService', () => {
  let service: ReportsService;
  let rentalsRepo;
  let carClass;
  let carRepo;
  let calService;

  beforeEach(async () => {

    rentalsRepo = {
      find() {
        //implementation
      },
      save() {
        //implementation
      }
    }

    carRepo = {
      find() {
        //implementation
      },
      findOne() {
        //implementation
      }
    }

    carClass = {
      find() {
        //implementation
      },
      findOne() {
        //implementation
      }
    }


    calService = {
      days() {
        return 0;
      },
      applyAllToPrice() {
        //implementation
      },
      totalPrice() {
        //implementation
      },
      penalty() {
        //implementation
      },
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        { provide: getRepositoryToken(CarClass), useValue: carClass },
        { provide: getRepositoryToken(RentedCar), useValue: rentalsRepo },
        { provide: getRepositoryToken(Car), useValue: carRepo },
        { provide: CalculateRentService, useValue: calService },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(('Array help functions'), () => {
    it('groupBy should return expected', () => {
      const arrToGroup = [
        { class: "A", otherProp: 'text' },
        { class: "B", otherProp: 'text' },
        { class: "C", otherProp: 'text' },
        { class: "D", otherProp: 'text' },
      ];

      const result = arrToGroup.groupBy((x) => x.class);

      const expectedGroup = [
        { key: "A", value: [{ class: "A", otherProp: 'text' }] },
        { key: "B", value: [{ class: "B", otherProp: 'text' }] },
        { key: "C", value: [{ class: "C", otherProp: 'text' }] },
        { key: "D", value: [{ class: "D", otherProp: 'text' }] },
      ]

      expect(result).toEqual(expectedGroup);
    });

    fit('groupBy should return expected', () => {
      const arrToGroup = [
        { class: "A", otherProp: 5 },
        { class: "B", otherProp: 5 },
        { class: "C", otherProp: 5 },
        { class: "D", otherProp: 5 },
      ];

      const result = arrToGroup.aggregateBy({
        groupByFn: (x) => x.class,
        calcFn: (x) => x.otherProp,
        aggFn: (x) => x.sum / x.count,
      });

      const expected = [
        { key: "A", value: 5 },
        { key: "B", value: 5 },
        { key: "C", value: 5 },
        { key: "D", value: 5 },
      ]

      expect(result).toEqual(expected);
    });
  });

  describe(('calculateAverageDays'), () => {
    it('should calculate correct average days', () => {
      const rental = {};

      const spy = jest.spyOn(calService, 'days')
        .mockImplementation(() => 6);

      const result = (service as any).calculateAverageDays({ days: 0, count: 1 }, rental);

      expect(result).toEqual({ days: 6, count: 2, result: 3 })
    });

    it('should return 0 if input is incorrect', () => {
      const rental = {};

      const spy = jest.spyOn(calService, 'days')
        .mockImplementation(() => 6);

      const result = (service as any).calculateAverageDays({ days: 0, count: 'test' }, rental);

      expect(result).toEqual({ days: 6, count: NaN, result: 0 })
    });

    it('should work with empty object as acc', () => {
      const rental = {};

      const spy = jest.spyOn(calService, 'days')
        .mockImplementation(() => 6);

      const result = (service as any).calculateAverageDays({}, rental);

      expect(result).toEqual({ days: 6, count: 1, result: 6 })
    });
  })

  describe(('calculateCurrentRentedCars'), () => {
    it('should calculate correct current rented cars in %', () => {
      const car = {
        status: CarStatus.listed,
      };

      const result = (service as any).calculateCurrentRentedCars({ sum: 9, rented: 5 }, car);

      expect(result).toEqual({ sum: 10, rented: 5, result: 50 })
    });

    it('should work with empty object as acc', () => {
      const car = {
        status: CarStatus.borrowed,
      };

      const result = (service as any).calculateCurrentRentedCars({}, car);

      expect(result).toEqual({ sum: 1, rented: 1, result: 100 })
    });
  })

  describe(('calculateAverageIncome'), () => {
    it('should calculate correct average income without penalty', () => {
      const rental = {};
      const days = 6;
      const price = 10;

      jest.spyOn(calService, 'days')
        .mockImplementationOnce(() => days);
      jest.spyOn(calService, 'applyAllToPrice')
        .mockImplementation(() => price);
      const spy = jest.spyOn(calService, 'totalPrice')
        .mockImplementation(() => 10);

      (service as any).calculateAverageIncome({ sum: 0, count: 1 }, rental);

      expect(spy).toHaveBeenCalledWith(price, days);
    });

    it('should calculate average correct', () => {
      const rental = {};

      jest.spyOn(calService, 'totalPrice')
        .mockImplementation(() => 10);

      const result = (service as any).calculateAverageIncome({ count: 1 }, rental);

      expect(result).toEqual({ sum: 10, count: 2, result: 5 })
    });

    it('should add penalty correctly', () => {
      const rental = {};

      jest.spyOn(calService, 'days')
        .mockImplementation(() => 2);
      jest.spyOn(calService, 'totalPrice')
        .mockImplementation(() => 10);
      jest.spyOn(calService, 'penalty')
        .mockImplementation(() => ({ totalPenalty: 50 }));

      const result = (service as any).calculateAverageIncome({ count: 1 }, rental);

      expect(result).toEqual({ sum: 60, count: 2, result: 30 })
    });
  })

  describe(('calculateAverageExpenses'), () => {
    it('should calculate average expenses correctrly', () => {
      const rental = {
        car: {
          monthlyExpences: 11,
          insuranceFeePerYear: 12,
        }
      };

      const result = (service as any).calculateAverageExpenses({ sum: 0, count: 1 }, rental);

      expect(result).toEqual({ sum: 12, count: 2, result: 6 })
    });

    it('should return result 0 with invalid input', () => {
      const rental = {
        car: {
          monthlyExpences: 11,
          insuranceFeePerYear: 'test',
        }
      };

      const result = (service as any).calculateAverageExpenses({ sum: 0, count: 1 }, rental);

      expect(result).toEqual({ sum: 0, count: 2, result: 0 })
    });
  })
});

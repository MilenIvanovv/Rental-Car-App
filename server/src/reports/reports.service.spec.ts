import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportsService } from './reports.service';
import { RentedCar } from '../database/entities/rentals.entity';
import { CarClass } from '../database/entities/class.entity';
import { Car } from '../database/entities/cars.entity';
import { CalculateRentService } from '../core/calculate-rent.service';
import { CarStatus } from '../common/car-status.enum';
import { RentalStatus } from '../common/rental-status.enum';

const getCarClass = (name: string): CarClass => ({
  id: '1',
  name,
  price: 50,
  car: ({} as any)
}) as any;

const getCar = (className: string, carStatus?: CarStatus): Car => ({
  id: '1',
  class: getCarClass(className),
  model: 'Fiesta',
  picture: '' as any,
  status: carStatus || CarStatus.listed,
  insuranceFeePerYear: 24,
  monthlyExpences: 20,
  rentals: [],
}) as any;

const getRental = (className: string): RentedCar => ({
  id: '1',
  car: getCar(className),
  estimatedDate: new Date(),
  firstName: 'Petko',
  lastName: 'Petkov',
  age: 20,
  status: RentalStatus.returned,
  returnDate: new Date(),
  dateFrom: new Date(),
  pricePerDay: 50,
}) as any;

const getCalService = () => {
  jest.mock('../core/calculate-rent.service');
  const calService = new CalculateRentService();

  jest.spyOn(calService, 'days')
    .mockImplementation(() => 0);

  jest.spyOn(calService, 'applyAllToPrice')
    .mockImplementation(() => 0);

  jest.spyOn(calService, 'totalPrice')
    .mockImplementation(() => 0);

  jest.spyOn(calService, 'penalty')
    .mockImplementation(() => ({} as any));

  return calService;
}

const getRentalsService = () => {
  const rentalRepo = new Repository<RentedCar>();

  jest.spyOn(rentalRepo, 'find')
    .mockImplementation(async () => ([{}] as any));

  jest.spyOn(rentalRepo, 'save')
    .mockImplementation(async () => ({} as any));

  const carClassRepo = new Repository<CarClass>();

  jest.spyOn(rentalRepo, 'find')
    .mockImplementation(async () => ([{}] as any));

  jest.spyOn(rentalRepo, 'findOne')
    .mockImplementation(async () => ({} as any));

  const carRepo = new Repository<Car>();

  jest.spyOn(carRepo, 'findOne')
    .mockImplementation(async () => ({} as any));

  jest.spyOn(carRepo, 'find')
    .mockImplementation(async () => ([{}] as any));

  const calService = getCalService();

  const rentalsService = new ReportsService(rentalRepo, carClassRepo, carRepo, calService);

  return { rentalsService, rentalRepo, carClassRepo, carRepo, calService };
};

describe('ReportsService', () => {
  it('should be defined', () => {
    const service = getRentalsService().rentalsService;
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

    it('aggregateBy should return expected', () => {
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

    it('percentBy should return expected', () => {
      const arrToGroup = [
        { class: "A", otherProp: 4 },
        { class: "B", otherProp: 4 },
        { class: "C", otherProp: 2 },
        { class: "D", otherProp: 2 },
      ];

      const result = arrToGroup.percentBy({
        groupByFn: (x) => x.class,
        percentFn: (x) => x.otherProp > 3,
      });

      const expected = [
        { key: "A", value: 100 },
        { key: "B", value: 100 },
        { key: "C", value: 0 },
        { key: "D", value: 0 },
      ]

      expect(result).toEqual(expected);
    });
  });

  describe(('reportsService'), () => {
    it('groupByClass should return correct result', () => {
      const service = getRentalsService().rentalsService;

      const classes = [
        { name: 'A' },
        { name: 'B' },
        { name: 'C' },
        { name: 'D' },
      ]

      const aggData = [
        { key: 'A', value: 'test' },
        { key: 'B', value: 'test' },
        { key: 'C', value: 'test' },
        { key: 'D', value: 'test' },
      ]

      const result = service.groupByClass(classes as any, aggData as any)

      const expected = [
        { class: 'A', result: ['test'] },
        { class: 'B', result: ['test'] },
        { class: 'C', result: ['test'] },
        { class: 'D', result: ['test'] },
      ];

      expect(result).toEqual(expected);
    });

    it('groupByClass should return correct result with more then 2 arguments', () => {
      const service = getRentalsService().rentalsService;

      const classes = [
        { name: 'A' },
        { name: 'B' },
        { name: 'C' },
        { name: 'D' },
      ]

      const aggData1 = [
        { key: 'A', value: 'aggData1' },
        { key: 'B', value: 'aggData1' },
        { key: 'C', value: 'aggData1' },
        { key: 'D', value: 'aggData1' },
      ]

      const aggData2 = [
        { key: 'A', value: 'aggData2' },
        { key: 'B', value: 'aggData2' },
        { key: 'C', value: 'aggData2' },
        { key: 'D', value: 'aggData2' },
      ]

      const result = service.groupByClass(classes as any, aggData1 as any, aggData2 as any);

      const expected = [
        { class: 'A', result: ['aggData1', 'aggData2'] },
        { class: 'B', result: ['aggData1', 'aggData2'] },
        { class: 'C', result: ['aggData1', 'aggData2'] },
        { class: 'D', result: ['aggData1', 'aggData2'] },
      ];

      expect(result).toEqual(expected);
    });

    it('groupByClass should missing classes with "0"', () => {
      const service = getRentalsService().rentalsService;

      const classes = [
        { name: 'A' },
        { name: 'B' },
        { name: 'C' },
        { name: 'D' },
      ]

      const aggData1 = [
        { key: 'B', value: 'aggData1' },
        { key: 'C', value: 'aggData1' },
        { key: 'D', value: 'aggData1' },
      ]

      const aggData2 = [
        { key: 'A', value: 'aggData2' },
        { key: 'C', value: 'aggData2' },
        { key: 'D', value: 'aggData2' },
      ]

      const result = service.groupByClass(classes as any, aggData1 as any, aggData2 as any);

      const expected = [
        { class: 'A', result: ['0', 'aggData2'] },
        { class: 'B', result: ['aggData1', '0'] },
        { class: 'C', result: ['aggData1', 'aggData2'] },
        { class: 'D', result: ['aggData1', 'aggData2'] },
      ];

      expect(result).toEqual(expected);
    });

    it('getAverageDaysPerClass return correct result', async () => {
      const { rentalsService, carClassRepo, rentalRepo, calService } = getRentalsService();

      jest.spyOn(carClassRepo, 'find')
        .mockImplementation(async () => [
          getCarClass('A'),
          getCarClass('B'),
        ]);

      jest.spyOn(rentalRepo, 'find')
        .mockImplementation(async () => [
          getRental('A'),
          getRental('B'),
        ]);

      jest.spyOn(calService, 'days')
        .mockImplementationOnce(() => 5)
        .mockImplementationOnce(() => 10);

      const result = await rentalsService.getAverageDaysPerClass();

      const expected = {
        rows: [
          { name: 'days', dataType: '' }
        ],
        columns: [
          { class: 'A', result: ["5"] },
          { class: 'B', result: ["10"] },
        ]
      }

      expect(result).toEqual(expected);
    });

    it('getCurrentlyRentedCars return correct result', async () => {
      const { rentalsService, carClassRepo, carRepo } = getRentalsService();

      jest.spyOn(carClassRepo, 'find')
        .mockImplementation(async () => [
          getCarClass('A'),
          getCarClass('B'),
        ]);

      jest.spyOn(carRepo, 'find')
        .mockImplementation(async () => [
          getCar('A', CarStatus.borrowed),
          getCar('A', CarStatus.listed),
        ]);

      const result = await rentalsService.getCurrentlyRentedCars();

      const expected = {
        rows: [
          { name: 'rented cars', dataType: '%' },
        ],
        columns: [
          { class: 'A', result: ["50"] },
          { class: 'B', result: ["0"] },
        ]
      }

      expect(result).toEqual(expected);
    });

    describe(('calculateIncome'), () => {
      it('should calculate correct average income without penalty', () => {
        const { rentalsService, calService } = getRentalsService();

        const days = 6;
        const price = 10;

        jest.spyOn(calService, 'days')
          .mockImplementationOnce(() => days);
        jest.spyOn(calService, 'applyAllToPrice')
          .mockImplementation(() => price);
        const spy = jest.spyOn(calService, 'totalPrice')
          .mockImplementation(() => 10);

        (rentalsService as any).getRentalIncome(getRental('A'));

        expect(spy).toHaveBeenCalledWith(price, days);
      });

      it('should add penalty correctly', () => {
        const { rentalsService, calService } = getRentalsService();

        const totalPrice = 10;
        const totalPenalty = 60;

        jest.spyOn(calService, 'days')
          .mockImplementation(() => 2);
        jest.spyOn(calService, 'totalPrice')
          .mockImplementation(() => totalPrice);
        jest.spyOn(calService, 'penalty')
          .mockImplementation(() => ({ totalPenalty }) as any);

        const result = (rentalsService as any).getRentalIncome(getRental('A'));

        expect(result).toEqual(totalPrice + totalPenalty);
      });
    })

    it('getAverageMonthlyIncome return correct result', async () => {
      const { rentalsService, carClassRepo, rentalRepo, calService } = getRentalsService();

      jest.spyOn(carClassRepo, 'find')
        .mockImplementation(async () => [
          getCarClass('A'),
          getCarClass('B'),
        ]);

      jest.spyOn(rentalRepo, 'find')
        .mockImplementation(async () => [
          getRental('A'),
          getRental('B'),
        ]);

      jest.spyOn(calService, 'totalPrice')
        .mockImplementationOnce(() => 150)
        .mockImplementationOnce(() => 50);

      const result = await rentalsService.getAverageMonthlyIncome(2020, 5);

      const expected = {
        rows: [
          { name: 'income', dataType: '$' },
        ],
        columns: [
          { class: 'A', result: ["150"] },
          { class: 'B', result: ["50"] },
        ]
      }

      expect(result).toEqual(expected);
    });
  });

  it('getRentalExpenses return correct result', async () => {
    const { rentalsService } = getRentalsService();

    const rental = {
      car: {
        monthlyExpences: 20,
        insuranceFeePerYear: 12,
      }
    }

    const result = (rentalsService as any).getRentalExpenses(rental)

    expect(result).toEqual(21);
  });

  it('getTotalMonthly return correct result', async () => {
    const { rentalsService, carClassRepo, rentalRepo, calService } = getRentalsService();

    jest.spyOn(carClassRepo, 'find')
      .mockImplementation(async () => [
        getCarClass('A'),
        getCarClass('B'),
      ]);

    jest.spyOn(rentalRepo, 'find')
      .mockImplementation(async () => [
        getRental('A'),
        getRental('B'),
      ]);

    jest.spyOn(calService, 'totalPrice')
      .mockImplementationOnce(() => 150)
      .mockImplementationOnce(() => 50)
      .mockImplementationOnce(() => 150)
      .mockImplementationOnce(() => 50);

    const result = await rentalsService.getTotalMonthly(2020, 5);

    const expected = {
      rows: [
        { name: 'income', dataType: '$'},
        { name: 'expenses', dataType: '$'},
        { name: 'total', dataType: '$'}
      ],
      columns: [
        { class: 'A', result: ["150", "22", "128"] },
        { class: 'B', result: ["50", "22", "28"] },
      ]
    }

    expect(result).toEqual(expected);
  });

  
});

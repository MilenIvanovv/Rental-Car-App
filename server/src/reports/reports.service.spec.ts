import { Repository } from 'typeorm';
import { ReportsService } from './reports.service';
import { RentedCar } from '../database/entities/rentals.entity';
import { CarClass } from '../database/entities/class.entity';
import { Car } from '../database/entities/cars.entity';
import { CalculateRentService } from '../core/calculate-rent.service';
import { CarStatus } from '../common/car-status.enum';
import { RentalStatus } from '../common/rental-status.enum';
import '../common/array-extentions';
import { ReportType } from '../common/report-type.enum';

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

  it('getMonthly return correct result (default income and average)', async () => {
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

    const result = await rentalsService.getMonthly(2020, 5);

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

  it('getMonthly return correct result (income, expenses, revenue)', async () => {
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

    const reportTypes = [ReportType.income, ReportType.expenses, ReportType.revenue];

    const result = await rentalsService.getMonthly(2020, 5, reportTypes);

    const expected = {
      rows: [
        { name: 'income', dataType: '$' },
        { name: 'expenses', dataType: '$' },
        { name: 'revenue', dataType: '$' }
      ],
      columns: [
        { class: 'A', result: ["150", "22", "128"] },
        { class: 'B', result: ["50", "22", "28"] },
      ]
    }

    expect(result).toEqual(expected);
  });

  it('getYearly return correct result', async () => {
    const { rentalsService, carClassRepo, rentalRepo, calService } = getRentalsService();

    jest.spyOn(carClassRepo, 'find')
      .mockImplementation(async () => [
        getCarClass('A'),
        getCarClass('B'),
      ]);

    const rental = getRental('A');
    rental.returnDate = new Date(2020, 4, 15);

    jest.spyOn(rentalRepo, 'find')
      .mockImplementation(async () => [
        getRental('A'),
      ]);

    jest.spyOn(calService, 'totalPrice')
      .mockImplementationOnce(() => 150)
      .mockImplementationOnce(() => 50)

    const result = await rentalsService.getYearly(2020);

    const expected = [];
    for (let i = 0; i < 12; i++) {
      expected.push({
        rows: [
          { name: 'income', dataType: '$' },
        ],
        columns: [
          { class: 'A', result: ["0"] },
          { class: 'B', result: ["0"] },
        ]
      })
    }

    expected[3] = {
      rows: [
        { name: 'income', dataType: '$' },
      ],
      columns: [
        { class: 'A', result: ["150"] },
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

      (rentalsService as any).calculateRentalIncome(getRental('A'));

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



      const result = (rentalsService as any).calculateRentalIncome(getRental('A'));

      expect(result).toEqual(totalPrice + totalPenalty);
    });
  })

  it('calculateRentalExpenses return correct result', async () => {
    const { rentalsService } = getRentalsService();

    const rental = {
      car: {
        monthlyExpences: 20,
        insuranceFeePerYear: 12,
      }
    }

    const result = (rentalsService as any).calculateRentalExpenses(rental)

    expect(result).toEqual(21);
  });

  describe('groupByClass', () => {

    it('should return correct result', () => {
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

      const result = (service as any).groupByClass(classes as any, aggData as any)

      const expected = [
        { class: 'A', result: ['test'] },
        { class: 'B', result: ['test'] },
        { class: 'C', result: ['test'] },
        { class: 'D', result: ['test'] },
      ];

      expect(result).toEqual(expected);
    });

    it('should return correct result with more then 2 arguments', () => {
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

      const result = (service as any).groupByClass(classes as any, aggData1 as any, aggData2 as any);

      const expected = [
        { class: 'A', result: ['aggData1', 'aggData2'] },
        { class: 'B', result: ['aggData1', 'aggData2'] },
        { class: 'C', result: ['aggData1', 'aggData2'] },
        { class: 'D', result: ['aggData1', 'aggData2'] },
      ];

      expect(result).toEqual(expected);
    });

    it('should missing classes with "0"', () => {
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

      const result = (service as any).groupByClass(classes as any, aggData1 as any, aggData2 as any);

      const expected = [
        { class: 'A', result: ['0', 'aggData2'] },
        { class: 'B', result: ['aggData1', '0'] },
        { class: 'C', result: ['aggData1', 'aggData2'] },
        { class: 'D', result: ['aggData1', 'aggData2'] },
      ];

      expect(result).toEqual(expected);
    });
  });
});

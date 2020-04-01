// eslint-disable-next-line import/no-extraneous-dependencies
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RentalsService } from './rentals.service';
import { RentedCar } from '../database/entities/rentals.entity';
import { Car } from '../database/entities/cars.entity';

describe('RentalsService', () => {
  let service: RentalsService;
  let rentalsRepo;
  let carRepo;

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

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RentalsService,
        { provide: getRepositoryToken(RentedCar), useValue: rentalsRepo },
        { provide: getRepositoryToken(Car), useValue: carRepo },
      ],
    }).compile();

    service = module.get<RentalsService>(RentalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRentals', () => {
    it('should call rentalsRepository.find with correct parameters', () => {
      const spy = jest
        .spyOn(rentalsRepo, 'find');

      service.getRenals();

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith({ relations: ['car'] });
    });
  });

  describe('rentCar', () => {
    it('should call carRepository.findOne with correct parameters', () => {
      const spy = jest
        .spyOn(carRepo, 'findOne');
      const carId = 3;

      service.rentCar(carId, '' as any, '' as any);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(carId);
    });

    it('should throw if carRepository.findOne doesn\'t ', () => {
      jest
        .spyOn(carRepo, 'findOne')
        .mockImplementation(async () => undefined);
      const carId = 3;

      expect(service.rentCar(carId, '' as any, '' as any)).rejects.toThrow();
    });

    it('should call carRepository.save with correct parameters', async () => {
      const car = { id: 3 };
      jest
        .spyOn(carRepo, 'findOne')
        .mockImplementation(() => car);
      const spy = jest
        .spyOn(rentalsRepo, 'save');
      const client = { firstName: 'Ivan', lastName: 'Ivanov', age: '18' };
      const date = 'date';

      await service.rentCar(0, date, client);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith({ returnDate: date, status: 'open', car: car, ...client });
    });

    it('should return the correct result', async () => {
      const carId = 3;
      const testObj = {}
      jest
        .spyOn(carRepo, 'findOne')
        .mockImplementation(() => ({ id: carId }));
      jest
        .spyOn(rentalsRepo, 'save')
        .mockImplementation(() => testObj);
      const client = { firstName: 'Ivan', lastName: 'Ivanov', age: '18' };
      const date = 'date';

      const result = await service.rentCar(0, date, client);

      expect(result).toBe(testObj);
    });
  });
});

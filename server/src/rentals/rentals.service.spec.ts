import { Test, TestingModule } from '@nestjs/testing';
import { RentalsService } from './rentals.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RentedCar } from '../database/entities/rentals.entity';
import { Car } from '../database/entities/cars.entity';

describe('RentalsService', () => {
  let service: RentalsService;
  let rentalsRepo;
  let carRepo;

  beforeEach(async () => {
    rentalsRepo = {
      find() {

      },
      save() {

      }
    }

    carRepo = {
      find() {

      },
      findOne() {

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

  fdescribe('rentCar', () => {
    it('should call carRepository.findOne with correct parameters', () => {
      const spy = jest
        .spyOn(carRepo, 'findOne');
      const carId = 3;

      service.rentCar(carId, '' as any, '' as any);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(carId);
    });

    it('should throw if carRepository.findOne returns undefiend', () => {
      const spy = jest
        .spyOn(carRepo, 'findOne')
        .mockImplementation(() => undefined);
      const carId = 3;

      service.rentCar(carId, '' as any, '' as any);

      expect(spy).toHaveBeenCalled();
      expect(service).toThrow();
    });

    it('should call carRepository.save with correct parameters', () => {
      const carId = 3;
      const spy = jest
        .spyOn(carRepo, 'save')
        .mockImplementation(() => ({ id: carId }))
      const client = { firstName: 'Ivan', lastName: 'Ivanov', age: 18 };
      const date = 'date';

      service.rentCar(0, date, client);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith({ returnDate: date, status: 'open', car: carId, ...client });
    });
  });
});

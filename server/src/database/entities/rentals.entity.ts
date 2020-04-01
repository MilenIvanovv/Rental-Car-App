import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Car } from './cars.entity';
import { RentalStatus } from '../../common/rental-status.enum';

@Entity('rentals')
export class RentedCar extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(type => Car, car => car.rentals)
  car: Car;

  @Column({ type: 'timestamp', nullable: false })
  estimatedDate: Date;

  @Column({ type: 'varchar', length: 100, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  lastName: string;

  @Column({ type: 'integer', nullable: false })
  age: number;

  @Column({ type: 'enum', enum: ['open', 'returned']})
  status: RentalStatus;

  @Column({ type: 'timestamp', nullable: true })
  returnDate: Date;

  @Column({ type: 'timestamp', nullable: false })
  dateFrom: Date;

  @Column({ type: 'real', nullable: false })
  pricePerDay: number;
}
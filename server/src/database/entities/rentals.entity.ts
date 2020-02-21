import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Car } from './cars.entity';
import { RentalStatus } from '../../common/rental-status.enum';

@Entity('rentals')
export class RentedCar extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(type => Car)
  @JoinColumn()
  car: Car;

  @Column({ type: 'varchar', length: 100, nullable: false })
  estimatedDate: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  age: string;

  @Column({ type: 'enum', enum: ['open', 'returned']})
  status: RentalStatus;

  @Column({ type: 'varchar'})
  returnDate: string;
}
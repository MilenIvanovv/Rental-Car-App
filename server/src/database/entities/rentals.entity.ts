import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Car } from './cars.entity';
import { RentalStatus } from '../../common/rental-status.enum';
import { Expose, Exclude } from 'class-transformer';

@Entity('rentals')
export class RentedCar extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(type => Car, car => car.rentals)
  car: Car;

  @Column({ type: 'timestamp', nullable: false })
  estimatedDate: Date;

  @Exclude()
  @Column({ type: 'varchar', length: 100, nullable: false })
  firstName: string;

  @Exclude()
  @Column({ type: 'varchar', length: 100, nullable: false })
  lastName: string;

  @Exclude()
  @Column({ type: 'integer', nullable: false })
  age: number;

  @Column({ type: 'enum', enum: ['open', 'returned']})
  status: RentalStatus;

  @Column({ type: 'timestamp', nullable: true })
  returnDate: Date;

  @Column({ type: 'timestamp', nullable: false })
  dateFrom: Date;

  @Expose()
  get client() {
    return {
      firstName: this.firstName,
      lastname: this.lastName,
      age: this.age,
    }
  }
}
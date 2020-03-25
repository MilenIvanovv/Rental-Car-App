import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { CarClass } from './class.entity';
import { RentedCar } from './rentals.entity';
import { CarStatus } from '../../common/car-status.enum';
import { Exclude, Expose, Transform } from 'class-transformer';

@Entity('cars')
export class Car extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(type => CarClass, carClass => carClass.car)
  @JoinColumn()
  class: CarClass;
  
  @Column({ type: 'varchar', length: 100, nullable: false })
  model: string;
  
  @Column({ type: 'varchar', length: 100, nullable: false })
  picture: string;

  @Column({ type: 'enum', enum: ['borrowed', 'listed'], nullable: true})
  status: CarStatus;

  @Column({ type: 'real', nullable: false })
  insuranceFeePerYear: number;

  @Column({ type: 'real', nullable: false })
  monthlyExpences: number;
  
  @OneToMany(type => RentedCar, rentedCar => rentedCar.car)
  @JoinColumn()
  rentals: RentedCar[];
}
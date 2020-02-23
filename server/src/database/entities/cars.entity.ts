import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { CarClass } from './class.entity';
import { RentedCar } from './rentals.entity';

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
  
  @OneToMany(type => RentedCar, rentedCar => rentedCar.car)
  @JoinColumn()
  rentals: RentedCar[];
}
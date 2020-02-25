import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Car } from './cars.entity';

@Entity('Classes')
export class CarClass extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'numeric', nullable: false })
  price: number;

  @OneToMany(type => Car, car => car.class)
  car: Car;
}
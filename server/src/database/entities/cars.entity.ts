import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { CarClass } from './class.entity';

@Entity('cars')
export class Car extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(type => CarClass)
  class: CarClass;

  @Column({ type: 'varchar', length: 100, nullable: false })
  price: string;
}
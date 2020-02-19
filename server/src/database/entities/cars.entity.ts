import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CarClasses } from '../../common/car-classes.enum';
import { CarStatus } from '../../common/car-status.enum';

const imgPlaceholder = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQmKLUDYJ-YQug7Xu4rEEpRx_0xkxVEyaGQB4qhxFmxZW4koO7S';
type classes = 'A' | 'B' | ' C' | 'D';
type status = 'borrowed' | 'listed';

@Entity('cars')
export class Car extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  model: string;

  @Column({ type: 'varchar', default: imgPlaceholder })
  picture: string;

  @Column({ type: 'enum', enum: ['A', 'B',' C', 'D']})
  class: CarClasses;

  @Column({ type: 'enum', enum: ['borrowed', 'listed']})
  carStatus: CarStatus;
}
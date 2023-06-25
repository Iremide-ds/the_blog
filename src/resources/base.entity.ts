import { Exclude } from 'class-transformer';
import * as typeorm from 'typeorm';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity extends typeorm.BaseEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateUpdated: Date;

  @DeleteDateColumn()
  dateDeleted: Date;
}

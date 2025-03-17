import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DB } from '../../../../utils/constants';
import { ProductEntity } from './product.entity';
import { MovementType } from '../../../aplication/enums';

@Entity({ name: DB.TABLES.MOVEMENT })
export class MovementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  productId: number;

  @Column({ type: 'text' })
  sourceStoreId: string;

  @Column({ type: 'text', nullable: true })
  toStoreId: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({
    type: 'enum',
    enum: MovementType,
  })
  type: MovementType;

  @ManyToOne(() => ProductEntity, (product) => product.movements)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

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
  product_id: number;

  @Column({ type: 'text' })
  source_store_id: string;

  @Column({ type: 'text' })
  to_store_id: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({
    type: 'enum',
    enum: MovementType,
  })
  type: MovementType;

  @ManyToOne(() => ProductEntity, (product) => product.movements)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

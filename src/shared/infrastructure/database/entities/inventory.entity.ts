import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ProductEntity } from './product.entity';
import { DB } from '../../../../utils/constants';

@Entity({ name: DB.TABLES.INVENTORY })
export class InventoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  product_id: number;

  @Column({ type: 'text' })
  store_id: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'int' })
  min_stock: number;

  @ManyToOne(() => ProductEntity, (product) => product.inventories)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

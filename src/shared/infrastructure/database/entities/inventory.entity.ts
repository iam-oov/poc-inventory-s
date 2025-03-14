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
  productId: number;

  @Column({ type: 'text' })
  storeId: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'int' })
  minStock: number;

  @ManyToOne(() => ProductEntity, (product) => product.inventories)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

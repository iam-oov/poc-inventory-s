import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DB } from '../../../../utils/constants';
import { CategoryEntity } from './category.entity';
import { StoreEntity } from './store.entity';
import { ProductTransferEntity } from './product-transfer.entity';

@Entity({ name: DB.TABLES.PRODUCT })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'int', nullable: false })
  category_id: number;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({ type: 'int', nullable: false })
  store_id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => StoreEntity, (store) => store.products)
  @JoinColumn({ name: 'store_id' })
  store: StoreEntity;

  @OneToMany(() => ProductTransferEntity, (transfer) => transfer.product)
  transfers: ProductTransferEntity[];
}

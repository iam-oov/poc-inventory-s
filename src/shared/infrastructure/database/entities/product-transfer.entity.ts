import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

import { ProductEntity } from './product.entity';
import { DB } from '../../../../utils/constants';
import { StoreEntity } from './store.entity';

@Entity({ name: DB.TABLES.PRODUCT_TRANSFER })
export class ProductTransferEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  product_id: number;

  @ManyToOne(() => ProductEntity, (product) => product.transfers)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @Column({ type: 'int', nullable: false })
  from_store_id: number;

  @ManyToOne(() => StoreEntity, (store) => store.outgoingTransfers)
  @JoinColumn({ name: 'from_store_id' })
  fromStore: StoreEntity;

  @Column({ type: 'int', nullable: false })
  to_store_id: number;

  @ManyToOne(() => StoreEntity, (store) => store.incomingTransfers)
  @JoinColumn({ name: 'to_store_id' })
  toStore: StoreEntity;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  transfer_date: Date;

  @Column({ type: 'text', nullable: false })
  username: string;
}

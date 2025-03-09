import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DB } from '../../../../utils/constants';
import { ProductEntity } from './product.entity';
import { ProductTransferEntity } from './product-transfer.entity';

@Entity({ name: DB.TABLES.STORE })
export class StoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  slug: string;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  lat: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  lng: number;

  @Column({ type: 'boolean' })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ProductEntity, (product) => product.store)
  products: ProductEntity[];

  @OneToMany(() => ProductTransferEntity, (transfer) => transfer.fromStore)
  outgoingTransfers: ProductTransferEntity[];

  @OneToMany(() => ProductTransferEntity, (transfer) => transfer.toStore)
  incomingTransfers: ProductTransferEntity[];
}

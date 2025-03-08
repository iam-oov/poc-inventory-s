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

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  location: string;

  @Column({ type: 'boolean', nullable: false })
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

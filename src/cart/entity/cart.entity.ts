import { ProductEntity } from 'src/product/entity/product.entity.dto';
import { ProductColor } from 'src/product/enum';
import { UserEntity } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ICart } from '../interface/cart.interface';

@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({ type: 'enum', enum: ProductColor, array: true })
  color: ProductColor[];

  @CreateDateColumn()
  date: Date;

  @OneToOne(() => UserEntity, (user) => user.cart)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @OneToOne(() => ProductEntity, (product) => product.cart)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: ProductEntity;
}

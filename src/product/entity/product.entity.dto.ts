import { ApiProperty } from '@nestjs/swagger';
import { CartEntity } from 'src/cart/entity/cart.entity';
import { FavoriteEntity } from 'src/favorite/entity/favorite.entity';
import { OrderEntity } from 'src/order/entity/order.entity';
import { Status } from 'src/user/enum/status.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductCategory, ProductCollection, ProductColor } from '../enum';
import { IProduct } from '../interface/product-interface.dto';

@Entity('product')
export class ProductEntity implements IProduct {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  price: number;

  @ApiProperty()
  @Column()
  discount: number;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  quantity: number;

  @ApiProperty()
  @Column()
  code: string;

  @ApiProperty()
  @Column()
  size: string;

  @ApiProperty()
  @Column()
  tkan: string;

  @ApiProperty()
  @Column()
  fason: string;

  @ApiProperty()
  @Column()
  length: number;

  @ApiProperty()
  @Column({ default: false })
  is_hit: boolean;

  @ApiProperty()
  @Column({ default: false })
  is_new: boolean;

  @ApiProperty()
  @CreateDateColumn()
  date: Date

  @ApiProperty()
  @Column('text', { array: true })
  image: string[];

  @ApiProperty()
  @Column('int', { default: 0 })
  rating: number;

  @ApiProperty()
  @Column({ default: 0})
  sales: number

  @ApiProperty()
  @Column({ default: 0})
  revenue: number

  @ApiProperty()
  @Column({ type: 'enum', enum: Status, default: Status.NOT_VERIFIED })
  status: Status

  @ApiProperty()
  @Column({ type: 'enum', enum: ProductColor, array: true })
  color: ProductColor[];

  @ApiProperty()
  @Column({ type: 'enum', enum: ProductCollection })
  collection: ProductCollection;

  @ApiProperty()
  @Column({ type: 'enum', enum: ProductCategory })
  category: ProductCategory;

  @OneToMany(() => CartEntity, (cart) => cart.product)
  cart: CartEntity;

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.product)
  favorite: FavoriteEntity

  @ManyToMany(() => OrderEntity, (order) => order.products)
  @JoinTable({ name: 'productOrders' })
  order: OrderEntity

  @Column({default: 0})
  quantityOfProduct: number
}
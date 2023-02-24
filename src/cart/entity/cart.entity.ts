import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from 'src/product/entity/product.entity.dto';
import { ProductColor } from 'src/product/enum';
import { UserEntity } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ICart } from '../interface/cart.interface';

@Entity('cart')
export class CartEntity implements ICart{
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  quantity: number;

  @ApiProperty()
  @Column({ type: 'enum', enum: ProductColor, array: true })
  color: ProductColor[];

  @ApiProperty()
  @CreateDateColumn()
  date: Date;

  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user.cart, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.cart, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: ProductEntity;
}

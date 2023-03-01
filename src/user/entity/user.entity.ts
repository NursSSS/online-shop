import { ApiProperty } from '@nestjs/swagger';
import { CartEntity } from 'src/cart/entity/cart.entity';
import { FavoriteEntity } from 'src/favorite/entity/favorite.entity';
import { OrderEntity } from 'src/order/entity/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../enum/role.enum';
import { Status } from '../enum/status.enum';
import { IUser } from '../interface/user.interface';

@Entity('user')
export class UserEntity implements IUser {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty()
  @Column()
  firstName: string;

  @ApiProperty()
  @Column()
  lastName: string;

  @Column({ type: 'text' })
  phoneNumber: string;

  @ApiProperty()
  @Column({ nullable: true })
  country: string

  @ApiProperty()
  @Column({ nullable: true })
  city: string

  @ApiProperty()
  @Column({ nullable: true })
  address: string

  @ApiProperty()
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column()
  code: number;

  @ApiProperty()
  @Column({ default: 0})
  shopped: number

  @ApiProperty()
  @Column({ default: 0})
  revenue: number

  @Column({ type: 'enum', enum: Status, default: Status.NOT_VERIFIED })
  status: Status

  @OneToMany(() => CartEntity, (cart) => cart.user)
  cart: CartEntity

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.user)
  favorite: FavoriteEntity

  @OneToMany(() => OrderEntity, (order) => order.user)
  order: OrderEntity
}

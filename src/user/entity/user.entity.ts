import { CartEntity } from 'src/cart/entity/cart.entity';
import { Column, Entity, JoinTable, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../enum/role.enum';
import { IUser } from '../interface/user.interface';

@Entity('user')
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'text' })
  phoneNumber: string;

  @Column()
  country: string

  @Column()
  address: string

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column()
  code: number;

  @OneToOne(() => CartEntity, (cart) => cart.user)
  cart: CartEntity
}

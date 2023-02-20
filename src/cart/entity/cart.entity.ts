import { ProductColor } from 'src/product/enum';
import { UserEntity } from 'src/user/entity/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ICart } from '../interface/cart.interface';

@Entity('cart')
export class CartEntity implements ICart{
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  product_id: number

  @Column()
  quantity: number

  @Column({ type: 'enum', enum: ProductColor, array: true })
  color: ProductColor[]

  @CreateDateColumn()
  date: Date

  @OneToOne(() => UserEntity, (user) => user.cart)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user_id: UserEntity
}

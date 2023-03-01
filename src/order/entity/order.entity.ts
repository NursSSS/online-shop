import { ApiProperty } from "@nestjs/swagger";
import { ProductEntity } from "src/product/entity/product.entity.dto";
import { UserEntity } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderStatus } from "../enum/order-status.enum";

import { IOrder } from "../interface/order.interface";

@Entity('order')
export class OrderEntity implements IOrder {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column()
    orderNumber: string

    @ApiProperty({ type: () => UserEntity })
    @ManyToOne(() => UserEntity, (user) => user.order, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: UserEntity

    @ApiProperty({ type: () => ProductEntity })
    @ManyToMany(() => ProductEntity, (products) => products.order, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'products', referencedColumnName: 'id' }) 
    products: ProductEntity[]

    @ApiProperty()
    @Column()
    totalSum: number

    @ApiProperty()
    @CreateDateColumn()
    date: Date

    @ApiProperty()
    @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.AWAITING })
    status: OrderStatus
}
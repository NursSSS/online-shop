import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ProductsDto } from "../dto/products.dto";
import { OrderStatus } from "../enum/status.enum";
import { IOrder } from "../interface/order.interface";

@Entity('order')
export class OrderEntity implements IOrder {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    orderNumber: string

    @Column()
    user_id: number

    @Column('jsonb')
    products: ProductsDto[]

    @Column()
    totalSum: number

    @Column()
    phoneNumber: string

    @Column()
    user_name: string

    @Column()
    country: string

    @Column()
    city: string

    @Column()
    address: string

    @CreateDateColumn()
    date: Date

    @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.AWAITING })
    status: OrderStatus
}
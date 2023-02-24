import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"
import { OrderStatus } from "../enum/order-status.enum"


export class UpdateOrderDto{
    @ApiProperty({ description: 'Номер заказа'})
    @IsString()
    code: string

    @ApiProperty({ example: 'paid' })
    status: OrderStatus
}
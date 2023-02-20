import { OrderStatus } from "../enum/status.enum"
import { ProductsDto } from "./products.dto"

export class CreateOrderDto {
    orderNumber: string
    user_id: number
    products?: ProductsDto[]
    totalSum: number
    phoneNumber?: string
    user_name?: string
    country: string
    city: string
    address: string
    date?: Date
    status?: OrderStatus
}
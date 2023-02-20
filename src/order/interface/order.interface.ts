import { ProductsDto } from "../dto"

export interface IOrder {
    user_id: number
    products: ProductsDto[]
    phoneNumber: string
    country: string
    city: string
    address: string
    date: Date
}
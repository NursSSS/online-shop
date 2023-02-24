import { ProductEntity } from "src/product/entity/product.entity.dto"
import { UserEntity } from "src/user/entity/user.entity"

export interface IOrder {
    orderNumber: string
    totalSum: number
    user: UserEntity
    products: ProductEntity[]
    date: Date
}
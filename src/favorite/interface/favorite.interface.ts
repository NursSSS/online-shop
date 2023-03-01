import { ProductEntity } from "src/product/entity/product.entity.dto"
import { UserEntity } from "src/user/entity/user.entity"

export interface IFavorite {
    user: UserEntity
    product: ProductEntity
    created_date: Date
    end_date: Date
}
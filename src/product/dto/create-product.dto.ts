import { ProductCategory, ProductCollection, ProductColor } from "../enum"

export class CreateProductDto {
    name: string
    price: number
    discount: number
    description: string
    quantity: number
    code: string
    size: string
    image?: string[]
    color: [ProductColor]
    collection: ProductCollection
    category: ProductCategory
}
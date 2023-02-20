import { ProductCategory, ProductCollection, ProductColor } from "src/product/enum";

export class ProductsDto {
  id: number;
  name: string;
  price: number;
  discount: number;
  description: string;
  quantity: number;
  code: string;
  size: string;
  tkan: string
  fason: string
  length: number
  is_hit: boolean
  is_new: boolean
  image: string[]
  rating: number
  color: ProductColor[]
  collection: ProductCollection
  category: ProductCategory
  quantityofProduct: number
}
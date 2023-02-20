import { ProductColor } from 'src/product/enum';
import { UserEntity } from 'src/user/entity/user.entity';

export class CreateCartDto {
  user_id: number;
  product_id: number;
  quantity: number;
  color: ProductColor[];
}

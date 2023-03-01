import { ProductEntity } from 'src/product/entity/product.entity.dto';
import { UserEntity } from 'src/user/entity/user.entity';

export interface ICart {
  user: UserEntity;
  product: ProductEntity;
  quantity: number;
  date: Date;
}

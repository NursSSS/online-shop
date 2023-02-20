import { UserEntity } from 'src/user/entity/user.entity';

export interface ICart {
  user_id: UserEntity;
  product_id: number;
  quantity: number;
  date: Date;
}

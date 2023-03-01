import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DB_CONFIG } from './utils/db_config';
import { UserModule } from './user/user.module';
import { NewsModule } from './news/news.module';
import { ProductModule } from './product/product.module';
import { RatingModule } from './rating/rating.module';
import { CartModule } from './cart/cart.module';
import { FavoriteModule } from './favorite/favorite.module';
import { OrderModule } from './order/order.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [TypeOrmModule.forRoot(DB_CONFIG), AuthModule, UserModule, NewsModule, ProductModule, RatingModule, CartModule, FavoriteModule, OrderModule, ContactsModule]
})
export class AppModule {}

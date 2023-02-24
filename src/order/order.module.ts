import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CartModule } from 'src/cart/cart.module';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { OrderEntity } from './entity/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity]), UserModule, CartModule, ProductModule, AuthModule],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}

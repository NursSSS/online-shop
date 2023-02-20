import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartEntity } from './entity/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity]), ProductModule, UserModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService]
})
export class CartModule {}

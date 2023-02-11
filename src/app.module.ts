import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_CONFIG } from './utils/db_config';

@Module({
  imports: [TypeOrmModule.forRoot(DB_CONFIG)]
})
export class AppModule {}

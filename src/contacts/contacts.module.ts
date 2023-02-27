import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactsEnity } from './entity/contacts.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ContactsEnity]), AuthModule],
  controllers: [ContactsController],
  providers: [ContactsService]
})
export class ContactsModule {}

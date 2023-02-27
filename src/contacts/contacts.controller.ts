import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/guard/role-guard';
import { ContactsService } from './contacts.service';
import { CreateContactDto, UpdateContactDto } from './dto';
import { ContactsEnity } from './entity/contacts.entity';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
  constructor(
    private readonly contactsService: ContactsService
  ) {}
    
  @ApiOkResponse({ type: ContactsEnity })
  @Get()
  findAll() {
    return this.contactsService.findAll();
  }
  
  @ApiCreatedResponse({ description: 'Contact successfully created' })
  @ApiUnauthorizedResponse({ description: 'User is not registered' })
  @ApiForbiddenResponse({ description: 'Acess denied' })
  @UseGuards(RoleGuard)
  @Post()
  create(@Body() dto: CreateContactDto) {
    return this.contactsService.create(dto);
  }

  @ApiOkResponse({ description: 'Contact successfully updated' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({ description: 'User is not registered' })
  @ApiForbiddenResponse({ description: 'Acess denied' })
  @UseGuards(RoleGuard)
  @Put()
  update(@Body() dto: UpdateContactDto) {
    return this.contactsService.update(dto);
  }

  @ApiOkResponse({ description: 'Contact successfully deleted' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({ description: 'User is not registered' })
  @ApiForbiddenResponse({ description: 'Acess denied' })
  @UseGuards(RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactsService.remove(+id);
  }
}

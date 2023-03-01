import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactDto, UpdateContactDto } from './dto';
import { ContactsEnity } from './entity/contacts.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(ContactsEnity)
    private ContactsRepo: Repository<ContactsEnity>
  ){}
  
  async findAll() {
    return await this.ContactsRepo.find()
  }

  async create(dto: CreateContactDto) {
    await this.ContactsRepo.save(dto)
    return { message: 'Contact successfully created' }
  }

  async findOne(id: number) {
    const contacts = await this.ContactsRepo.findOne({
      where: {
        id: id
      }
    })

    if(!contacts){
      throw new NotFoundException('Not found')
    }

    return contacts
  }

  async update(dto: UpdateContactDto) {
    const contacts = await this.findOne(dto.id)

    Object.assign(contacts, dto)

    await this.ContactsRepo.save(contacts)
    return { message: 'Contact successfully updated' }
  }

  async remove(id: number) {
    const contacts = await this.findOne(id)

    await this.ContactsRepo.remove(contacts)
    return { message: 'Contact successfully deleted' }
  }
}

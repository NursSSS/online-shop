import { HttpService } from '@nestjs/axios/dist';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { Response } from 'express';
import { CreateUserDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service';
import { GenerateToken, ValidateDto } from './dto';

require('dotenv').config();

@Injectable()
export class AuthService {
  constructor(
    private UserService: UserService,
    private JwtService: JwtService,
    private HttpService: HttpService,
  ) {}

  async signin(dto: CreateUserDto, res: Response) {
    const user = await this.UserService.findByNumber(dto.phoneNumber)

    if(user){
        throw new BadRequestException('User with this number already exist')
    }


    const code = await this.sendMessage(dto.phoneNumber, res)

    dto.code = code

    const saved = await this.UserService.create(dto)
    res.send(saved)
  }

    async login(phoneNumber: string, res: Response) {
        const user = await this.UserService.findByNumber(phoneNumber)

        if(!user){
            throw new NotFoundException('User is not found')
        }

        const code = await this.sendMessage(phoneNumber, res)
        user.code = code

        const saved = await this.UserService.update(user)
        res.send(saved)
    }

    private async sendMessage(phoneNumber: string, res: Response){
      const randomstring = require("randomstring")

      const code = await randomstring.generate({
          length: 6,
          charset: 'numeric'
      })

      const config = {
          headers: {
            'Content-Type': 'text/xml',
          },
        };
      const response = await axios.post('http://smspro.nikita.kg/api/message', `<?xml version="1.0" encoding="UTF-8"?>
      <message>
      <login>nurik_kun</login>
      <pwd>hQ_Vrv55</pwd>
      <id>${code}</id>
      <sender>SMSPRO.KG</sender>
      <text>Your verification code is: ${code}</text>
      <phones>
      <phone>${phoneNumber}</phone>
      </phones>
      </message>`, config)

      return code
    }
  
  async validate(dto: ValidateDto){
    const user = await this.UserService.findById(dto.user_id)

    if(user.code !== dto.code){
        throw new BadRequestException('Wrong code')
    }

    const dtoForToken = {
        id: user.id,
        phoneNumber: user.phoneNumber,
        firstName: user.firstName
    }

    return this.generateToken(dtoForToken)
  }


  private async generateToken(dto: GenerateToken) {
    const payLoad = {
      id: dto.id,
      phoneNumber: dto.phoneNumber,
      firstName: dto.firstName,
    };

    return { token: await this.JwtService.signAsync(payLoad) };
  }

  async changeNumber(number: string, res: Response){
    const user = await this.UserService.findByNumber(number)

    if(user){
        throw new BadRequestException('User with this number already exist')
    }

    const code = await this.sendMessage(number, res)

    user.code = code

    const saved = await this.UserService.update(user)
    res.send(saved)
  }
}

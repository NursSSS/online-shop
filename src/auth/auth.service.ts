import { HttpService } from '@nestjs/axios/dist';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { CreateUserDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service'
import { GenerateToken, ValidateDto } from './dto';

require('dotenv').config()

@Injectable()
export class AuthService {
    constructor(
        private UserService: UserService,
        private JwtService: JwtService,
        private HttpService: HttpService
    ){}

    async signin(dto: CreateUserDto, res: Response){
        const user = await this.UserService.findByNumber(dto.phoneNumber)

        if(user){
            throw new BadRequestException('User with this number already exist')
        }


        const code = await this.sendMessage(dto.phoneNumber, res)

        // dto.code = code

        return await this.UserService.create(dto)
    }

    async login(phoneNumber: string, res: Response){
        const user = await this.UserService.findByNumber(phoneNumber)

        if(!user){
            throw new NotFoundException('User is not found')
        }

        const code = await this.sendMessage(phoneNumber, res)
        // user.code = code

        return await this.UserService.update(user)
    }

    private async sendMessage(phoneNumber: string, res: Response){
        const randomstring = require("randomstring")
        const xml = require('xml')

        const code = await randomstring.generate({
            length: 6,
            charset: 'numeric'
        })
        const message = {
            message: [
                {login: 'nurik_kun'},
                {pwd: 'hQ_Vrv55'},
                {id: code},
                {sender: 'MissDress'},
                {text: `Your verification code is: ${code}`},
                {phones: {
                    phone: phoneNumber
                }}
            ]
        }

        const config = {
            headers: {
              'Content-Type': 'text/xml',
            },
          };

        const body = xml(message)
        console.log(body)
        const response =  this.HttpService.post('http://smspro.nikita.kg/api/message', body, config)
        console.log(response)

        return response
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

    private async generateToken(dto: GenerateToken){
        const payLoad = { id: dto.id, phoneNumber: dto.phoneNumber, firstName: dto.firstName }

        return { token: await this.JwtService.signAsync(payLoad) }
    }

    async changeNumber(number: string, res: Response){
        const user = await this.UserService.findByNumber(number)

        if(user){
            throw new BadRequestException('User with this number already exist')
        }

        const code = await this.sendMessage(number, res)

        // user.code = code

        return await this.UserService.update(user)
    }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service'
import { GenerateToken, ValidateDto } from './dto';

require('dotenv').config()

@Injectable()
export class AuthService {
    constructor(
        private UserService: UserService,
        private JwtService: JwtService,
    ){}

    async signin(dto: CreateUserDto){
        const user = await this.UserService.findByNumber(dto.phoneNumber)

        if(user){
            throw new BadRequestException('User with this number already exist')
        }


        const code = await this.sendMessage(dto.phoneNumber)

        dto.code = code

        return await this.UserService.create(dto)
    }

    async login(phoneNumber: string){
        const user = await this.UserService.findByNumber(phoneNumber)
        console.log(user)
        if(!user){
            throw new BadRequestException('Wrong number')
        }
        console.log('a')

        const code = await this.sendMessage(phoneNumber)
        user.code = code

        return await this.UserService.update(user)
    }

    private async sendMessage(phoneNumber: string){
        const randomstring = require("randomstring")
        const { Vonage } = require('@vonage/server-sdk')

        const code = await randomstring.generate({
            length: 6,
            charset: 'numeric'
        })

        const vonageAPI = new Vonage({
            apiKey: process.env.API_KEY,
            apiSecret: process.env.API_SECRET
        })

        const from = "MissDress"
        const to = phoneNumber
        const text = `Your veridication code is: ${code}`

        await vonageAPI.sms.send({to, from, text})
            .catch(err => { throw new BadRequestException('Wrong number') });
        
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

    private async generateToken(dto: GenerateToken){
        const payLoad = { id: dto.id, phoneNumber: dto.phoneNumber, firstName: dto.firstName }

        return { token: await this.JwtService.signAsync(payLoad) }
    }

    async changeNumber(number: string){
        const user = await this.UserService.findByNumber(number)

        if(user){
            throw new BadRequestException('User with this number already exist')
        }

        const code = await this.sendMessage(number)

        user.code = code

        return await this.UserService.update(user)
    }
}

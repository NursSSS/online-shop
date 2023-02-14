import { Body, Controller, Post, Param } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto';
import { AuthService } from './auth.service';
import { ValidateDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(
        private AuthService: AuthService
    ){}

    @Post('signin')
    async signin(@Body() dto: CreateUserDto){
        return await this.AuthService.signin(dto)
    }

    @Post('login/:phoneNumber')
    async login(@Param('phoneNumber') phoneNumber: string){
        return await this.AuthService.login(phoneNumber)
    }

    @Post('validate')
    async validate(@Body() dto: ValidateDto){
        return await this.AuthService.validate(dto)
    }

    @Post('change/:number')
    async changeNumber(@Param() number: string){
        return await this.AuthService.changeNumber(number)
    }
}

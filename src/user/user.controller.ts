import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private UserService: UserService
    ){}

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll(){
        return await this.UserService.findAll()
    }

    @Get('findBy/:number')
    async findByNumber(@Param('number') number: string){
        return await this.UserService.findByNumber(number)
    }
}

import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guard/role-guard';
import { Roles } from './enum/role-decorator';
import { UserRole } from './enum/role.enum';
import { UserService } from './user.service';
import { ApiOkResponse, ApiForbiddenResponse } from '@nestjs/swagger/dist';
import { UserEntity } from './entity/user.entity';

@Controller('user')
export class UserController {
    constructor(
        private UserService: UserService
    ){}

    @Get()
    @ApiOkResponse({ type: UserEntity })
    @ApiForbiddenResponse({ description: 'No access' })
    @Roles(UserRole.ADMIN)
    @UseGuards(RoleGuard)
    @UseGuards(JwtAuthGuard)
    async findAll(){
        return await this.UserService.findAll()
    }

    @Get('findBy/:number')
    async findByNumber(@Param('number') number: string){
        return await this.UserService.findByNumber(number)
    }
}

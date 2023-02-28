import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guard/role-guard';
import { Roles } from './enum/role-decorator';
import { UserRole } from './enum/role.enum';
import { UserService } from './user.service';
import { ApiOkResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiTags, ApiUnauthorizedResponse, ApiBearerAuth } from '@nestjs/swagger/dist';
import { UserEntity } from './entity/user.entity';
import { UpdateUserDto } from './dto';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private UserService: UserService
    ){}

    @Get()
    @ApiOkResponse({ type: [UserEntity]})
    @ApiForbiddenResponse({ description: 'Access denied' })
    @ApiUnauthorizedResponse({ description: 'User is not registered' })
    @ApiBearerAuth()
    @Roles(UserRole.ADMIN)
    @UseGuards(RoleGuard)
    async findAll(){
        return await this.UserService.findAll()
    }

    @ApiOkResponse({ type: UserEntity })
    @ApiNotFoundResponse({ description: 'User is not found' })
    @Get('byid/:id')
    async findById(@Param('id') id: number){
        return await this.UserService.findById(id)
    }

    @ApiOkResponse({ type: UserEntity })
    @ApiNotFoundResponse({ description: 'User is not found' })
    @ApiBadRequestResponse({ description: 'Validation error' })
    @ApiUnauthorizedResponse({ description: 'User is not registered' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put()
    async update(@Body() dto: UpdateUserDto){
        return await this.UserService.update(dto)
    }
}
